import { z } from 'zod'

export const flightSchema = z.object({
  date: z.coerce.date(),
  departurePlace: z.string().min(1, "Departure place is required"),
  departureTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  arrivalPlace: z.string().min(1, "Arrival place is required"),
  arrivalTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  aircraftModel: z.string().min(1, "Aircraft model is required"),
  aircraftReg: z.string().min(1, "Registration is required"),
  singlePilotSE: z.coerce.number().min(0).default(0),
  singlePilotME: z.coerce.number().min(0).default(0),
  multiPilot: z.coerce.number().min(0).default(0),
  totalTime: z.coerce.number().min(0).default(0),
  picName: z.enum(["SKALSKI", "SINICA", "SELF"]),
  landingsDay: z.coerce.number().int().min(0).default(0),
  landingsNight: z.coerce.number().int().min(0).default(0),
  nightTime: z.coerce.number().min(0).default(0),
  ifrTime: z.coerce.number().min(0).default(0),
  picTime: z.coerce.number().min(0).default(0),
  copilotTime: z.coerce.number().min(0).default(0),
  dualTime: z.coerce.number().min(0).default(0),
  instructorTime: z.coerce.number().min(0).default(0),
  remarks: z.string().optional(),
})

export type FlightFormData = z.infer<typeof flightSchema>
