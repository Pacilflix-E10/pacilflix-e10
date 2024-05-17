'use client'

import { getUlasan } from "@/actions/tayangan";
import { useEffect, useState } from "react"

interface ulasanInterface {
    id: number;
    username: string;
    deskripsi: string;
    rating: number;
}

export const BagianUlasan = ({ id }: { id: string }) => {
    const [ulasan, setUlasan] = useState<ulasanInterface[]>([]); 

    useEffect(() => {
        const getData = async () => {
            const data = await getUlasan(id);
            setUlasan(data); 
            console.log(data);
        }
        getData();
    }, []); 

    return (
        <section className="flex flex-col gap-6">
            <h1 className="text-center font-bold text-[24px]">
                BAGIAN ULASAN 
            </h1>
            <form>
                <div className="rating rating-md">
                    <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" value="1" />
                    <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" value="2" />
                    <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" value="3" />
                    <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" value="4" />
                    <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" value="5" />
                </div>
                <textarea placeholder="Berikan ulasan" className="textarea textarea-bordered textarea-md w-full max-w-full" ></textarea>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <p className="font-bold font-lg">Daftar Ulasan:</p>
            <div className="flex flex-col space-y-5">
                {ulasan?.map((u) => (
                    <div key={u.id} className="flex flex-col space-y-3">
                        <p><span className="font-medium"> Username: </span> {u.username} </p>
                        <p><span className="font-medium"> Deskripsi: </span> {u.deskripsi} </p>
                        <p><span className="font-medium"> Rating: </span> {u.rating} </p>
                    </div>
                ))}
            </div>
        </section>
    )
}