// "use client" directive for making this a Client Component in Next.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { downloads, deleteDownloadedItem } from "@/actions/downloads";
import ConfirmationModal from "@/app/downloads/components/ConfirmationModal";
import { title } from "process";
import withAuth from "@/hoc/withAuth";

interface DownloadedItem {
  judul: string;
  timestamp: string;
}

const DownloadsPage = () => {
  const [username, setUsername] = useState("");
  const [downloadedItems, setDownloadedItems] = useState<DownloadedItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      fetchDownloads(storedUsername);
    }
  }, []);

  const fetchDownloads = async (username: string) => {
    try {
      const data = await downloads(username);
      if (typeof data === "string") {
        console.log(data); // Handle the case when there is no data
      } else {
        setDownloadedItems(data);
      }
    } catch (error) {
      console.error("Error fetching downloads:", error);
    }
  };

  const deleteItem = async (judul: string, timestamp: string) => {
    try {
      const data = await deleteDownloadedItem(username, judul, timestamp);
      if (data === "Item deleted") {
        setModalMessage(`"${judul}" has been deleted from your downloads.`);
        setShowModal(true);
        setDownloadedItems((prevDownloadedItems) =>
          prevDownloadedItems.filter((item) => item.judul !== judul && item.timestamp !== timestamp)
        );
        fetchDownloads(username); // Fetch updated data from the server
      } else {
        setModalMessage(`"${judul}" minimal harus berada di daftar unduhan selama 1 hari agar bisa dihapus.`);
        setShowModal(true);
        console.log(data); // Handle the case when the item is not found
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalConfirm = () => {
    // No need to fetch downloads here
  };

  return (
    <div className="p-4" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <div className="flex flex-col items-center justify-center p-4 mt-20">
        <h1 className="text-4xl font-bold text-center mb-10 mt-5 text-gray-700">
          {username}'s Downloads
        </h1>
        <div className="overflow-x-auto shadow-lg rounded-lg w-10/12">
          <table className="table table-zebra rounded-lg">
            <thead>
              <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <th className="py-3 px-6">#</th>
                <th className="py-3 px-6">Title</th>
                <th className="py-3 px-6">Downloaded On</th>
                <th className="w-28 py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {downloadedItems.map((item, index) => (
                <tr key={`${item.judul}-${item.timestamp}`}>
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{item.judul}</td>
                  <td className="py-3 px-6">{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="btn btn-outline btn-error btn-sm"
                      onClick={() => deleteItem(item.judul, item.timestamp)}
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

export default withAuth(DownloadsPage);