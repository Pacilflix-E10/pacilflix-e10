"use client";

import { MutateTransaction, getSpecificPacket } from "@/actions/langganan";
import { PacketInterface } from "@/components/modules/LanggananModule/interface";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const BeliLangganan = ({ params }: { params: { slug: string } }) => {
    const router = useRouter();

    const [packet, setPacket] = useState<PacketInterface>();
    const [paymentMethod, setPaymentMethod] = useState("");

    async function handleTransaction() {
        if (!paymentMethod) return alert("Silahkan pilih metode pembayaran!");

        const username = localStorage.getItem("username");

        if (username) {
            await MutateTransaction(username, params.slug, paymentMethod);
            router.push("/langganan");
        }
    }

    function handlePaymentMethod(event: React.ChangeEvent<HTMLSelectElement>) {
        setPaymentMethod(event.target.value);
    }

    async function getPacket() {
        const result = await getSpecificPacket(params.slug);
        setPacket(result[0] as PacketInterface);
    }

    useEffect(() => {
        getPacket();
    }, []);

    return (
        <section className="flex flex-col gap-6 px-4 md:px-10 py-3 md:py-5">
            <h1 className="text-center font-bold text-[24px] md:text-[32px]">
                HALAMAN BELI
            </h1>
            <div className="flex flex-col gap-2">
                <h2>Informasi Paket yang Ingin Dibeli:</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Harga</th>
                                <th>Resolusi Layar</th>
                                <th>Dukungan Perangkat</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{packet?.nama}</td>
                                <td>{packet?.harga}</td>
                                <td>{packet?.resolusi_layar}</td>
                                <td>{packet?.dukungan_perangkat}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <p className="text-center">Pilih Metode Pembayaran:</p>
                <select
                    className="mx-auto select select-bordered w-full max-w-xs"
                    defaultValue={"Pilih Opsi"}
                    onChange={handlePaymentMethod}
                >
                    <option disabled>Pilih Opsi</option>
                    <option>transfer bank</option>
                    <option>kartu kredit</option>
                    <option>e-wallet</option>
                </select>
            </div>
            <div className="flex justify-center">
                <button
                    className="btn btn-success w-max h-max min-h-0 px-8 py-3"
                    onClick={handleTransaction}
                >
                    Bayar
                </button>
            </div>
        </section>
    );
};

export default withAuth(BeliLangganan);
