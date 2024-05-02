"use client";

import React from "react";
import { ActivePacket } from "./sections/ActivePacket";
import { PilihPaketLain } from "./sections/PilihPaketLain";
import { RiwayatTransaksi } from "./sections/RiwayatTransaksi";

export const LanggananModule = () => {
  return (
    <section className="flex flex-col gap-6 px-4 md:px-10 py-3 md:py-5 mt-[80px]">
      <h1 className="text-center font-bold text-[24px] md:text-[32px]">
        HALAMAN KELOLA LANGGANAN
      </h1>
      <ActivePacket />
      <PilihPaketLain />
      <RiwayatTransaksi />
    </section>
  );
};
