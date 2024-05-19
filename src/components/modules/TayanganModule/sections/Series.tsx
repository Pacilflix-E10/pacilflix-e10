import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { seriesInterface } from "../interface";
import { getAllSeries } from "@/actions/tayangan";
import { MONTH } from "../constants";

export const Series = () => {
  const [seriesList, setSeriesList] = useState<seriesInterface[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await getAllSeries();
      setSeriesList(data);
    }

    getData();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
    }
  });

  let pathName = usePathname();

  return (
    <div>
      <h1 className="text-xl font-bold">Series</h1>
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
            {seriesList.map((series, idx) => (
              <tr key={idx}>
                <td>{series.judul}</td>
                <td>{series.sinopsis}</td>
                <td>
                  {series ? (
                    <Link href={series.url_video_trailer}>
                      {series.url_video_trailer}
                    </Link>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {series
                    ? `${new Date(series.release_date_trailer).getDate()} ${
                        MONTH[new Date(series.release_date_trailer).getMonth()]
                      }
                ${new Date(series.release_date_trailer).getFullYear()}`
                    : "-"}
                </td>
                {isLoggedIn && (
                  <td>
                    <Link href={pathName + "/series/" + series.id}>
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
