"use server";
import { sql } from "@vercel/postgres";

async function deleteFavMovie(username: string, judul: string, timestamp: string) {
  console.log("Deleting...");

  console.log(username, judul, timestamp);

  const timestampDate = new Date(timestamp);

  const { rowCount } = await sql`
    DELETE FROM TAYANGAN_MEMILIKI_DAFTAR_FAVORIT
    WHERE username = ${username}
    AND id_tayangan IN (SELECT id FROM TAYANGAN WHERE judul = ${judul})
    AND timestamp = ${timestampDate};
  `;

  if (rowCount === 0) {
    console.log("Item not found");
    return "Item not found";
  }

  console.log("Item deleted");
  return "Item deleted";
}

export default deleteFavMovie;
