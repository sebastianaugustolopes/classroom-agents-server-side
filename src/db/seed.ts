import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection";
import { schema } from "./schema";

async function main() {
  const seedSchema = {
    rooms: schema.rooms,
    questions: schema.questions,
  };

  await reset(db, seedSchema);

  await seed(db, seedSchema).refine((f) => ({
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 20,
    },
  }));

  await sql.end();

  console.log("Database seeded");
}

main();
