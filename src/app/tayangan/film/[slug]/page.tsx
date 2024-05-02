import { getAllFilm } from "@/actions/tayangan";
import { BagianUlasan } from "@/components/modules/TayanganModule/sections/BagianUlasan";

const halamanFilm = ({ params }: { params: { slug: string } }) => {
    let judul = "City Hunter"; 

    let totalView = 234523; 
    let ratingRataRata = 2.5; 
    let sinopsis = "Lorem Ipsum"; 
    let durasiJam = 1; 
    let durasiMenit = 40; 
    let tanggalRilis = "01/01/2001"; 
    let urlFilm = "http"; 
    let genres = ["comedy", "romance"]
    let asalNegara = "Jepang"; 

    let pemain = ["Ryohei Suzuki", "Misato Morita", "Masanobu Ando"]; 
    let penulis = ["Tatsuro Mishima"]; 
    let sutradara = "Yuichi Sato"; 

    getAllFilm()
        .then(res => {
            console.log("res");
        })

    return (
        <section className="flex flex-col gap-6 px-4 md:px-10 py-3 md:py-5">
            <h1 className="text-center font-bold text-[24px]">
                HALAMAN FILM
            </h1>

            <div className="flex flex-col space-y-5">
                <h2 className="text-2xl font-bold">Judul: {judul}</h2>            
                <div className="flex flex-col space-y-3">
                    <button className="btn btn-primary"> Tonton </button>
                    <button className="btn btn-primary"> Unduh Tayangan </button>
                    <button className="btn btn-primary"> Favorit Tayangan </button>
                </div>
                <div>
                    <p><span className="font-medium"> Total View: </span> {totalView} </p>
                    <p><span className="font-medium"> Rating Rata-Rata: </span> {ratingRataRata} </p>
                    <p><span className="font-medium"> Sinopsis: </span>  {sinopsis} </p>
                    <p><span className="font-medium"> Durasi Film: </span>  {durasiJam} jam {durasiMenit} menit</p>
                    <p><span className="font-medium"> Tanggal Rilis Film: </span>  {tanggalRilis} </p>
                    <p><span className="font-medium"> URL Film: </span> {urlFilm} </p>
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
            </div>

            <BagianUlasan /> 
        </section>
    ); 
}

export default halamanFilm; 