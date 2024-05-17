'use server'
import { sql } from "@vercel/postgres"

export async function getAllFilm() {
    const QUERY = `SELECT * FROM tayangan JOIN film ON tayangan.id = film.id_tayangan;`; 
    const { rows } = await sql.query(QUERY); 
    return rows
}

export async function getAllSeries() {
    const QUERY = `SELECT * FROM tayangan JOIN series ON tayangan.id = series.id_tayangan;`;
    const { rows } = await sql.query(QUERY);
    return rows
}

export async function getTopTenTayangan() {

}

export async function searchTayangan(filter: string) {
    const QUERY = `SELECT * FROM tayangan WHERE judul ILIKE '${filter}%';`;
    const { rows } = await sql.query(QUERY); 
    return rows
}
