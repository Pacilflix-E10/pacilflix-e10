"use server";
import { sql } from "@vercel/postgres";

async function downloadItem(username: string, movieId: string, timestamp: string) {
  console.log("Inserting...");

  console.log(username, movieId, timestamp);

  // Convert string timestamp to a Date object, assuming timestamp is in ISO format
  const timestampDate = new Date(timestamp);

  const { rowCount } = await sql`
  INSERT INTO TAYANGAN_TERUNDUH (${username}, ${movieId}, ${timestampDate});
    `;

  if (rowCount === 0) {
    console.log("Download failed");
    return "Download failed";
  }

  return "Item downloaded";
}

export default downloadItem;
