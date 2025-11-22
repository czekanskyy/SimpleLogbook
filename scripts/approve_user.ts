import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@example.com'
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { isApproved: true, role: 'ADMIN' }
    })
    console.log(`User ${email} approved and set to ADMIN`)
  } catch (e) {
    console.error('Error approving user:', e)
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
