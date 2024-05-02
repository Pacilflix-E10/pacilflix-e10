import { getAllPackets } from "@/actions/langganan";
import React, { useEffect, useState } from "react";
import { PacketInterface } from "../interface";
import Link from "next/link";

export const PilihPaketLain = () => {
    const [packets, setPackets] = useState<PacketInterface[]>();

    async function getPackets() {
        const result = await getAllPackets();

        setPackets(result as PacketInterface[]);

        console.log(result);
    }

    useEffect(() => {
        getPackets();
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <h2>Pilih Paket Lain:</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th>Resolusi Layar</th>
                            <th>Dukungan Perangkat</th>
                            <th className="text-center">Beli</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packets?.map((value, index) => (
                            <tr key={index}>
                                <td>{value.nama}</td>
                                <td>{value.harga}</td>
                                <td>{value.resolusi_layar}</td>
                                <td>{value.dukungan_perangkat}</td>
                                <td className="flex justify-center">
                                    <Link href={`/langganan/${value.nama}`}>
                                        <button className="btn btn-success h-max min-h-0 py-3">
                                            Beli
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
