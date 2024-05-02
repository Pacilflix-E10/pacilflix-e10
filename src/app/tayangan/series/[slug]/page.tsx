import { BagianUlasan } from "@/components/modules/TayanganModule/sections/BagianUlasan";
import { useEffect, useState } from "react";

const halamanSeries = ({ params }: { params: { slug: string } }) => {
    let judul = "City Hunter";
    let episodeLinks = ["http1", "http2", "http3"]; 

    let totalView = 234523; 
    let ratingRataRata = 2.5; 
    let sinopsis = "Lorem Ipsum"; 
    let genres = ["comedy", "romance"]
    let asalNegara = "Jepang"; 

    let pemain = ["Ryohei Suzuki", "Misato Morita", "Masanobu Ando"]; 
    let penulis = ["Tatsuro Mishima"]; 
    let sutradara = "Yuichi Sato"; 

    return (
        <section className="flex flex-col gap-6 px-4 md:px-10 py-3 md:py-5 mt-20">
            <h1 className="text-center font-bold text-[24px]">
                HALAMAN SERIES
            </h1>

            <div className="flex flex-col space-y-5">
                <h2 className="text-2xl font-bold">Judul: {judul}</h2>            
                <div>
                    <p className="text-xl font-bold">Episode:</p>
                    <ul className="list-disc list-inside">
                        {episodeLinks.map((ep) => (
                            <li key={ep}><a href="https://netflix.com">{ep}</a></li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col space-y-3">                    
                    <button className="btn btn-primary"> Unduh Tayangan </button>
                    <button className="btn btn-primary"> Favorit Tayangan </button>
                </div>
                <div>
                    <p><span className="font-medium"> Total View: </span> {totalView} </p>
                    <p><span className="font-medium"> Rating Rata-Rata: </span> {ratingRataRata} </p>
                    <p><span className="font-medium"> Sinopsis: </span>  {sinopsis} </p>                    
                    <div>
                        <p className="font-medium"> Genre: </p>
                        <ul className="list-disc list-inside">
                            {genres.map((genre) => (
                                <li key={genre}>{genre}</li>
                            ))}
                        </ul>
                    </div>
                    <p><span className="font-medium"> Asal Negara: </span> {asalNegara} </p>
                </div>

                <div>
                    <p className="font-medium">Pemain:</p>
                    <ul className="list-disc list-inside">
                        {pemain.map((p) => (
                            <li key={p}>{p}</li>
                        ))}
                    </ul>
                </div>

                <div>                
                    <p className="font-medium"> Penulis Skenario:</p>
                    <ul className="list-disc list-inside">                    
                        {penulis.map((p) => (
                            <li key={p}>{p}</li>
                        ))}
                    </ul>
                </div>
                    
                <p><span className="font-medium"> Sutradara: </span> {sutradara}</p>

                <BagianUlasan /> 
            </div>

        </section>
    ); 
}

export default halamanSeries; 