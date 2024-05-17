'use client'
import { getEpisodeById } from "@/actions/tayangan";
import { MONTH } from "@/components/modules/LanggananModule/constant";
import { BagianUlasan } from "@/components/modules/TayanganModule/sections/BagianUlasan";
import Link from "next/link";
import { useEffect, useState } from "react";

interface episodeInterface {
    judul: string;
    subjudul: string;
    other_subjudul: string[];
    sinopsis: string;
    durasi: number; 
    release_date: Date;
    url_video: string;
}

const halamanEpisode = ({ params }: { params: { slug: string, eps: string } }) => {
    const [episode, setEpisode] = useState<episodeInterface>(); 
    useEffect(() => {
        const getData = async () => {
            const data = await getEpisodeById(params.slug, params.eps); 
            console.log(data); 
            setEpisode(data); 
        };
        getData();        
    }, []); 

    let judul = "Spongebob Squarepants"; 
    let subJudul = "Spongebob VS the Goo"; 
    let episodeLinks = [
        params.slug,
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
    ]; 

    let sinopsis = "Lorem Ipsum"; 
    let durasiJam = 1; 
    let durasiMenit = 40; 
    let tanggalRilis = "01/01/2001"; 
    let urlEpisode = "http"; 

    return (
        <section className="flex flex-col gap-6 px-4 md:px-10 py-3 md:py-5 mt-20">
            <h1 className="text-center font-bold text-[24px]">
                HALAMAN EPISODE
            </h1>

            <div className="flex flex-col space-y-5">
                <div>
                    <h2 className="text-xl font-bold">Judul: {episode?.judul}</h2>            
                    <h2 className="text-2xl font-bold">Sub Judul: {episode?.subjudul}</h2>    
                    <input type="range" min={0} max="100" className="range range-success range-sm bg-black" />        
                </div>

                <div>
                    <p className="text-l font-bold">Episode Lainnya:</p>
                    <ul className="list-disc list-inside">
                        {episode?.other_subjudul.map((ep, idx) => (
                            <li key={ep}><Link href={ep}>{ep}</Link></li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col space-y-3">
                    <button className="btn btn-primary"> Tonton </button>
                </div>
                <div>                    
                    <p><span className="font-medium"> Sinopsis: </span>  {episode?.sinopsis} </p>
                    <p><span className="font-medium"> Durasi Episode: </span>  {episode?Math.floor(episode.durasi/60):""} jam {episode? episode.durasi % 60:""} menit</p>
                    <p><span className="font-medium"> URL Episode: </span> {episode?.url_video} </p>
                    <p><span className="font-medium"> Tanggal Rilis Episode: </span>  {episode?.release_date.getDate()} {episode?MONTH[episode.release_date.getMonth()]:""} {episode?.release_date.getFullYear()} </p>                    
                </div>                
            </div>
        </section>
    ); 
}

export default halamanEpisode; 