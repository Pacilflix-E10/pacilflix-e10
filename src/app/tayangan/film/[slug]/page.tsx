"use client";
import { useState, useEffect } from "react";
import { getFilmById, saveRiwayatNonton } from "@/actions/tayangan";
import { MONTH } from "@/components/modules/LanggananModule/constant";
import { BagianUlasan } from "@/components/modules/TayanganModule/sections/BagianUlasan";
import DownloadModal from "@/app/downloads/components/DownloadModal";
import downloadItem from "@/app/downloads/api/downloadMovie";
import FavouriteListModal from "@/app/favorites/components/FavouriteListModal";
import addToFav from "@/app/favorites/api/addToFav";
import ConfirmationModal from "@/app/downloads/components/ConfirmationModal";
import withAuth from "@/hoc/withAuth";

interface filmInterface {
  judul: string;
  total_view: number;
  rating_rata_rata: number;
  sinopsis: string;
  durasi_film: number;
  release_date_film: Date;
  url_video_film: string;
  genres: string[];
  asal_negara: string;
  pemain: string[];
  penulis: string[];
  sutradara: string;
}

const halamanFilm = ({ params }: { params: { slug: string } }) => {
  const [film, setFilm] = useState<filmInterface>();
  const [username, setUsername] = useState("");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showFavouriteListModal, setShowFavouriteListModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");
  const [rangeValue, setRangeValue] = useState(0);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const getData = async () => {
      const data = await getFilmById(params.slug);
      setFilm(data);
    };

    getData();
  }, [params.slug]);

  const handleDownload = async () => {
    if (!username) {
      setModalMessage("Username not found");
      setShowConfirmationModal(true);
      return;
    }

    const timestamp = new Date().toISOString();
    const result = await downloadItem(username, params.slug, timestamp);

    if (result !== "Item downloaded successfully") {
      setModalMessage("Tayangan sudah ada di daftar unduhan");
      setShowConfirmationModal(true);
    } else {
      setModalMessage(result);
      setShowDownloadModal(true);
    }
  };

  const handleAddToFavorite = () => {
    setSelectedMovieTitle(film?.judul || "");
    setShowFavouriteListModal(true);
  };

  const handleFavoriteConfirm = async (timestamp: string) => {
    if (!username) {
      setModalMessage("Username not found");
      setShowConfirmationModal(true);
      return;
    }

    const result = await addToFav(username, params.slug, timestamp);

    if (result !== "Successfully Added") {
      setModalMessage("Tayangan sudah ada di daftar tersebut");
      setShowConfirmationModal(true);
    } else {
      console.log(result);
    }
  };

  const handleRangeChange = (e: any) => {
    setRangeValue(e.target.value);
  }

  const handleTonton = (e: any) => {    
    const username = localStorage.getItem('username');
    if (!film || !username || rangeValue < 70) return;
    const end_date = new Date();
    const start_date = new Date(end_date.getTime() - rangeValue / 100 * film.durasi_film * 60000);
    saveRiwayatNonton(params.slug, username, start_date, end_date);
  }

  return (
    <section className="flex flex-col gap-6 px-4 md:px-10 py-3 md:py-5 mt-20">
      <h1 className="text-center font-bold text-[24px]">HALAMAN FILM</h1>

      <div className="flex flex-col space-y-5">
        <h2 className="text-2xl font-bold">Judul: {film?.judul}</h2>
        <input type="range" min={0} max="100" value={rangeValue} onChange={handleRangeChange} className="range range-success range-sm bg-black" />
        <div className="flex flex-col space-y-3">
          <button className="btn btn-primary" onClick={handleTonton}> Tonton </button>
          <button className="btn btn-primary" onClick={handleDownload}> Unduh Tayangan </button>
          <button className="btn btn-primary" onClick={handleAddToFavorite}> Favorit Tayangan </button>
        </div>
        <div>
          <p><span className="font-medium"> Total View: </span> {film?.total_view} </p>
          <p><span className="font-medium"> Rating Rata-Rata: </span> {film?.rating_rata_rata} </p>
          <p><span className="font-medium"> Sinopsis: </span>  {film?.sinopsis} </p>
          <p><span className="font-medium"> Durasi Film: </span>  {film ? Math.floor(film.durasi_film / 60) : ""} jam {film ? film.durasi_film % 60 : ""} menit</p>
          <p><span className="font-medium"> Tanggal Rilis Film: </span>  {film?.release_date_film.getDate()} {film ? MONTH[film?.release_date_film.getMonth()] : ""} {film?.release_date_film.getFullYear()}</p>
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

      <BagianUlasan id={params.slug} />

      <DownloadModal
        show={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        showTitle={film?.judul || ""}
      />

      <FavouriteListModal
        show={showFavouriteListModal}
        onClose={() => setShowFavouriteListModal(false)}
        username={username}
        judul={selectedMovieTitle}
        onConfirm={handleFavoriteConfirm}
      />

      <ConfirmationModal
        show={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        message={modalMessage}
        onConfirm={() => setShowConfirmationModal(false)}
      />
    </section>
  );
};

export default withAuth(halamanFilm);
