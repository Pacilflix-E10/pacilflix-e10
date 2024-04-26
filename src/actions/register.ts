'use server'

import { sql } from "@vercel/postgres";

async function register(formData: FormData) {
    const { rowCount, fields } = await sql`SELECT * FROM pengguna WHERE username = ${formData.get("username")?.toString()};`

    if (rowCount !== 0) {
        return 'User already exist'
    }

    console.log(fields);

    const { } = await sql`INSERT INTO pengguna (username, password) VALUES (${formData.get("username")?.toString()}, ${formData.get("password")?.toString()});`

    return "Register Successfull"
}

export default register