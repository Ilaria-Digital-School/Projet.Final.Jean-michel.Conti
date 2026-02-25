import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  // 1. Admin
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@portfolio.com' },
    update: { password: hashedPassword },
    create: {
      email: 'admin@portfolio.com',
      password: hashedPassword,
      role: 'admin'
    }
  });
  console.log('✅ Admin créé:', admin.email, '(password: admin123)');

  // 2. User
  const user = await prisma.user.upsert({
    where: { email: 'user@portfolio.com' },
    update: { password: userPassword },
    create: {
      email: 'user@portfolio.com',
      password: userPassword,
      role: 'user'
    }
  });
  console.log('✅ User créé:', user.email, '(password: user123)');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
