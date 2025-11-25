'use server'

import { prisma } from './db'
import { flightSchema, FlightFormData } from './schema'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import { auth } from '@/auth'
import { sendNewUserEmail } from './email'

export async function getFlights(page: number = 1, pageSize?: number, year?: number) {
  let limit = pageSize
  if (!limit) {
    const settings = await getSettings()
    limit = settings.rowsPerPage
  }
  
  // If limit is -1, fetch all records (no take/skip)
  const isAll = limit === -1
  const safeLimit = isAll ? undefined : (limit || 14)

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

  const flights = await prisma.flight.findMany({
    where,
    orderBy,
    ...(isAll ? {} : {
      take: safeLimit,
      skip: (page - 1) * (safeLimit as number),
    })
  })

  const totalCount = await prisma.flight.count({ where })

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

  let previousTotals = null
  if (page > 1 && !isAll && safeLimit) {
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
  const flight = await prisma.flight.create({
    data
  })
  
  revalidatePath('/')
  return flight
}

export async function updateFlight(id: string, data: FlightFormData) {
  const flight = await prisma.flight.update({
    where: { id },
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
  await prisma.flight.createMany({
    data: flights
  })
  
  revalidatePath('/')
}

export async function getSettings() {
  const session = await auth()
  
  if (session?.user?.id) {
    const settings = await prisma.settings.findUnique({
      where: { userId: session.user.id }
    })
    
    if (settings) return settings
    
    return await prisma.settings.create({
      data: { 
        userId: session.user.id,
        rowsPerPage: 14,
        language: 'pl'
      }
    })
  }
  
  return { rowsPerPage: 14, language: 'pl', id: 'default' }
}

export async function updateSettings(data: { rowsPerPage?: number; language?: string }) {
  const session = await auth()
  
  if (session?.user?.id) {
    const settings = await prisma.settings.findUnique({
      where: { userId: session.user.id }
    })

    const updateData: any = {}
    if (data.rowsPerPage !== undefined) updateData.rowsPerPage = data.rowsPerPage
    if (data.language !== undefined) updateData.language = data.language

    if (settings) {
      await prisma.settings.update({
        where: { id: settings.id },
        data: updateData
      })
    } else {
      await prisma.settings.create({
        data: {
          userId: session.user.id,
          rowsPerPage: data.rowsPerPage || 14,
          language: data.language || 'pl'
        }
      })
    }
    revalidatePath('/')
  }
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

export async function getUsers() {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }
  
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function toggleUserApproval(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  const userId = formData.get('userId') as string
  const currentStatus = formData.get('currentStatus') === 'true'

  await prisma.user.update({
    where: { id: userId },
    data: { isApproved: !currentStatus }
  })

  revalidatePath('/admin')
}

export async function registerUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!name || !email || !password) {
    return { success: false, error: 'All fields are required' }
  }

  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters' }
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { success: false, error: 'User with this email already exists' }
    }

    const bcrypt = require('bcryptjs')
    const hashedPassword = await bcrypt.hash(password, 10)

    const colors = ['blue', 'red', 'green', 'yellow', 'purple', 'pink', 'indigo', 'cyan', 'orange']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
        isApproved: false,
        avatarColor: randomColor,
      }
    })

    // Manually send email since NextAuth event won't trigger for custom registration
    await sendNewUserEmail(newUser)

    return { success: true }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, error: `Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}` }
  }
}

export async function updateProfile(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const data: any = {}
  if (name) data.name = name
  if (email) data.email = email
  if (password) {
    const bcrypt = require("bcryptjs")
    data.password = await bcrypt.hash(password, 10)
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data,
  })

  revalidatePath("/")
}

export async function changeUserRole(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    throw new Error("Unauthorized")
  }

  const userId = formData.get('userId') as string
  const role = formData.get('role') as 'USER' | 'ADMIN'

  await prisma.user.update({
    where: { id: userId },
    data: { role }
  })

  revalidatePath('/admin')
}

export async function deleteUser(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') {
    throw new Error("Unauthorized")
  }

  const userId = formData.get('userId') as string

  await prisma.session.deleteMany({
    where: { userId }
  })

  await prisma.account.deleteMany({
    where: { userId }
  })

  await prisma.settings.deleteMany({
    where: { userId }
  })

  await prisma.flight.deleteMany({
    where: { userId }
  })

  await prisma.user.delete({
    where: { id: userId }
  })

  revalidatePath('/admin')
}

export async function deleteAllFlights(password: string) {
  const session = await auth()
  if (!session?.user?.id || !session?.user?.email) {
    return { success: false, error: 'Unauthorized' }
  }
  
  // Get user with password
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, password: true }
  })
  
  if (!user || !user.password) {
    return { success: false, error: 'User not found' }
  }
  
  // Verify password
  const bcrypt = require('bcryptjs')
  const passwordsMatch = await bcrypt.compare(password, user.password)
  
  if (!passwordsMatch) {
    return { success: false, error: 'Incorrect password' }
  }
  
  // Delete all flights for this user - CRITICAL: must filter by userId
  // NOTE: Old flights might have userId = null, so we delete ALL if user is authenticated
  // In a multi-user system, this should be reconsidered
  const result = await prisma.flight.deleteMany({
    where: { 
      OR: [
        { userId: session.user.id },
        { userId: null }
      ]
    }
  })
  
  console.log(`Deleted ${result.count} flights for user ${session.user.email}`)
  
  revalidatePath('/')
  return { success: true, deletedCount: result.count }
}
