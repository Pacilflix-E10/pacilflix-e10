"use server";
import { sql } from "@vercel/postgres";

// addToFav.ts
async function addToFav(username: string, movieId: string, timestamp: string) {
  console.log("Adding...");

  console.log(username, movieId, timestamp);

  const timestampDate = new Date(timestamp);
  try {
    const { rowCount } = await sql`
    INSERT INTO TAYANGAN_MEMILIKI_DAFTAR_FAVORIT (id_tayangan, username, timestamp)
    VALUES (${movieId}, ${username}, ${timestampDate as any});
    `;

    if (rowCount === 0) {
      console.log("Process Failed");
      return "Process Failed";
    }

    return "Successfully Added";
  } catch (error) {
    console.error("Error adding item:", error);
    return "Process Failed";
  }
}

// delDetail.ts
async function deleteFavMovie(username: string, judul: string, timestamp: string) {
  console.log("Deleting...");

  console.log(username, judul, timestamp);

  const timestampDate = new Date(timestamp);

  const { rowCount } = await sql`
    DELETE FROM TAYANGAN_MEMILIKI_DAFTAR_FAVORIT
    WHERE username = ${username}
    AND id_tayangan IN (SELECT id FROM TAYANGAN WHERE judul = ${judul})
    AND timestamp = ${timestampDate as any};
  `;

  if (rowCount === 0) {
    console.log("Item not found");
    return "Item not found";
  }

  console.log("Item deleted");
  return "Item deleted";
}

// delFav.ts
async function deleteDaftarFavorit(username: string, judul: string, timestamp: string) {
  console.log("Deleting...");

  console.log(username, judul, timestamp);

  const timestampDate = new Date(timestamp);

  try {
    const { rowCount } = await sql`
      DELETE FROM DAFTAR_FAVORIT
      WHERE username = ${username}
      AND judul = ${judul}
      AND timestamp = ${timestampDate as any};
    `;

    if (rowCount === 0) {
      console.log("Item not found");
      return "Item not found";
    }

    console.log("Item deleted");
    return "Item deleted";
  } catch (error) {
    console.error("Error deleting item:", error);
    return "Item not found";
  }
}

// getDetail.ts
interface MovieFav {
  judul: string;
  username: string;
  timestamp: string;
  judulDaftar: string;
}

async function getMovieFav(timestamp: string): Promise<MovieFav[] | string> {
  console.log("Fetching...");

  const timestampDate = new Date(timestamp);

  try {
    const { rowCount, rows } = await sql`
      SELECT tm.username, tm.timestamp, t.judul, df.judul AS judulDaftar
      FROM TAYANGAN_MEMILIKI_DAFTAR_FAVORIT tm
      JOIN TAYANGAN t ON tm.id_tayangan = t.id
      JOIN DAFTAR_FAVORIT df ON df.timestamp = tm.timestamp
      WHERE tm.timestamp = ${timestampDate as any};
    `;

    if (rowCount === 0) {
      console.log("There is no data");
      return "There is no data";
    }

    console.log(rows);
    console.log(rowCount);

    const movieFavs: MovieFav[] = rows.map((row) => ({
      judul: row.judul,
      username: row.username,
      timestamp: row.timestamp.toISOString(),
      judulDaftar: row.juduldaftar,
    }));

    return movieFavs;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}

// getFav.ts
interface DaftarFav {
  judul: string;
  username: string;
  timestamp: string;
}

async function getfav(username: string): Promise<DaftarFav[] | string> {
  console.log("Fetching...");

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

  const daftarfav: DaftarFav[] = rows.map((row) => ({
    judul: row.judul,
    username: row.username,
    timestamp: row.timestamp.toISOString(),
  }));

  return daftarfav;
}

export {
  addToFav,
  deleteFavMovie,
  deleteDaftarFavorit,
  getMovieFav,
  getfav
};
