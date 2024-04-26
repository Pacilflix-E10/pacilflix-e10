"use client"

import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const Navbar = () => {

    const router = useRouter();

  const path = usePathname();

  if (path.includes('/auth')) return null;

  return (
    <nav className='flex items-center justify-between sticky top-0 left-0 h-20 bg-black p-5'>
        <h1 className="text-red-600 text-3xl font-bold">
            Pacil
            <span className='text-white'>Flix C14</span>
        </h1>
        <ul>
            <li>
            <button className="btn btn-primary" onClick={() => {
              localStorage.removeItem('username');
              router.replace("/auth")
            }}>Logout</button>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar