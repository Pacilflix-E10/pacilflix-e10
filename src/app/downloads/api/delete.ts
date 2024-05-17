"use server";
import { sql } from "@vercel/postgres";

async function deleteDownloadedItem(username: string, judul: string, timestamp: string) {
  console.log("Deleting...");

  console.log(username, judul, timestamp);

  // Convert string timestamp to a Date object, assuming timestamp is in ISO format
  const timestampDate = new Date(timestamp);

  try {
    const { rowCount } = await sql`
    DELETE FROM TAYANGAN_TERUNDUH
    WHERE username = ${username}
    AND id_tayangan IN (SELECT id FROM TAYANGAN WHERE judul = ${judul})
    AND timestamp = ${timestampDate};
        `;

    if (rowCount === 0) {
        console.log("Item not found");
        return "Item not found";
    }

    return "Item deleted";
  } catch (error) {
    console.error("Error deleting item:", error);
    return "Item not found";
  } 
}

export default deleteDownloadedItem;
