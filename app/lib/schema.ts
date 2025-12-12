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
  picName: z.string().min(1, "PIC name is required"),
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

// Glider Flight Schema (PART SFCL.050)
export const gliderFlightSchema = z.object({
  date: z.coerce.date(),
  departurePlace: z.string().min(1, "Departure place is required"),
  departureTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  arrivalPlace: z.string().min(1, "Arrival place is required"),
  arrivalTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  gliderModel: z.string().min(1, "Glider model is required"),
  gliderReg: z.string().min(1, "Registration is required"),
  launchMethod: z.enum(["WINCH", "AEROTOW", "SELF", "GRAVITY", "BUNGEE", "AUTOTOW"]),
  totalTime: z.coerce.number().min(0).default(0),
  picName: z.string().min(1, "PIC name is required"),
  pilotFunction: z.enum(["PIC", "DUAL", "FI", "FE"]).default("DUAL"),
  launches: z.coerce.number().int().min(1).default(1),
  picTime: z.coerce.number().min(0).default(0),
  dualTime: z.coerce.number().min(0).default(0),
  instructorTime: z.coerce.number().min(0).default(0),
  distance: z.coerce.number().min(0).optional(),
  operationalConditions: z.string().optional(),
  remarks: z.string().optional(),
})

export type GliderFlightFormData = z.infer<typeof gliderFlightSchema>

// Simulator Session Schema (EASA FSTD)
export const simulatorSessionSchema = z.object({
  date: z.coerce.date(),
  fstdType: z.string().min(1, "FSTD Type is required"),
  totalTime: z.coerce.number().min(0).default(0),
  exercise: z.string().optional(),
  remarks: z.string().optional(),
  excludeFromTotal: z.boolean().default(false),
})

export type SimulatorSessionFormData = z.infer<typeof simulatorSessionSchema>
