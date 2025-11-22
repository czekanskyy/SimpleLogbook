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

  const where: any = {}
  if (year) {
    where.date = {
      gte: new Date(parseInt(year), 0, 1),
      lt: new Date(parseInt(year) + 1, 0, 1)
    }
  }

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
      'Content-Disposition': `attachment; filename="logbook-${new Date().toISOString().split('T')[0]}.csv"`
    }
  })
}
