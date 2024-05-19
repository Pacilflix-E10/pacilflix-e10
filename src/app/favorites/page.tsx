"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/app/downloads/components/ConfirmationModal";
import { getfav, deleteDaftarFavorit } from "@/actions/favorites";
import withAuth from "@/hoc/withAuth";


interface DaftarFav {
  judul: string;
  username: string;
  timestamp: string;
}

const FavouritesPage = () => {
  const [username, setUsername] = useState("");
  const [favorites, setFavorites] = useState<DaftarFav[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      fetchFavorites(storedUsername);
    }
  }, []);

  const fetchFavorites = async (username: string) => {
    const favs = await getfav(username);
    if (Array.isArray(favs)) {
      setFavorites(favs);
    } else {
      console.error("Error fetching favorites:", favs);
    }
  };

  const router = useRouter();

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalConfirm = () => {
    // No need to fetch downloads here
  };

  const deleteFavorite = async (judul: string, timestamp: string) => {
    try {
      const data = await deleteDaftarFavorit(username, judul, timestamp);
      if (data === "Item deleted") {
        setModalMessage(`"${judul}" has been deleted from your favorites.`);
        setShowModal(true);
        setFavorites((prevFavorites) =>
          prevFavorites.filter(
            (item) => item.judul !== judul && item.timestamp !== timestamp
          )
        );
        fetchFavorites(username); // Fetch updated data from the server
      } else {
        console.log(data); // Handle the case when the item is not found
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleTitleClick = (timestamp: string) => {
    router.push(`/favorites/movielist?timestamp=${timestamp}`);
  };

  return (
    <div className="p-4" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <div className="flex flex-col items-center justify-center p-4 mt-20">
        <h1 className="text-4xl font-bold text-center mb-10 mt-5 text-gray-700">
          {username}'s Favorites List
        </h1>
        <div className="overflow-x-auto shadow-lg rounded-lg w-10/12">
          <table className="table table-zebra rounded-lg">
            <thead>
              <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <th className="py-3 px-6">#</th>
                <th className="py-3 px-6">Title</th>
                <th className="py-3 px-6">Date of Creation</th>
                <th className="w-28 py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">
                    <button onClick={() => handleTitleClick(item.timestamp)} className="hover:underline">
                      {item.judul}
                    </button>
                  </td>
                  <td className="py-3 px-6">{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="btn btn-outline btn-error btn-sm"
                      onClick={() => deleteFavorite(item.judul, item.timestamp)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ConfirmationModal
          show={showModal}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          message={modalMessage}
        />
      </div>
    </div>
  );
};

export default withAuth(FavouritesPage);
