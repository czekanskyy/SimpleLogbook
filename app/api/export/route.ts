import { auth } from '@/auth'
import { prisma } from '@/app/lib/db'
import { formatTime } from '@/app/lib/utils'

export async function GET(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year')
  const type = searchParams.get('type') || 'aircraft'

  const where: any = {}
  if (year) {
    where.date = {
      gte: new Date(parseInt(year), 0, 1),
      lt: new Date(parseInt(year) + 1, 0, 1)
    }
  }

  if (type === 'glider') {
    return exportGliderFlights(where)
  } else if (type === 'simulator') {
    return exportSimulatorSessions(where)
  } else {
    return exportAircraftFlights(where)
  }
}

async function exportAircraftFlights(where: any) {
  const flights = await prisma.flight.findMany({
    where,
    orderBy: [
      { date: 'asc' },
      { departureTime: 'asc' }
    ]
  })

  const header = [
    'Date',
    'Departure Place',
    'Departure Time',
    'Arrival Place',
    'Arrival Time',
    'Aircraft Model',
    'Aircraft Reg',
    'Single Pilot SE',
    'Single Pilot ME',
    'Multi Pilot',
    'Total Time',
    'PIC Name',
    'Landings Day',
    'Landings Night',
    'Night Time',
    'IFR Time',
    'PIC Time',
    'Copilot Time',
    'Dual Time',
    'Instructor Time',
    'Remarks'
  ].join(',')

  const rows = flights.map(flight => {
    return [
      flight.date.toISOString().split('T')[0],
      flight.departurePlace,
      flight.departureTime,
      flight.arrivalPlace,
      flight.arrivalTime,
      flight.aircraftModel,
      flight.aircraftReg,
      formatTime(flight.singlePilotSE),
      formatTime(flight.singlePilotME),
      formatTime(flight.multiPilot),
      formatTime(flight.totalTime),
      flight.picName,
      flight.landingsDay,
      flight.landingsNight,
      formatTime(flight.nightTime),
      formatTime(flight.ifrTime),
      formatTime(flight.picTime),
      formatTime(flight.copilotTime),
      formatTime(flight.dualTime),
      formatTime(flight.instructorTime),
      `"${flight.remarks || ''}"`
    ].join(',')
  })

  const csv = [header, ...rows].join('\n')

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="aircraft-logbook-${new Date().toISOString().split('T')[0]}.csv"`
    }
  })
}

async function exportGliderFlights(where: any) {
  const flights = await prisma.gliderFlight.findMany({
    where,
    orderBy: [
      { date: 'asc' },
      { departureTime: 'asc' }
    ]
  })

  const header = [
    'Date',
    'Departure Place',
    'Departure Time',
    'Arrival Place',
    'Arrival Time',
    'Glider Model',
    'Glider Reg',
    'Launch Method',
    'Total Time',
    'PIC Name',
    'Pilot Function',
    'Launches',
    'PIC Time',
    'Dual Time',
    'Instructor Time',
    'Distance',
    'Remarks'
  ].join(',')

  const rows = flights.map(flight => {
    return [
      flight.date.toISOString().split('T')[0],
      flight.departurePlace,
      flight.departureTime,
      flight.arrivalPlace,
      flight.arrivalTime,
      flight.gliderModel,
      flight.gliderReg,
      flight.launchMethod,
      formatTime(flight.totalTime),
      flight.picName,
      flight.pilotFunction,
      flight.launches,
      formatTime(flight.picTime),
      formatTime(flight.dualTime),
      formatTime(flight.instructorTime),
      flight.distance || 0,
      `"${flight.remarks || ''}"`
    ].join(',')
  })

  const csv = [header, ...rows].join('\n')

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="glider-logbook-${new Date().toISOString().split('T')[0]}.csv"`
    }
  })
}

async function exportSimulatorSessions(where: any) {
  const sessions = await prisma.simulatorSession.findMany({
    where,
    orderBy: [
      { date: 'asc' }
    ]
  })

  const header = [
    'Date',
    'FSTD Type',
    'Total Time',
    'Exercise',
    'Remarks',
    'Exclude From Total'
  ].join(',')

  const rows = sessions.map(session => {
    return [
      session.date.toISOString().split('T')[0],
      session.fstdType,
      formatTime(session.totalTime),
      `"${session.exercise || ''}"`,
      `"${session.remarks || ''}"`,
      (session as any).excludeFromTotal ? 'true' : 'false'
    ].join(',')
  })

  const csv = [header, ...rows].join('\n')

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="simulator-logbook-${new Date().toISOString().split('T')[0]}.csv"`
    }
  })
}
