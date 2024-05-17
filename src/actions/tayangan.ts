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

export async function getFilmById(id: string) {
    const result = {
        judul: "",
        total_view: 0, 
        rating_rata_rata: 0,
        sinopsis: "",
        durasi_film: 0,
        asal_negara: "",
        release_date_film: new Date(),
        url_video_film: "",
        genres: [],
        pemain: [],
        penulis: [],
        sutradara: ""
    }
    
    const QUERY = `
        SELECT judul, sinopsis, asal_negara, id_sutradara, url_video_film, release_date_film, durasi_film 
        FROM tayangan JOIN film ON tayangan.id = film.id_tayangan 
        WHERE tayangan.id = '${id}';
    `;
    const { rows } = await sql.query(QUERY); 
    const data = rows[0];

    result.judul = data.judul;
    result.sinopsis = data.sinopsis;
    result.asal_negara = data.asal_negara;
    result.url_video_film = data.url_video_film;
    result.release_date_film = data.release_date_film;
    result.durasi_film = data.durasi_film;

    const QUERY_GENRES = `
        SELECT genre
        FROM genre_tayangan
        WHERE id_tayangan = '${id}';
    `;
    const { rows: rowsGenres } = await sql.query(QUERY_GENRES);
    const tmp: never[] = rowsGenres.map((row) => row.genre) as never[];
    result.genres = tmp;

    const QUERY_PEMAIN = `
        SELECT c.nama 
        FROM contributors c
        JOIN memainkan_tayangan m 
        ON c.id = m.id_pemain
        WHERE m.id_tayangan = '${id}';
    `;
    const { rows: rowsPemain } = await sql.query(QUERY_PEMAIN);
    const tmpPemain: never[] = rowsPemain.map((row) => row.nama) as never[];
    result.pemain = tmpPemain;

    const QUERY_PENULIS = `
        SELECT c.nama 
        FROM contributors c 
        JOIN menulis_skenario_tayangan m
        ON c.id = m.id_penulis_skenario
        WHERE m.id_tayangan = '${id}';
    `;
    const { rows: rowsPenulis } = await sql.query(QUERY_PENULIS);
    const tmpPenulis: never[] = rowsPenulis.map((row) => row.nama) as never[];
    result.penulis = tmpPenulis;

    const QUERY_SUTRADARA = `
        SELECT c.nama
        FROM contributors c
        WHERE c.id = '${data.id_sutradara}';
    `;
    const { rows: rowsSutradara } = await sql.query(QUERY_SUTRADARA);
    result.sutradara = rowsSutradara[0].nama;

    // TODO: ubah cuma kalau 70% ditonton
    const QUERY_TOTAL_VIEW = `
        SELECT id_tayangan, COUNT(*)
        FROM riwayat_nonton 
        WHERE id_tayangan = '${id}'
        GROUP BY id_tayangan;
    `;
    const { rows: rowsTotalView } = await sql.query(QUERY_TOTAL_VIEW); 
    result.total_view = rowsTotalView[0].count; 

    const QUERY_RATING_RATA_RATA = `
        SELECT AVG(rating)
        FROM ulasan
        WHERE id_tayangan = '${id}';
    `;
    const { rows: rowsRating } = await sql.query(QUERY_RATING_RATA_RATA);
    result.rating_rata_rata = rowsRating[0].avg;
    
    return result;
}