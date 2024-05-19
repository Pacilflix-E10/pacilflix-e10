import { FC, useEffect, useState } from 'react';
import { getfav } from '@/actions/favorites';

interface FavouriteListModalProps {
  show: boolean;
  onClose: () => void;
  username: string; // Current user's username
  judul: string; // Movie title
  onConfirm: (timestamp: string) => void; // Callback function to handle the selected timestamp
}

interface DaftarFav {
  judul: string;
  username: string;
  timestamp: string;
}

const FavouriteListModal: FC<FavouriteListModalProps> = ({ show, onClose, username, judul, onConfirm }) => {
  const [daftarFavs, setDaftarFavs] = useState<DaftarFav[]>([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState<string | null>(null);

  useEffect(() => {
    const fetchDaftarFavs = async () => {
      const favs = await getfav(username);
      if (Array.isArray(favs)) {
        setDaftarFavs(favs);
      } else {
        console.error('Error fetching favorites:', favs);
      }
    };

    fetchDaftarFavs();
  }, [username]);

  const handleConfirm = () => {
    if (selectedTimestamp) {
      onConfirm(selectedTimestamp);
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add "{judul}" to Your Favorite List</h3>
        <div className="form-control py-4">
          <label className="label">
            <span className="label-text">Select a favorite list</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedTimestamp || ''}
            onChange={(e) => setSelectedTimestamp(e.target.value)}
          >
            <option value="">Select a list</option>
            {daftarFavs.map((fav) => (
              <option key={fav.timestamp} value={fav.timestamp}>
                {fav.judul}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavouriteListModal;