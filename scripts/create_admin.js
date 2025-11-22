const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  const adminEmail = 'admin@example.com';
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    // Pre-hashed password for "admin123" (bcrypt hash with cost 10)
    const hash = '$2b$10$al1JJ3Z8K.GlvjTdaXQYPud77nw06wW9Zygv9NaY/Kk465mDodl02';
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
