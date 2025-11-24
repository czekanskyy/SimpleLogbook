const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: { flights: true }
      }
    }
  })

  console.log('Users found:', users.length)
  users.forEach(u => {
    console.log(`User: ${u.email} (ID: ${u.id}) - Flights: ${u._count.flights}`)
  })

  const allFlights = await prisma.flight.count()
  console.log('Total flights in DB:', allFlights)
  
  const orphanFlights = await prisma.flight.count({
    where: { userId: null }
  })
  console.log('Orphan flights (no userId):', orphanFlights)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
