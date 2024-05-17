"use client";
import { getAllFilm, getFilmById } from "@/actions/tayangan";
import { MONTH } from "@/components/modules/LanggananModule/constant";
import { BagianUlasan } from "@/components/modules/TayanganModule/sections/BagianUlasan";
import { useEffect, useState } from "react";

interface filmInterface {
  judul: string;
  total_view: number; //
  rating_rata_rata: number; //
  sinopsis: string;
  durasi_film: number;
  release_date_film: Date;
  url_video_film: string;
  genres: string[]; //
  asal_negara: string;
  pemain: string[]; //
  penulis: string[]; //
  sutradara: string; //
}

const halamanFilm = ({ params }: { params: { slug: string } }) => {
  const [film, setFilm] = useState<filmInterface>();

  useEffect(() => {
    const getData = async () => {
      const data = await getFilmById(params.slug);
      setFilm(data);
    };

    getData();
  }, []);

  getAllFilm().then((res) => {
    console.log("res");
  });

    return (
        <section className="flex flex-col gap-6 px-4 md:px-10 py-3 md:py-5 mt-20">
            <h1 className="text-center font-bold text-[24px]">
                HALAMAN FILM
            </h1>

            <div className="flex flex-col space-y-5">
                <h2 className="text-2xl font-bold">Judul: {film?.judul}</h2>  
                <input type="range" min={0} max="100" className="range range-success range-sm bg-black" />
                <div className="flex flex-col space-y-3">
                    <button className="btn btn-primary"> Tonton </button>
                    <button className="btn btn-primary"> Unduh Tayangan </button>
                    <button className="btn btn-primary"> Favorit Tayangan </button>
                </div>
                <div>
                    <p><span className="font-medium"> Total View: </span> {film?.total_view} </p>
                    <p><span className="font-medium"> Rating Rata-Rata: </span> {film?.rating_rata_rata} </p>
                    <p><span className="font-medium"> Sinopsis: </span>  {film?.sinopsis} </p>
                    <p><span className="font-medium"> Durasi Film: </span>  {film?Math.floor(film.durasi_film/60):""} jam {film?film.durasi_film%60:""} menit</p>
                    <p><span className="font-medium"> Tanggal Rilis Film: </span>  {film?.release_date_film.getDate()} {film?MONTH[film?.release_date_film.getMonth()]:""} {film?.release_date_film.getFullYear()}</p>
                    <p><span className="font-medium"> URL Film: </span> {film?.url_video_film} </p>
                    <div>
                        <p className="font-medium"> Genre: </p>
                        <ul className="list-disc list-inside">
                            {film?.genres.map((genre) => (
                                <li key={genre}>{genre}</li>
                            ))}
                        </ul>
                    </div>
                    <p><span className="font-medium"> Asal Negara: </span> {film?.asal_negara} </p>
                </div>

        <div>
          <p className="font-medium">Pemain:</p>
          <ul className="list-disc list-inside">
            {film?.pemain.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-medium"> Penulis Skenario:</p>
          <ul className="list-disc list-inside">
            {film?.penulis.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <p>
          <span className="font-medium"> Sutradara: </span> {film?.sutradara}
        </p>
      </div>

      <BagianUlasan />
    </section>
  );
};

export default halamanFilm;
