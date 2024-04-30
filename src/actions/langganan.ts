"use server";
import { sql } from "@vercel/postgres";

export async function getAllUserTransaction(username: string) {
    const QUERY = `
SELECT
P.nama,
TR.start_date_time,
TR.end_date_time,
TR.metode_pembayaran,
TR.timestamp_pembayaran,
P.harga
FROM TRANSACTION TR
JOIN PAKET P ON TR.nama_paket = P.nama
WHERE TR.username = '${username}'
ORDER BY timestamp_pembayaran DESC;
`;
    const { rows } = await sql.query(QUERY);

    return rows;
}

export async function getActivePacketFromTransaction(username: string) {
    const QUERY = `
SELECT
P.nama,
P.harga,
P.resolusi_layar,
(
    SELECT STRING_AGG(dukungan_perangkat, ', ')
    FROM DUKUNGAN_PERANGKAT DP
    WHERE DP.nama_paket = P.nama
) AS dukungan_perangkat,
TR.start_date_time,
TR.end_date_time
FROM TRANSACTION TR
JOIN PAKET P ON TR.nama_paket = P.nama
WHERE TR.username = '${username}'
AND DATE(TR.end_date_time) >= CURRENT_DATE
ORDER BY timestamp_pembayaran DESC
LIMIT 1;
`;

    const { rows, rowCount } = await sql.query(QUERY);

    return { rowCount, rows };
}

export async function getAllPackets() {
    const { rows } = await sql`
SELECT
P.nama,
P.harga,
P.resolusi_layar,
(
    SELECT STRING_AGG(dukungan_perangkat, ', ')
    FROM DUKUNGAN_PERANGKAT DP
    WHERE DP.nama_paket = P.nama
) AS dukungan_perangkat
FROM PAKET P;
`;

    return rows;
}

export async function getSpecificPacket(nama: string) {
    const QUERY = `
SELECT
P.nama,
P.harga,
P.resolusi_layar,
(
    SELECT STRING_AGG(dukungan_perangkat, ', ')
    FROM DUKUNGAN_PERANGKAT DP
    WHERE DP.nama_paket = P.nama
) AS dukungan_perangkat
FROM PAKET P
WHERE P.nama = '${nama}';
`;

    const { rows } = await sql.query(QUERY);

    return rows;
}

export async function MutateTransaction(
    username: string,
    nama: string,
    paymentMethod: string
) {
    const now = new Date();
    const later = new Date(new Date().setMonth(now.getMonth() + 3));

    const QUERY = `
INSERT INTO TRANSACTION VALUES
('${username}', '${now.getFullYear()}-${formatMonth(
        now.getMonth()
    )}-${now.getDate()}', '${later.getFullYear()}-${formatMonth(
        later.getMonth()
    )}-${later.getDate()}', '${nama}', '${paymentMethod}', '${now.toLocaleString()}')
    `;

    try {
        const { rows } = await sql.query(QUERY);

        return rows;
    } catch (error: any) {
        if (error?.message?.includes("duplicate key")) {
            const UPDATE_QUERY = `
            UPDATE TRANSACTION
            SET
            nama_paket = '${nama}',
            metode_pembayaran = '${paymentMethod}',
            timestamp_pembayaran = '${now.toLocaleString()}'
            WHERE username = '${username}'
            AND start_date_time = '${now.getFullYear()}-${formatMonth(
                now.getMonth()
            )}-${now.getDate()}';`;

            const { rows } = await sql.query(UPDATE_QUERY);

            return rows;
        }
    }
}

function formatMonth(month: number) {
    return month < 10 ? `0${month + 1}` : `${month + 1}`;
}
