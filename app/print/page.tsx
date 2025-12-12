import { getFlights, getGliderFlights, getSimulatorSessions, getSettings } from '@/app/lib/actions'
import PrintView from './PrintView'

type LogbookType = 'aircraft' | 'glider' | 'simulator'

export default async function PrintPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const year = params.year ? parseInt(params.year as string) : undefined
  const type = (params.type as LogbookType) || 'aircraft'
  
  if (type === 'glider') {
    const { flights: gliderFlights, lifetimeTotals } = await getGliderFlights(1, -1, year)
    return (
      <PrintView 
        type="glider"
        gliderFlights={gliderFlights}
        gliderLifetimeTotals={lifetimeTotals}
      />
    )
  } else if (type === 'simulator') {
    const { sessions: simulatorSessions, lifetimeTotals } = await getSimulatorSessions(1, -1, year)
    return (
      <PrintView 
        type="simulator"
        simulatorSessions={simulatorSessions}
        simulatorLifetimeTotals={lifetimeTotals}
      />
    )
  } else {
    const { flights, lifetimeTotals } = await getFlights(1, -1, year)
    return (
      <PrintView 
        type="aircraft"
        flights={flights}
        lifetimeTotals={lifetimeTotals}
      />
    )
  }
}
