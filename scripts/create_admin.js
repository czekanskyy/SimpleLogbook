const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

(async () => {
  const adminEmail = 'admin@example.com';
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const hash = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: adminEmail,
        password: hash,
        role: 'ADMIN',
        isApproved: true,
        avatarColor: 'blue',
      },
    });
    console.log('Admin user created');
  } else {
    console.log('Admin already exists');
  }
  await prisma.$disconnect();
})();
