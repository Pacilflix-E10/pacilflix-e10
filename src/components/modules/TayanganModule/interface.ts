export interface tayanganInterface {
    id: string;
    judul: string;
    sinopsis: string;
    asal_negara: string;
    sinopsis_trailer: string; 
    url_video_trailer: string; 
    release_date_trailer: Date; 
    id_sutradara: string;
    total_view: number;
    is_film: boolean;
}

export interface filmInterface extends tayanganInterface {
    url_video_film: string; 
    release_date_film: Date;
    durasi_film: number;
}

export interface seriesInterface extends tayanganInterface {
    id_tayangan: string;
}

export interface episodeInterface {
    judul: string;
    sub_judul: string; 
    sinopsis: string; 
    durasi: string; 
    url_video: string; 
    release_date: Date; 
}