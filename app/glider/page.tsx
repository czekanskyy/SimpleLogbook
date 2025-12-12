import { getGliderFlights, getSettings } from '@/app/lib/actions'
import LogbookView from '@/app/components/LogbookView'

export default async function GliderPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const page = parseInt((params.page as string) || '1')
  const year = params.year ? parseInt(params.year as string) : undefined
  
  const settings = await getSettings()
  const rowsPerPage = settings.rowsPerPage

  const gliderData = await getGliderFlights(page, rowsPerPage, year)
  const gliderTotalPages = Math.ceil(gliderData.totalCount / rowsPerPage)

  const gliderPageTotals = gliderData.flights.reduce((acc: any, flight: any) => ({
    totalTime: acc.totalTime + (flight.totalTime || 0),
    launches: acc.launches + (flight.launches || 0),
    picTime: acc.picTime + (flight.picTime || 0),
    dualTime: acc.dualTime + (flight.dualTime || 0),
    instructorTime: acc.instructorTime + (flight.instructorTime || 0),
  }), { totalTime: 0, launches: 0, picTime: 0, dualTime: 0, instructorTime: 0 })

  return (
    <LogbookView 
      gliderFlights={gliderData.flights}
      gliderPage={page}
      gliderTotalPages={gliderTotalPages}
      gliderPageTotals={gliderPageTotals}
      gliderPreviousTotals={gliderData.previousTotals}
      gliderLifetimeTotals={gliderData.lifetimeTotals}
      rowsPerPage={rowsPerPage}
      year={year}
      activeTab='glider'
    />
  )
}
