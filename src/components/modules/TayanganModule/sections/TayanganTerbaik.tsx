"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { tayanganInterface } from "../interface";
import { checkIsFilm, getTopTenTayangan } from "@/actions/tayangan";
import { MONTH } from "../constants";
import { usePathname } from "next/navigation";

export const TayanganTerbaik = () => {
  const [data, setData] = useState<tayanganInterface[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await getTopTenTayangan();
      setData(res);
      console.log(res);
    };
    getData();
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
    }
  });

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
            {data?.map((d, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{d.judul}</td>
                <td>{d.sinopsis}</td>
                <td>{d.url_video_trailer}</td>
                <td>
                  {d
                    ? `${new Date(d.release_date_trailer).getDate()} ${
                        MONTH[new Date(d.release_date_trailer).getMonth()]
                      } ${new Date(d.release_date_trailer).getFullYear()}`
                    : "-"}
                </td>
                <td>{d.total_view}</td>
                {isLoggedIn && (
                  <td>
                    <Link
                      href={
                        d.is_film
                          ? "/tayangan/film/" + d.id
                          : "/tayangan/series/" + d.id
                      }
                    >
                      <button className="btn">Halaman Tayangan</button>
                    </Link>{" "}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
