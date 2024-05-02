import Link from "next/link";
import { usePathname } from "next/navigation";

export const HasilPencarian = () => {
    
    let data = [
        {
            id: "1",
            judul: "Itaewon Class",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url_trailer: "https://www.netflix.com",
            tanggal_rilis_trailer: "01/01/2001",
            tayangan: "https://www.netflix.com"
        },
        {
            id: "2",
            judul: "City Hunter",
            sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero nec odio ultricies lacinia. Nullam nec nunc nec libero.",
            url_trailer: "https://www.netflix.com",
            tanggal_rilis_trailer: "01/01/2004",
            tayangan: "https://www.netflix.com"
        },        
    ]
    return (
        <div>
            <h1 className="text-xl font-bold">Hasil Pencarian</h1>
            <div className="overflow-x-auto">
                <table className="table">                    
                    <thead>
                    <tr>                        
                        <th>Judul</th>
                        <th>Sinopsis Trailer</th>
                        <th>URL Trailer</th>
                        <th>Tanggal Rilis Trailer</th>
                        <th>Tayangan</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((d, idx) => (
                        <tr key={idx}>
                            <td>{d.judul}</td>
                            <td>{d.sinopsis}</td>
                            <td>{d.url_trailer}</td>
                            <td>{d.tanggal_rilis_trailer}</td>
                            <td><Link href={usePathname() + "/film/" + d.id}><button className="btn">Nonton</button></Link> </td>
                        </tr>
                    ))} 
                    </tbody>
                </table>
            </div>
        </div>
    );
}