"use server";
import { sql } from "@vercel/postgres";
import { time, timeStamp } from "console";

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

export default downloads;