"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import getMovieFav from "@/app/daftar_favorit/api/getDetail";
import ConfirmationModal from "@/app/downloads/components/ConfirmationModal";
import deleteFavMovie from "../api/delDetail";

interface MovieData {
  judul: string;
  username: string;
  timestamp: string;
  judulDaftar: string;
}

const MovieListPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [movieFavs, setMovieFavs] = useState<MovieData[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const timestamp = searchParams.get('timestamp');

  useEffect(() => {
    if (timestamp) {
      // Fetch movie favorites data based on the timestamp
      fetchMovieFavs(timestamp);
    }
  }, [timestamp]);

  const fetchMovieFavs = async (timestamp: string) => {
    try {
      const response = await getMovieFav(timestamp);
      if (Array.isArray(response)) {
        setMovieFavs(response);
      } else {
        console.error("Error fetching movie favorites:", response);
      }
    } catch (error) {
      console.error("Error fetching movie favorites:", error);
    }
  };

  if (!movieFavs) {
    return <div>Loading...</div>;
  }

  const handleModalClose = () => {
    setShowModal(false);
  };
  
  const handleModalConfirm = () => {
    // No need to fetch movies here
  };

  const deleteMovieFromFavorite = async (username: string, judul: string, timestamp: string, judulDaftar: string) => {
    try {
      const data = await deleteFavMovie(username, judul, timestamp);
      if (data === "Item deleted") {
        setModalMessage(`"${judul}" has been deleted from ${judulDaftar}.`);
        setShowModal(true);
        setMovieFavs((prevMovies) =>
          prevMovies
            ? prevMovies.filter(
                (item) => item.judul !== judul && item.timestamp !== timestamp
              )
            : []
        );
        fetchMovieFavs(timestamp); // Fetch updated data from the server
      } else {
        console.log(data); // Handle the case when the item is not found
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="p-4 mt-20" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <h1 className="text-4xl font-bold text-center mb-10 mt-5 text-gray-700">
        {movieFavs[0].judulDaftar}
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg w-10/12 mx-auto">
        <table className="table table-zebra rounded-lg">
          <thead>
            <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <th className="py-3 px-6">Title</th>
              <th className="w-28 py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {movieFavs.map((movie, index) => (
              <tr key={index}>
                <td className="py-3 px-6">{movie.judul}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="btn btn-outline btn-error btn-sm text-center"
                    onClick={() =>
                      deleteMovieFromFavorite(
                        movie.judul,
                        movie.judulDaftar,
                        movie.timestamp,
                        movie.judulDaftar
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => router.back()} className="btn btn-outline btn-primary mt-10">
        Back to Favorites
      </button>
      <ConfirmationModal
          show={showModal}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          message={modalMessage}
        />
      </div>
  );
};

export default MovieListPage;
