"use client";

import { getContributors } from "@/actions/contributors";
import withAuth from "@/hoc/withAuth";
import React, { useEffect, useState } from "react";

interface contributorsInterface {
  id: string;
  nama: string;
  jenis_kelamin: number;
  kewarganegaraan: string;
  tipe: string;
}

const Contributors = () => {
  const [filter, setFilter] = useState("Semua");
  const [contributors, setContributors] = useState<contributorsInterface[]>();

  async function getData(filter: string) {
    const result = await getContributors(filter);
    setContributors(result as contributorsInterface[]);
  }

  useEffect(() => {
    getData(filter);
  }, [filter]);

  function handleFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilter(event.target.value);
  }

  return (
    <section className="flex flex-col gap-6 px-4 md:px-10 py-3 md:py-5 mt-[80px]">
      <h1 className="text-center font-bold text-[24px] md:text-[32px]">
        DAFTAR KONTRIBUTOR
      </h1>
      <select
        className="mx-auto select select-bordered w-full max-w-xs"
        defaultValue={"Filter by"}
        onChange={handleFilter}
      >
        <option disabled>Filter by</option>
        <option value={"Semua"}>Semua</option>
        <option value={"PEMAIN"}>Pemain</option>
        <option value={"SUTRADARA"}>Sutradara</option>
        <option value={"PENULIS_SKENARIO"}>Penulis Skenario</option>
      </select>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Nama</th>
              <th>Tipe</th>
              <th>Jenis Kelamin</th>
              <th>Kewarganegaraan</th>
            </tr>
          </thead>
          <tbody>
            {contributors?.map((value, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{value.nama}</td>
                <td>{value.tipe}</td>
                <td>{value.jenis_kelamin === 0 ? "Laki-laki" : "Perempuan"}</td>
                <td>{value.kewarganegaraan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default withAuth(Contributors);
