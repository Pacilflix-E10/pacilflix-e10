"use client";

import { getActivePacketFromTransaction } from "@/actions/langganan";
import React, { useEffect, useState } from "react";
import { MONTH } from "../constant";
import { ActivePacketInterface } from "../interface";

export const ActivePacket = () => {
    const [activePacket, setActivePacket] = useState<ActivePacketInterface>();

    async function getActivePacket(username: string) {
        const result = await getActivePacketFromTransaction(username);

        if (result.rowCount) {
            setActivePacket(result.rows[0] as ActivePacketInterface);
        }
    }

    useEffect(() => {
        const username = localStorage.getItem("username");

        if (username) getActivePacket(username);
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <h2>Paket Langganan Aktif Anda:</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th>Resolusi Layar</th>
                            <th>Dukungan Perangkat</th>
                            <th>Tanggal Dimulai</th>
                            <th>Tanggal Akhir</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{activePacket ? activePacket.nama : "-"}</td>
                            <td>{activePacket ? activePacket.harga : "-"}</td>
                            <td>
                                {activePacket
                                    ? activePacket.resolusi_layar
                                    : "-"}
                            </td>
                            <td>
                                {activePacket
                                    ? activePacket.dukungan_perangkat
                                    : "-"}
                            </td>
                            <td>
                                {activePacket
                                    ? `${new Date(
                                          activePacket.start_date_time
                                      ).getDate()} ${
                                          MONTH[
                                              new Date(
                                                  activePacket.start_date_time
                                              ).getMonth()
                                          ]
                                      } ${new Date(
                                          activePacket.start_date_time
                                      ).getFullYear()}`
                                    : "-"}
                            </td>
                            <td>
                                {activePacket
                                    ? `${new Date(
                                          activePacket.end_date_time
                                      ).getDate()} ${
                                          MONTH[
                                              new Date(
                                                  activePacket.end_date_time
                                              ).getMonth()
                                          ]
                                      } ${new Date(
                                          activePacket.end_date_time
                                      ).getFullYear()}`
                                    : "-"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
