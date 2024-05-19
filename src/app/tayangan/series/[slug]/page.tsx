'use client'
import { getSeriesById } from "@/actions/tayangan";
import { BagianUlasan } from "@/components/modules/TayanganModule/sections/BagianUlasan";
import withAuth from "@/hoc/withAuth";
import Link from "next/link";
import { useEffect, useState } from "react";

interface seriesInterface {
    judul: string; 
    eps_subjudul: string[];
    total_view: number;
    rating_rata_rata: number;
    sinopsis: string;
    genres: string[];
    asal_negara: string;
    pemain: string[];
    penulis: string[];
    sutradara: string;
}

const halamanSeries = ({ params }: { params: { slug: string } }) => {
    const [series, setSeries] = useState<seriesInterface>();

    useEffect(() => {
        const getData = async () => {
            const data = await getSeriesById(params.slug);
            setSeries(data);
        };

        getData();
    }, []);


    return (
        <section className="flex flex-col gap-6 px-4 md:px-10 py-3 md:py-5 mt-20">
            <h1 className="text-center font-bold text-[24px]">
                HALAMAN SERIES
            </h1>

            <div className="flex flex-col space-y-5">
                <h2 className="text-2xl font-bold">Judul: {series?.judul}</h2>            
                <div>
                    <p className="text-xl font-bold">Episode:</p>
                    <ul className="list-disc list-inside">
                        {series?.eps_subjudul.map((ep) => (
                            <li key={ep}><Link href={params.slug + "/" + ep}>{ep}</Link></li>
                            // {film ? (
                            //     <Link href={film.url_video_trailer}>
                            //       {film.url_video_trailer}
                            //     </Link>
                            //   ) : (
                            //     "-"
                            //   )}
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col space-y-3">                    
                    <button className="btn btn-primary"> Unduh Tayangan </button>
                    <button className="btn btn-primary"> Favorit Tayangan </button>
                </div>
                <div>
                    <p><span className="font-medium"> Total View: </span> {series?.total_view} </p>
                    <p><span className="font-medium"> Rating Rata-Rata: </span> {series?.rating_rata_rata} </p>
                    <p><span className="font-medium"> Sinopsis: </span>  {series?.sinopsis} </p>                    
                    <div>
                        <p className="font-medium"> Genre: </p>
                        <ul className="list-disc list-inside">
                            {series?.genres.map((genre) => (
                                <li key={genre}>{genre}</li>
                            ))}
                        </ul>
                    </div>
                    <p><span className="font-medium"> Asal Negara: </span> {series?.asal_negara} </p>
                </div>

                <div>
                    <p className="font-medium">Pemain:</p>
                    <ul className="list-disc list-inside">
                        {series?.pemain.map((p) => (
                            <li key={p}>{p}</li>
                        ))}
                    </ul>
                </div>

                <div>                
                    <p className="font-medium"> Penulis Skenario:</p>
                    <ul className="list-disc list-inside">                    
                        {series?.penulis.map((p) => (
                            <li key={p}>{p}</li>
                        ))}
                    </ul>
                </div>
                    
                <p><span className="font-medium"> Sutradara: </span> {series?.sutradara}</p>

                <BagianUlasan id={params.slug} /> 
            </div>

        </section>
    ); 
}

export default withAuth(halamanSeries); 