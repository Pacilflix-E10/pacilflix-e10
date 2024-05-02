export const BagianUlasan = () => {
    let ulasan = [
        {
            id: 1,
            username: "John Doe",
            deskripsi: "Lorem Ipsum",
            rating: 4
        },
        {
            id: 2,
            username: "Jane Doe",
            deskripsi: "Lorem Ipsum",
            rating: 5
        }
    ]

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
                {ulasan.map((u) => (
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