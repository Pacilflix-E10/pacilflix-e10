import Link from "next/link";
import { usePathname } from "next/navigation";
import { tayanganInterface } from "../interface";
import { useEffect, useState } from "react";
import { searchTayangan } from "@/actions/tayangan";
import { MONTH } from "../constants";

export const HasilPencarian = ({ filter }: any) => {
  const [data, setData] = useState<tayanganInterface[]>([]);

  async function getData(filter: string) {
    const result = await searchTayangan(filter);
    setData(result);
  }

  useEffect(() => {
    if (filter) getData(filter);
  }, [filter]);

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
            {data.map((tayangan, idx) => (
              <tr key={idx}>
                <td>{tayangan.judul}</td>
                <td>{tayangan.sinopsis}</td>
                <td>
                  <Link href={tayangan.url_video_trailer}>
                    {tayangan ? tayangan.url_video_trailer : "-"}
                  </Link>
                </td>
                <td>
                  {tayangan
                    ? `${new Date(tayangan.release_date_trailer).getDate()} ${
                        MONTH[
                          new Date(tayangan.release_date_trailer).getMonth()
                        ]
                      } ${new Date(
                        tayangan.release_date_trailer
                      ).getFullYear()}`
                    : "-"}
                </td>
                <td>
                  <Link href={usePathname() + "/film/" + tayangan.id}>
                    <button className="btn">Nonton</button>
                  </Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
