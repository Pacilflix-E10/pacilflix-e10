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

interface DownloadedItem {
    judul: string;
    username: string;
    timestamp: string;
  }
  
  async function downloads(username: string): Promise<DownloadedItem[] | string> {
    console.log("Fetching...");
  
    const { rowCount, rows } = await sql`
    SELECT TAYANGAN.judul AS judul, TAYANGAN_TERUNDUH.username, TAYANGAN_TERUNDUH.timestamp
    FROM TAYANGAN_TERUNDUH
    JOIN TAYANGAN ON TAYANGAN_TERUNDUH.id_tayangan = TAYANGAN.id
    WHERE TAYANGAN_TERUNDUH.username = ${username};
    `;
  
    if (rowCount === 0) {
      console.log("There is no data");
      return "There is no data";
    }
  
    console.log(rows);
    console.log(rowCount);
  
    const downloadedItems: DownloadedItem[] = rows.map((row) =>    ({
      judul: row.judul,
      username: row.username,
      timestamp: row.timestamp.toISOString(),
    }));
  
    return downloadedItems;
  }

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

export { deleteDownloadedItem, downloads, downloadItem };