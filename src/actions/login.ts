'use server'
import { sql } from "@vercel/postgres"

async function login(formData: FormData) {
    console.log(formData)

    const { rowCount, fields } = await sql`SELECT * FROM pengguna WHERE username = ${formData.get("username")?.toString()} AND password = ${formData.get("password")?.toString()};`

    if (rowCount === 0) {
        return 'User not found'
    }

    console.log(fields)

    return 'User found'
}

export default login