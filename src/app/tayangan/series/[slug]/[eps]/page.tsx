import { BagianUlasan } from "@/components/modules/TayanganModule/sections/BagianUlasan";

const halamanSeries = ({ params }: { params: { slug: string, eps: string } }) => {
    let judul = "Spongebob Squarepants"; 
    let subJudul = "Spongebob VS the Goo"; 
    let episodeLinks = [
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley", 
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
    ]; 

    let sinopsis = "Lorem Ipsum"; 
    let durasiJam = 1; 
    let durasiMenit = 40; 
    let tanggalRilis = "01/01/2001"; 
    let urlEpisode = "http"; 

    return (
        <section className="flex flex-col gap-6 px-4 md:px-10 py-3 md:py-5">
            <h1 className="text-center font-bold text-[24px]">
                HALAMAN EPISODE
            </h1>

            <div className="flex flex-col space-y-5">
                <div>
                    <h2 className="text-xl font-bold">Judul: {judul}</h2>            
                    <h2 className="text-2xl font-bold">Sub Judul: {subJudul}</h2>            
                </div>

                <div>
                    <p className="text-l font-bold">Episode Lainnya:</p>
                    <ul className="list-disc list-inside">
                        {episodeLinks.map((ep, idx) => (
                            <li key={ep}><a href={ep}>Episode {idx+1} </a></li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col space-y-3">
                    <button className="btn btn-primary"> Tonton </button>
                </div>
                <div>                    
                    <p><span className="font-medium"> Sinopsis: </span>  {sinopsis} </p>
                    <p><span className="font-medium"> Durasi Episode: </span>  {durasiJam} jam {durasiMenit} menit</p>
                    <p><span className="font-medium"> URL Episode: </span> {urlEpisode} </p>
                    <p><span className="font-medium"> Tanggal Rilis Episode: </span>  {tanggalRilis} </p>                    
                </div>                
            </div>
            <BagianUlasan />
        </section>
    ); 
}

export default halamanSeries; 