import { getAllFilm } from "@/actions/tayangan";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { filmInterface } from "../interface";
import { MONTH } from "../constants";

export const Film = () => {
  const [filmList, setFilmList] = useState<filmInterface[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await getAllFilm();
      setFilmList(data);
    }

    getData();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
    }
  }, []);

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
            {filmList.map((film, idx) => (
              <tr key={idx}>
                <td>{film ? film.judul : "-"}</td>
                <td>{film ? film.sinopsis : "-"}</td>
                <td>
                  {film ? (
                    <Link href={film.url_video_trailer}>
                      {film.url_video_trailer}
                    </Link>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {film
                    ? `${new Date(film.release_date_trailer).getDate()}
                     ${
                       MONTH[new Date(film.release_date_trailer).getMonth()]
                     } ${new Date(film.release_date_trailer).getFullYear()}`
                    : "-"}
                </td>
                {isLoggedIn && (
                  <td>
                    <Link href={pathName + "/film/" + film.id}>
                      <button className="btn">Nonton</button>
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
