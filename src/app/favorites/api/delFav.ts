"use server";
import { sql } from "@vercel/postgres";

async function deleteDaftarFavorit(username: string, judul: string, timestamp: string) {
  console.log("Deleting...");

  console.log(username, judul, timestamp);

  const timestampDate = new Date(timestamp);

  try {
  const { rowCount } = await sql`
    DELETE FROM DAFTAR_FAVORIT
    WHERE username = ${username}
    AND judul = ${judul}
    AND timestamp = ${timestampDate};
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

export default deleteDaftarFavorit;
