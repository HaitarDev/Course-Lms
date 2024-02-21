const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        {
          name: "Digital Marketing ",
        },
        {
          name: "Computer Science",
        },
        {
          name: "Photography",
        },
        {
          name: "Music",
        },
        {
          name: "Fitness",
        },
        {
          name: "Cooking",
        },
      ],
    });
    console.log("success");
  } catch (error) {
    console.log("Error sending categories to database", error);
  } finally {
    await database.$disconnect();
  }
}

main();
//  we run the script by :   node scripts/seed.ts
