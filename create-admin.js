const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@czekanski.dev'
  const password = 'admin123' // Change this to a secure password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Check if admin already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    console.log('Admin user already exists!')
    return
  }

  // Create admin user
  const user = await prisma.user.create({
    data: {
      email,
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
      isApproved: true,
    }
  })

  console.log('Admin user created successfully!')
  console.log(`Email: ${email}`)
  console.log(`Password: ${password}`)
  console.log('Please change the password after first login!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
