import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: "Sahil",
      password: "password",
      quizzes: {
        create: [
          {
            title: "Quiz 1",
            description: "This is quiz 1",
          },
          {
            title: "Quiz 2",
            description: "This is quiz 2",
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
