import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client";

const db = new PrismaClient();

const SAMPLE_NOTES = [
  {
    title: "Welcome",
    body: "This is a sample note. Edit or delete it to get started.",
  },
  {
    title: "Try the API",
    body: "GET /api/notes and POST /api/notes are available for programmatic access.",
  },
  {
    title: "Extend the schema",
    body: "Add models in prisma/schema.prisma, then run npm run db:push.",
  },
] as const;

async function main() {
  await db.note.deleteMany();

  for (const note of SAMPLE_NOTES) {
    await db.note.create({ data: note });
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
