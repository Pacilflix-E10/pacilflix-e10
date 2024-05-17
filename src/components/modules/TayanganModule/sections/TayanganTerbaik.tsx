import Link from "next/link";
import { useEffect, useState } from "react";

export const TayanganTerbaik = () => {
    let data = [
        {
            judul: "Queen of Tears",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url: "https://www.netflix.com",
            tanggalRilis: "01/01/2001",
            totalView: 12345,
            tayangan: "https://www.netflix.com"
        },
        {
            judul: "Baby Reindeer", 
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url: "https://www.netflix.com",
            tanggalRilis: "01/01/2001",
            totalView: 12345,
            tayangan: "https://www.netflix.com"
        },
        {
            judul: "The Last Five Years",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url: "https://www.netflix.com",
            tanggalRilis: "01/01/2001",
            totalView: 12345,
            tayangan: "https://www.netflix.com"
        },
        {
            judul: "The Greatest Showman",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url: "https://www.netflix.com",
            tanggalRilis: "01/01/2001",
            totalView: 12345,
            tayangan: "https://www.netflix.com"
        },
        {
            judul: "La La Land",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url: "https://www.netflix.com",
            tanggalRilis: "01/01/2001",
            totalView: 12345,
            tayangan: "https://www.netflix.com"
        },
        {
            judul: "The Notebook",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url: "https://www.netflix.com",
            tanggalRilis: "01/01/2001",
            totalView: 12345,
            tayangan: "https://www.netflix.com"
        },
        {
            judul: "Crazy Rich Asians",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url: "https://www.netflix.com",
            tanggalRilis: "01/01/2001",
            totalView: 12345,
            tayangan: "https://www.netflix.com"
        },
        {
            judul: "The Fault in Our Stars",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url: "https://www.netflix.com",
            tanggalRilis: "01/01/2001",
            totalView: 12345,
            tayangan: "https://www.netflix.com"
        },
        {
            judul: "A Star is Born",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url: "https://www.netflix.com",
            tanggalRilis: "01/01/2001",
            totalView: 12345,
            tayangan: "https://www.netflix.com"
        },
        {
            judul: "Spongebob Squarepants: The Movie",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url: "https://www.netflix.com",
            tanggalRilis: "01/01/2001",
            totalView: 12345,
            tayangan: "https://www.netflix.com"
        }
    ]

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setIsLoggedIn(true);             
        }        
    })

    return (
        <div>
            <h1 className="text-xl font-bold">10 Tayangan Terbaik Minggu Ini</h1>
            <div className="overflow-x-auto">
                <table className="table">                    
                    <thead>
                    <tr>                        
                        <th>Peringkat</th>
                        <th>Judul</th>
                        <th>Sinopsis Trailer</th>
                        <th>URL Trailer</th>
                        <th>Tanggal Rilis Trailer</th>
                        <th>Total View 7 Hari Terakhir</th>
                        {isLoggedIn && <th>Tayangan</th>}                        
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((d, idx) => (
                        <tr>
                            <th>{idx+1}</th>
                            <td>{d.judul}</td>
                            <td>{d.sinopsis}</td>
                            <td>{d.url}</td>
                            <td>{d.tanggalRilis}</td>
                            <td>{d.totalView}</td>
                            {isLoggedIn && <td><Link href={d.tayangan}><button className="btn">Nonton</button></Link> </td>}                            
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}