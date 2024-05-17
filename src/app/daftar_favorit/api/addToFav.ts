"use server";
import { sql } from "@vercel/postgres";

async function addToFav(username: string, movieId: string, timestamp: string) {
  console.log("Adding...");

  console.log(username, movieId, timestamp);

  // Convert string timestamp to a Date object, assuming timestamp is in ISO format
  const timestampDate = new Date(timestamp);

  const { rowCount } = await sql`
  INSERT INTO TAYANGAN_MEMILIKI_DAFTAR_FAVORIT (${username}, ${movieId}, ${timestampDate});
    `;

  if (rowCount === 0) {
    console.log("Process Failed");
    return "Process Failed";
  }

  return "Successfully Added";
}

export default addToFav;
