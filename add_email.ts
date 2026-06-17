import { sql } from "./src/lib/db/index"

async function main() {
  await sql`ALTER TABLE countdowns ADD COLUMN IF NOT EXISTS user_email VARCHAR(255);`
  console.log("Done")
}
main()
