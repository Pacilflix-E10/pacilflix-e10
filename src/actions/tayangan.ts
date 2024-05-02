'use server'
import { sql } from "@vercel/postgres"

export async function getAllFilm() {
    const { rows } = await sql`SELECT * FROM film;`
    return rows
}

export async function getAllSeries() {

}

export async function getTopTenTayangan() {

}

export async function searchTayangan() {

}
