'use server'

import { prisma } from './db'
import { flightSchema, FlightFormData } from './schema'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

export async function getFlights(page: number = 1, pageSize?: number, year?: number) {
  // If pageSize is not provided, fetch from settings
  let limit = pageSize
  if (!limit) {
    const settings = await getSettings()
    limit = settings.rowsPerPage
  }
  
  // Ensure limit is a number
  const safeLimit = limit || 14

  const where: Prisma.FlightWhereInput = year ? {
    date: {
      gte: new Date(year, 0, 1),
      lt: new Date(year + 1, 0, 1)
    }
  } : {}

  const orderBy: Prisma.FlightOrderByWithRelationInput[] = [
    { date: 'asc' },
    { departureTime: 'asc' },
    { createdAt: 'asc' }
  ]

  // 1. Fetch current page flights
  const flights = await prisma.flight.findMany({
    where,
    orderBy,
    take: safeLimit,
    skip: (page - 1) * safeLimit,
  })

  // 2. Count total flights (for pagination)
  const totalCount = await prisma.flight.count({ where })

  // 3. Calculate Lifetime Totals (Grand Total) - ignores year filter usually, but let's return both
  const lifetimeAgg = await prisma.flight.aggregate({
    _sum: {
      totalTime: true,
      singlePilotSE: true,
      singlePilotME: true,
      multiPilot: true,
      nightTime: true,
      ifrTime: true,
      picTime: true,
      copilotTime: true,
      dualTime: true,
      instructorTime: true,
      landingsDay: true,
      landingsNight: true,
    }
  })

  // 4. Calculate Previous Totals (Sum of flights before this page)
  // We fetch all flights up to the start of this page to sum them.
  // Optimization: If page is 1, previous is 0.
  let previousTotals = null
  if (page > 1) {
    const previousFlights = await prisma.flight.findMany({
      where,
      orderBy,
      take: (page - 1) * safeLimit,
      select: {
        totalTime: true,
        singlePilotSE: true,
        singlePilotME: true,
        multiPilot: true,
        nightTime: true,
        ifrTime: true,
        picTime: true,
        copilotTime: true,
        dualTime: true,
        instructorTime: true,
        landingsDay: true,
        landingsNight: true,
      }
    })

    previousTotals = previousFlights.reduce((acc, flight) => ({
      totalTime: acc.totalTime + (flight.totalTime || 0),
      singlePilotSE: acc.singlePilotSE + (flight.singlePilotSE || 0),
      singlePilotME: acc.singlePilotME + (flight.singlePilotME || 0),
      multiPilot: acc.multiPilot + (flight.multiPilot || 0),
      nightTime: acc.nightTime + (flight.nightTime || 0),
      ifrTime: acc.ifrTime + (flight.ifrTime || 0),
      picTime: acc.picTime + (flight.picTime || 0),
      copilotTime: acc.copilotTime + (flight.copilotTime || 0),
      dualTime: acc.dualTime + (flight.dualTime || 0),
      instructorTime: acc.instructorTime + (flight.instructorTime || 0),
      landingsDay: acc.landingsDay + (flight.landingsDay || 0),
      landingsNight: acc.landingsNight + (flight.landingsNight || 0),
    }), {
      totalTime: 0, singlePilotSE: 0, singlePilotME: 0, multiPilot: 0,
      nightTime: 0, ifrTime: 0, picTime: 0, copilotTime: 0, dualTime: 0, instructorTime: 0,
      landingsDay: 0, landingsNight: 0
    })
  }

  return {
    flights,
    totalCount,
    lifetimeTotals: lifetimeAgg._sum,
    previousTotals: previousTotals || {
      totalTime: 0, singlePilotSE: 0, singlePilotME: 0, multiPilot: 0,
      nightTime: 0, ifrTime: 0, picTime: 0, copilotTime: 0, dualTime: 0, instructorTime: 0,
      landingsDay: 0, landingsNight: 0
    }
  }
}

export async function createFlight(data: FlightFormData) {
  // Calculate total time if not provided? 
  // For now, assume user provides it or we calculate it in UI. 
  // But let's ensure totalTime is consistent if 0.
  // Actually, let's just save what we get.
  
  const flight = await prisma.flight.create({
    data
  })
  
  revalidatePath('/')
  return flight
}

export async function deleteFlight(id: string) {
  await prisma.flight.delete({ where: { id } })
  revalidatePath('/')
}

export async function importFlights(flights: FlightFormData[]) {
  // Bulk create
  // We need to ensure data matches the schema.
  // Assuming validation happens before this call or we validate here.
  // Prisma createMany is efficient.
  
  await prisma.flight.createMany({
    data: flights
  })
  
  revalidatePath('/')
}

export async function getSettings() {
  const settings = await prisma.settings.findFirst()
  if (!settings) {
    return await prisma.settings.create({
      data: { rowsPerPage: 14 }
    })
  }
  return settings
}

export async function updateSettings(rowsPerPage: number) {
  const settings = await getSettings()
  await prisma.settings.update({
    where: { id: settings.id },
    data: { rowsPerPage }
  })
  revalidatePath('/')
}

export async function getUniqueAircraftRegistrations() {
  const flights = await prisma.flight.findMany({
    select: { aircraftReg: true },
    distinct: ['aircraftReg'],
    orderBy: { aircraftReg: 'asc' }
  })
  return flights.map(f => f.aircraftReg)
}

export async function getUniqueAircraftModels() {
  const flights = await prisma.flight.findMany({
    select: { aircraftModel: true },
    distinct: ['aircraftModel'],
    orderBy: { aircraftModel: 'asc' }
  })
  return flights.map(f => f.aircraftModel)
}

export async function getUniquePicNames() {
  const flights = await prisma.flight.findMany({
    select: { picName: true },
    distinct: ['picName'],
    orderBy: { picName: 'asc' }
  })
  return flights.map(f => f.picName).filter(name => name !== 'SELF')
}

export async function getAircraftByRegistration(registration: string) {
  const flight = await prisma.flight.findFirst({
    where: { aircraftReg: registration.toUpperCase() },
    select: { aircraftModel: true, aircraftReg: true }
  })
  return flight
}

export async function getUniqueDeparturePlaces() {
  const flights = await prisma.flight.findMany({
    select: { departurePlace: true },
    distinct: ['departurePlace'],
    orderBy: { departurePlace: 'asc' }
  })
  return flights.map(f => f.departurePlace)
}

export async function getUniqueArrivalPlaces() {
  const flights = await prisma.flight.findMany({
    select: { arrivalPlace: true },
    distinct: ['arrivalPlace'],
    orderBy: { arrivalPlace: 'asc' }
  })
  return flights.map(f => f.arrivalPlace)
}


