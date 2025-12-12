import { getSimulatorSessions, getSettings } from '@/app/lib/actions'
import LogbookView from '@/app/components/LogbookView'

export default async function SimulatorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const page = parseInt((params.page as string) || '1')
  const year = params.year ? parseInt(params.year as string) : undefined
  
  const settings = await getSettings()
  const rowsPerPage = settings.rowsPerPage

  const simulatorData = await getSimulatorSessions(page, rowsPerPage, year)
  const simulatorTotalPages = Math.ceil(simulatorData.totalCount / rowsPerPage)

  const simulatorPageTotals = simulatorData.sessions.reduce((acc: any, session: any) => ({
    totalTime: acc.totalTime + (session.totalTime || 0),
  }), { totalTime: 0 })

  return (
    <LogbookView 
      simulatorSessions={simulatorData.sessions}
      simulatorPage={page}
      simulatorTotalPages={simulatorTotalPages}
      simulatorPageTotals={simulatorPageTotals}
      simulatorPreviousTotals={simulatorData.previousTotals}
      simulatorLifetimeTotals={simulatorData.lifetimeTotals}
      rowsPerPage={rowsPerPage}
      year={year}
      activeTab='simulator'
    />
  )
}
