'use client'
import { getEpisodeById, saveRiwayatNonton } from "@/actions/tayangan";
import { MONTH } from "@/components/modules/LanggananModule/constant";
import withAuth from "@/hoc/withAuth";
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

    const [rangeValue, setRangeValue] = useState(0);

    const handleRangeChange = (e: any) => {
        setRangeValue(e.target.value);
    }

    const handleTonton = (e: any) => {    
        const username = localStorage.getItem('username');
        if (!episode || !username || rangeValue < 70) return;
        const end_date = new Date();
        const start_date = new Date(end_date.getTime() - rangeValue/100*episode.durasi * 60000);
        saveRiwayatNonton(params.slug, username, start_date, end_date);
      }

    return (
        <section className="flex flex-col gap-6 px-4 md:px-10 py-3 md:py-5 mt-20">
            <h1 className="text-center font-bold text-[24px]">
                HALAMAN EPISODE
            </h1>

            <div className="flex flex-col space-y-5">
                <div>
                    <h2 className="text-xl font-bold">Judul: {episode?.judul}</h2>            
                    <h2 className="text-2xl font-bold">Sub Judul: {episode?.subjudul}</h2>    
                    <input type="range" min={0} max="100" value={rangeValue} onChange={handleRangeChange} className="range range-success range-sm bg-black" />
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
                    <button className="btn btn-primary" onClick={handleTonton}> Tonton </button>
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

export default withAuth(halamanEpisode); 