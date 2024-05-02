'use client'

import { SearchBar } from "./sections/SearchBar";
import { TayanganTerbaik } from "./sections/TayanganTerbaik";
import { Film } from "./sections/Film";
import { Series } from "./sections/Series";
import { HasilPencarian } from "./sections/HasilPencarian";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const TayanganModule = () => {
    const searchParams = useSearchParams();

    return searchParams.get('search') ?
    (
        <section className="flex flex-col gap-6 px-4 md:px-10 py-3 md:py-5">
            <h1 className="text-center font-bold text-[24px] md:text-[32px]">
                DAFTAR TAYANGAN 
            </h1>
            <SearchBar /> 
            <HasilPencarian /> 
        </section>
    ) : (
        <section className="flex flex-col gap-6 px-4 md:px-10 py-3 md:py-5">
            <h1 className="text-center font-bold text-[24px] md:text-[32px]">
                DAFTAR TAYANGAN 
            </h1>
            <SearchBar />            
            <TayanganTerbaik />
            <Film /> 
            <Series />
        </section>
    ); 
}