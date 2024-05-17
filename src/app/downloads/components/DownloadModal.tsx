import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DownloadModalProps {
    show: boolean;
    onClose: () => void;
    showTitle: string;
}

const DownloadModal: FC<DownloadModalProps> = ({ show, onClose, showTitle }) => {
    const [expiryDate, setExpiryDate] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        if (show) {
            const currentDate = new Date();
            const expiryDate = new Date();
            expiryDate.setDate(currentDate.getDate() + 7);
            const formattedDate = expiryDate.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
            setExpiryDate(formattedDate);
        }
    }, [show]);

    const handleRedirect = () => {
        onClose();
        router.push('/downloads');
    };

    if (!show) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-center">
                    SUKSES MENAMBAHKAN<br/>TAYANGAN KE DAFTAR<br/>UNDUHAN
                </h3>
                <p className="py-4 text-center">
                    Selamat! Anda telah berhasil mengunduh {showTitle} dan akan
                    berlaku hingga {expiryDate}. Cek informasi selengkapnya
                    pada halaman daftar unduhan.
                </p>
                <div className="modal-action justify-center">
                    <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:red-blue-500 rounded" onClick={handleRedirect}>
                        Your Downloads
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownloadModal;
