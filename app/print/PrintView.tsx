'use client'

import { formatTime } from '@/app/lib/utils'
import { Flight } from '@prisma/client'
import { useEffect } from 'react'

interface PrintViewProps {
  flights: Flight[]
  lifetimeTotals: any
}

export default function PrintView({ flights, lifetimeTotals }: PrintViewProps) {
  useEffect(() => {
    window.print()
  }, [])

  return (
    <div className="p-8 bg-white min-h-screen text-black print-container">
      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 1cm;
          }
          body {
            background: white;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none;
          }
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 10pt;
          font-family: sans-serif;
        }
        th, td {
          border: 1px solid #000;
          padding: 4px;
          text-align: center;
        }
        th {
          background-color: #f0f0f0;
          font-weight: bold;
        }
        .text-left { text-align: left; }
        .bg-gray-100 { background-color: #f0f0f0; }
      `}</style>

      <div className="mb-4 no-print flex justify-between items-center">
        <h1 className="text-xl font-bold">Logbook Print View</h1>
        <div className="space-x-4">
          <button 
            onClick={() => window.print()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Print
          </button>
          <button 
            onClick={() => window.close()} 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th rowSpan={2} className="w-24">Date</th>
            <th colSpan={2}>Departure</th>
            <th colSpan={2}>Arrival</th>
            <th colSpan={2}>Aircraft</th>
            <th colSpan={2}>Single Pilot</th>
            <th rowSpan={2}>Multi Pilot</th>
            <th rowSpan={2}>Total Time</th>
            <th rowSpan={2}>PIC Name</th>
            <th colSpan={2}>Landings</th>
            <th colSpan={2}>Operational Condition</th>
            <th colSpan={4}>Pilot Function Time</th>
            <th rowSpan={2}>Remarks</th>
          </tr>
          <tr>
            <th>Place</th>
            <th>Time</th>
            <th>Place</th>
            <th>Time</th>
            <th>Model</th>
            <th>Reg</th>
            <th>SE</th>
            <th>ME</th>
            <th>Day</th>
            <th>Night</th>
            <th>Night</th>
            <th>IFR</th>
            <th>PIC</th>
            <th>COP</th>
            <th>DUAL</th>
            <th>INSTR</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{new Date(flight.date).toLocaleDateString('en-CA').replace(/-/g, '.')}</td>
              <td>{flight.departurePlace}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalPlace}</td>
              <td>{flight.arrivalTime}</td>
              <td className="text-left">{flight.aircraftModel}</td>
              <td>{flight.aircraftReg}</td>
              <td>{formatTime(flight.singlePilotSE)}</td>
              <td>{formatTime(flight.singlePilotME)}</td>
              <td>{formatTime(flight.multiPilot)}</td>
              <td className="font-bold">{formatTime(flight.totalTime)}</td>
              <td className="text-left">{flight.picName}</td>
              <td>{flight.landingsDay}</td>
              <td>{flight.landingsNight}</td>
              <td>{formatTime(flight.nightTime)}</td>
              <td>{formatTime(flight.ifrTime)}</td>
              <td>{formatTime(flight.picTime)}</td>
              <td>{formatTime(flight.copilotTime)}</td>
              <td>{formatTime(flight.dualTime)}</td>
              <td>{formatTime(flight.instructorTime)}</td>
              <td className="text-left text-xs max-w-[150px] truncate">{flight.remarks}</td>
            </tr>
          ))}


          <tr className="bg-gray-100 font-bold">
            <td colSpan={7} className="text-left px-2">TOTAL</td>
            <td>{formatTime(lifetimeTotals.singlePilotSE)}</td>
            <td>{formatTime(lifetimeTotals.singlePilotME)}</td>
            <td>{formatTime(lifetimeTotals.multiPilot)}</td>
            <td>{formatTime(lifetimeTotals.totalTime)}</td>
            <td></td>
            <td>{lifetimeTotals.landingsDay}</td>
            <td>{lifetimeTotals.landingsNight}</td>
            <td>{formatTime(lifetimeTotals.nightTime)}</td>
            <td>{formatTime(lifetimeTotals.ifrTime)}</td>
            <td>{formatTime(lifetimeTotals.picTime)}</td>
            <td>{formatTime(lifetimeTotals.copilotTime)}</td>
            <td>{formatTime(lifetimeTotals.dualTime)}</td>
            <td>{formatTime(lifetimeTotals.instructorTime)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
