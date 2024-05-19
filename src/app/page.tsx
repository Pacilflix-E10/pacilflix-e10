"use client"

import withAuth from "@/hoc/withAuth";
import Image from "next/image";
import Link from "next/link";

const Home = () => {



  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      <Image src="/home-bg.jpg" alt="Photo by Donald Tong" fill className="object-cover brightness-50 z-0" />
      <article className="z-10 flex items-center justify-center flex-col">
      <h1 className="text-6xl font-bold text-center text-white">
          Welcome to 
          <span className="text-red-600 ml-3">Pacil</span>
          <span className='text-white'>Flix E10</span> 
        </h1>
        <p className="text-white opacity-70 text-center text-xl mt-3">
          A streaming service for everyone
        </p>
        <div className="flex gap-3">

          <Link href="/auth/login" className="btn btn-primary mt-5 mx-auto text-white">Get Started</Link>
          <Link href="/shows" className="btn btn-secondary mt-5 mx-auto text-white">View More</Link>
        </div>
      </article>
      
    </main>
  );
}

export default Home
