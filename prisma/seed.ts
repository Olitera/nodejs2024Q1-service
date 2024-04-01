// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.user.upsert({
    where: { id: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      id: 'Prisma Adds Support for MongoDB',
      login: '',
      password: '',
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  });

  console.log({ post1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

