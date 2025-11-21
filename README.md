# SimpleLogbook

A modern, EASA PART FCL.050 compliant pilot logbook application built with Next.js, Prisma, and Tailwind CSS.

![SimpleLogbook](https://img.shields.io/badge/EASA-FCL.050%20Compliant-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

- ✅ **PART FCL.050 Compliance** - Meets all EASA logbook requirements
- ✅ **Secure Authentication** - User registration, login, and admin approval system
- ✅ **Admin Panel** - Manage users, roles, and approvals
- ✅ **Modern UI** - Beautiful, responsive design with dark mode
- ✅ **Smart Autocomplete** - Type-ahead suggestions for airports, aircraft, and pilot names
- ✅ **Auto-calculations** - Flight time calculated automatically from departure/arrival times
- ✅ **CSV Import** - Bulk import flights from CSV files
- ✅ **Comprehensive Help** - Built-in documentation for PART FCL.050 requirements
- ✅ **Bilingual** - Full support for Polish and English
- ✅ **Offline Ready** - SQLite database, works without internet connection
- ✅ **Docker Support** - Ready for containerized deployment

## Screenshots

*Coming soon*

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Database**: SQLite with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **Icons**: [Lucide React](https://lucide.dev/)

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OR Docker and Docker Compose

## Installation

### Method 1: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/czekanskyy/SimpleLogbook.git
   cd SimpleLogbook
   ```

2. **Configure Environment**
   Edit `docker-compose.yml` to set your `AUTH_SECRET`.

3. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

### Method 2: Manual Installation

1. **Clone the repository**

```bash
git clone https://github.com/czekanskyy/SimpleLogbook.git
cd SimpleLogbook
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up the database and environment**

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./prisma/dev.db"
AUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32
```

Initialize the database:

```bash
npx prisma generate
npx prisma db push
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Authentication
- **Register**: Create a new account.
- **Approval**: New accounts require Admin approval before logging in.
- **Admin**: The first user or designated admin can manage users at `/admin`.

### Adding Flights

1. Click **"Dodaj Lot"** (Add Flight) button
2. Fill in flight details:
   - Date
   - Departure/Arrival airports (ICAO codes)
   - Departure/Arrival times (UTC)
   - Aircraft registration and type
   - Flight times (SE, ME, MP)
   - Pilot times (PIC, COP, DUAL, INSTR)
   - Landings (day/night)
3. Click **"Zapisz Wpis"** (Save Entry)

### Using Autocomplete

- **Aircraft Registration**: Start typing registration, suggestions appear automatically
- **Aircraft Model**: Auto-fills when you enter a known registration
- **Airports**: Type partial ICAO codes (e.g., "EP" shows EPWA, EPKK)
- **PIC Name**: Suggests previously entered pilot names

### CSV Import

1. Click **"Import CSV"** button
2. Select a CSV file with the following format:

```csv
date,departurePlace,departureTime,arrivalPlace,arrivalTime,aircraftModel,aircraftReg,singlePilotSE,singlePilotME,multiPilot,totalTime,picName,landingsDay,landingsNight,nightTime,ifrTime,picTime,copilotTime,dualTime,instructorTime,remarks
2024-01-15,EPWA,10:00,EPKK,12:30,C172,SP-ABC,02:30,00:00,00:00,02:30,SMITH,1,0,00:00,00:00,02:30,00:00,00:00,00:00,Training flight
```

### Settings

- **Rows per Page**: Adjust how many flights display per page (default: 14, matching EASA standard)
- **Theme**: Toggle between light and dark mode
- **Language**: Switch between Polish and English

## PART FCL.050 Compliance

This application is designed to comply with EASA PART FCL.050 requirements for pilot logbooks. It includes:

- All required fields per FCL.050
- Proper time calculations
- Pilot function types (PIC, SPIC, PICUS, COP, DUAL, INSTR)
- Operational conditions (IFR, Night)
- Aircraft types (SE, ME, MP)
- Landing counts (day/night)

For detailed field explanations, click the **"Pomoc"** (Help) button in the application.

## Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  password      String?
  role          String    @default("USER") // USER, ADMIN
  isApproved    Boolean   @default(false)
  flights       Flight[]
  settings      Settings?
  // ... other auth fields
}

model Flight {
  id               String   @id @default(cuid())
  date             DateTime
  departurePlace   String
  departureTime    String
  arrivalPlace     String
  arrivalTime      String
  aircraftModel    String
  aircraftReg      String
  singlePilotSE    Int      // minutes
  singlePilotME    Int      // minutes
  multiPilot       Int      // minutes
  totalTime        Int      // minutes
  picName          String
  landingsDay      Int
  landingsNight    Int
  nightTime        Int      // minutes
  ifrTime          Int      // minutes
  picTime          Int      // minutes
  copilotTime      Int      // minutes
  dualTime         Int      // minutes
  instructorTime   Int      // minutes
  remarks          String?
  userId           String?
  user             User?    @relation(fields: [userId], references: [id])
  createdAt        DateTime @default(now())
}
```

## Project Structure

```
simplelogbook/
├── app/
│   ├── components/       # React components
│   ├── context/          # React context (UI, theme)
│   ├── lib/              # Utilities, actions, i18n
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
├── public/               # Static assets
└── ...config files
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Run database migrations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own logbook needs.

## Acknowledgments

- Built with ❤️ for the aviation community
- EASA PART FCL.050 compliant
- Designed for pilots, by pilots

## Support

If you find this project useful, please give it a ⭐️ on GitHub!

---

**Note**: This application is for personal logbook management. Always maintain an official backup of your flight records as required by your aviation authority.
