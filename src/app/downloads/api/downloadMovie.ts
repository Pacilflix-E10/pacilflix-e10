"use server";
import { sql } from "@vercel/postgres";

async function downloadItem(username: string, movieId: string, timestamp: string) {
  console.log("Inserting...");

  console.log(username, movieId, timestamp);

  // Convert string timestamp to a Date object
  const timestampDate = new Date(timestamp);

  try {
    const { rowCount } = await sql`
      INSERT INTO TAYANGAN_TERUNDUH (id_tayangan, username, timestamp)
      VALUES (${movieId}, ${username}, ${timestampDate});
    `;

    if (rowCount === 0) {
      console.log("Download failed");
      return "Download failed";
    }

    return "Item downloaded successfully";

  } catch (error) {
    console.error("Error downloading item:", error);
    return "Download failed";
  }
}

export default downloadItem;
