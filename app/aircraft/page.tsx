import { getFlights, getSettings } from '@/app/lib/actions'
import LogbookView from '@/app/components/LogbookView'

export default async function AircraftPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const page = parseInt((params.page as string) || '1')
  const year = params.year ? parseInt(params.year as string) : undefined
  
  const settings = await getSettings()
  const rowsPerPage = settings.rowsPerPage

  const aircraftData = await getFlights(page, rowsPerPage, year)
  const { flights, totalCount, lifetimeTotals, previousTotals } = aircraftData
  const totalPages = Math.ceil(totalCount / rowsPerPage)

  // Calculate Aircraft Page Totals
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
    <LogbookView 
      flights={flights}
      page={page}
      totalPages={totalPages}
      pageTotals={pageTotals}
      previousTotals={previousTotals}
      lifetimeTotals={lifetimeTotals}
      rowsPerPage={rowsPerPage}
      year={year}
      activeTab='aircraft'
    />
  )
}
