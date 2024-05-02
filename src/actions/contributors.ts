"use server";
import { sql } from "@vercel/postgres";

export async function getContributors(filter: string) {
    let query = `
        SELECT CONTRIBUTORS.id, CONTRIBUTORS.nama, CONTRIBUTORS.jenis_kelamin, CONTRIBUTORS.kewarganegaraan,
            CONCAT_WS(', ', 
                CASE WHEN PENULIS_SKENARIO.id IS NOT NULL THEN 'Penulis Skenario' END,
                CASE WHEN PEMAIN.id IS NOT NULL THEN 'Pemain' END,
                CASE WHEN SUTRADARA.id IS NOT NULL THEN 'Sutradara' END
            ) AS tipe
        FROM CONTRIBUTORS
        LEFT JOIN PENULIS_SKENARIO ON CONTRIBUTORS.id = PENULIS_SKENARIO.id
        LEFT JOIN PEMAIN ON CONTRIBUTORS.id = PEMAIN.id
        LEFT JOIN SUTRADARA ON CONTRIBUTORS.id = SUTRADARA.id
    `;

    if (filter !== "Semua") {
        query += ` WHERE ${filter}.id IS NOT NULL`;
    }

    const { rows } = await sql.query(query);
    return rows;
}
