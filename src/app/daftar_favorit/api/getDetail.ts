"use server";
import { sql } from "@vercel/postgres";


interface MovieFav {
  judul: string;
  username: string;
  timestamp: string;
  judulDaftar: string;
}

async function getMovieFav(timestamp: string): Promise<MovieFav[] | string> {
  console.log("Fetching...");

  const timestampDate = new Date(timestamp);

  // Query to retrieve movie favorites data with judul from DAFTAR_TAYANGAN
  const { rowCount, rows } = await sql`
    SELECT tm.username, tm.timestamp, t.judul, df.judul AS judulDaftar
    FROM TAYANGAN_MEMILIKI_DAFTAR_FAVORIT tm
    JOIN TAYANGAN t ON tm.id_tayangan = t.id
    JOIN DAFTAR_FAVORIT df ON df.timestamp = tm.timestamp
    WHERE tm.timestamp = ${timestampDate};
  `;

  if (rowCount === 0) {
    console.log("There is no data");
    return "There is no data";
  }

  console.log(rows);
  console.log(rowCount);

  // Map the rows to the MovieFav interface
  const movieFavs: MovieFav[] = rows.map((row) => ({
    judul: row.judul,
    username: row.username,
    timestamp: row.timestamp.toISOString(),
    judulDaftar: row.juduldaftar,
  }));

  return movieFavs;
}

export default getMovieFav;