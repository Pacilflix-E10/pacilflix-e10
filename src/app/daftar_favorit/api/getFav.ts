"use server";
import { sql } from "@vercel/postgres";

interface DaftarFav {
  judul: string;
  username: string;
  timestamp: string;
}

async function getfav(username: string): Promise<DaftarFav[] | string> {
  console.log("Fetching...");

  // Query the DAFTAR_FAVORIT table for the given username
  const { rowCount, rows } = await sql`
    SELECT judul, username, timestamp
    FROM DAFTAR_FAVORIT
    WHERE username = ${username}
  `;

  if (rowCount === 0) {
    console.log("There is no data");
    return "There is no data";
  }

  console.log(rows);
  console.log(rowCount);

  // Map the rows to the DaftarFav interface
  const daftarfav: DaftarFav[] = rows.map((row) => ({
    judul: row.judul,
    username: row.username,
    timestamp: row.timestamp.toISOString(),
  }));

  return daftarfav;
}

export default getfav;
