"use client"

import withAuth from "@/hoc/withAuth";

const Home = () => {



  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className="text-6xl font-bold text-center">Welcome to Pacilflix E10</h1>
      
    </main>
  );
}

export default withAuth(Home)
