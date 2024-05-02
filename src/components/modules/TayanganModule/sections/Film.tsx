import { getAllFilm } from "@/actions/tayangan";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const Film = () => {
    let data = [
        {
            judul: "City Hunter",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url_trailer: "https://www.netflix.com",
            tanggal_rilis_trailer: "01/01/2001",
            tayangan: "id_tayangan"
        },
        {
            judul: "Little Women",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url_trailer: "https://www.netflix.com",
            tanggal_rilis_trailer: "01/01/2004",
            tayangan: "id_tayangan"
        },
        {
            judul: "A Man Calles Otto",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url_trailer: "https://www.netflix.com",
            tanggal_rilis_trailer: "01/01/2005",
            tayangan: "id_tayangan"
        },
        {
            judul: "13 Bombs in Jakarta",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url_trailer: "https://www.netflix.com",
            tanggal_rilis_trailer: "01/01/2006",
            tayangan: "id_tayangan"
        }
    ]   

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setIsLoggedIn(true);             
        }        
    })

    let pathName = usePathname(); 

    return (
        <div>
            <h1 className="text-xl font-bold">Film</h1>
            <div className="overflow-x-auto">
                <table className="table">                    
                    <thead>                    
                    <tr>                        
                        <th>Judul</th>
                        <th>Sinopsis Trailer</th>
                        <th>URL Trailer</th>
                        <th>Tanggal Rilis Trailer</th>
                        {isLoggedIn && <th>Tayangan</th>}                        
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((d, idx) => (
                        <tr key={idx}>
                            <td>{d.judul}</td>
                            <td>{d.sinopsis}</td>
                            <td>{d.url_trailer}</td>
                            <td>{d.tanggal_rilis_trailer}</td>
                            {isLoggedIn && <td><Link href={pathName + "/film/" + d.tayangan}><button className="btn">Nonton</button></Link> </td>}                            
                        </tr>
                    ))}                                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}