import { getFlights, getSettings } from '@/app/lib/actions'
import PrintView from './PrintView'

export default async function PrintPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const page = parseInt((params.page as string) || '1')
  const year = params.year ? parseInt(params.year as string) : undefined
  
  const settings = await getSettings()
  const rowsPerPage = settings.rowsPerPage

  const { flights, previousTotals, lifetimeTotals } = await getFlights(page, rowsPerPage, year)

  // Calculate Page Totals
  const pageTotals = flights.reduce((acc, flight) => ({
    singlePilotSE: acc.singlePilotSE + flight.singlePilotSE,
    singlePilotME: acc.singlePilotME + flight.singlePilotME,
    multiPilot: acc.multiPilot + flight.multiPilot,
    totalTime: acc.totalTime + flight.totalTime,
    landingsDay: acc.landingsDay + flight.landingsDay,
    landingsNight: acc.landingsNight + flight.landingsNight,
    nightTime: acc.nightTime + flight.nightTime,
    ifrTime: acc.ifrTime + flight.ifrTime,
    picTime: acc.picTime + flight.picTime,
    copilotTime: acc.copilotTime + flight.copilotTime,
    dualTime: acc.dualTime + flight.dualTime,
    instructorTime: acc.instructorTime + flight.instructorTime,
  }), {
    singlePilotSE: 0, singlePilotME: 0, multiPilot: 0, totalTime: 0,
    landingsDay: 0, landingsNight: 0, nightTime: 0, ifrTime: 0,
    picTime: 0, copilotTime: 0, dualTime: 0, instructorTime: 0
  })

  return (
    <PrintView 
      flights={flights}
      pageTotals={pageTotals}
      previousTotals={previousTotals}
      lifetimeTotals={lifetimeTotals}
    />
  )
}
