export interface ActivePacketInterface {
    nama: string;
    harga: number;
    resolusi_layar: string;
    dukungan_perangkat: string;
    start_date_time: Date;
    end_date_time: Date;
}

export interface PacketInterface {
    nama: string;
    harga: number;
    resolusi_layar: string;
    dukungan_perangkat: string;
}

export interface TransactionHistoryInterface {
    nama: string;
    start_date_time: Date;
    end_date_time: Date;
    metode_pembayaran: string;
    timestamp_pembayaran: Date;
    harga: number;
}
