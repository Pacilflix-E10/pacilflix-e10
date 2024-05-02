import { getAllUserTransaction } from "@/actions/langganan";
import React, { useEffect, useState } from "react";
import { TransactionHistoryInterface } from "../interface";
import { MONTH } from "../constant";

export const RiwayatTransaksi = () => {
    const [transactionHistory, setTransactionHistory] =
        useState<TransactionHistoryInterface[]>();

    async function getHistory(username: string) {
        const result = await getAllUserTransaction(username);
        setTransactionHistory(result as TransactionHistoryInterface[]);
    }

    useEffect(() => {
        const username = localStorage.getItem("username");

        if (username) getHistory(username);
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <h2>Riwayat Transaksi</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nama Paket</th>
                            <th>Tanggal Dimulai</th>
                            <th>Tanggal Akhir</th>
                            <th>Metode Pembayaran</th>
                            <th>Tanggal Pembayaran</th>
                            <th>Total Pembayaran</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionHistory?.map((value, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{value.nama}</td>
                                <td>{`${new Date(
                                    value.start_date_time
                                ).getDate()} ${
                                    MONTH[
                                        new Date(
                                            value.start_date_time
                                        ).getMonth()
                                    ]
                                } ${new Date(
                                    value.start_date_time
                                ).getFullYear()}`}</td>
                                <td>{`${new Date(
                                    value.end_date_time
                                ).getDate()} ${
                                    MONTH[
                                        new Date(value.end_date_time).getMonth()
                                    ]
                                } ${new Date(
                                    value.end_date_time
                                ).getFullYear()}`}</td>
                                <td>{value.metode_pembayaran}</td>
                                <td>{`${new Date(
                                    value.timestamp_pembayaran
                                ).getDate()} ${
                                    MONTH[
                                        new Date(
                                            value.timestamp_pembayaran
                                        ).getMonth()
                                    ]
                                } ${new Date(
                                    value.timestamp_pembayaran
                                ).getFullYear()}`}</td>
                                <td>{value.harga}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
