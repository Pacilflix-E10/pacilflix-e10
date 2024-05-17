import { FC } from 'react';

interface DownloadModalProps {
    show: boolean;
    onClose: () => void;
    showTitle: string;
}

const DownloadModal: FC<DownloadModalProps> = ({ show, onClose, showTitle }) => {
    if (!show) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-center">
                    SUKSES MENAMBAHKAN<br/>TAYANGAN KE DAFTAR<br/>UNDUHAN
                </h3>
                <p className="py-4 text-center">
                    Selamat! Anda telah berhasil mengunduh {showTitle} dan akan
                    berlaku hingga 12 - 05 - 2024. Cek informasi selengkapnya
                    pada halaman daftar unduhan.
                </p>
                <div className="modal-action justify-center">
                    <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={onClose}>
                        Your Downloads
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownloadModal;
