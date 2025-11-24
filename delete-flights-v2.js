const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Delete orphan flights (no userId)
  const orphans = await prisma.flight.deleteMany({
    where: { userId: null }
  })
  console.log(`Deleted ${orphans.count} orphan flights.`)

  // Delete admin flights
  const email = 'admin@czekanski.dev'
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (user) {
    const adminFlights = await prisma.flight.deleteMany({
      where: { userId: user.id },
    })
    console.log(`Deleted ${adminFlights.count} flights for user ${email}.`)
  } else {
    console.log(`User ${email} not found.`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
