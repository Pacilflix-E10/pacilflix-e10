"use client"

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const Navbar = () => {

    const router = useRouter();

  const path = usePathname();

  if (path.includes('/auth')) return null;

  const { user } = useAuth();

  return (
    <nav className='flex items-center justify-between fixed top-0 left-0 h-20 w-full bg-black p-5 z-50 bg-opacity-40'>
        <h1 className="text-red-600 text-3xl font-bold">
            Pacil
            <span className='text-white'>Flix E10</span>
        </h1>
        <ul className='flex gap-4 items-center text-white'>
          {
            user ?
            <>
            <li>
              <p>{user}</p>
            </li>
            <li>
            <button className="btn btn-secondary" onClick={() => {
              localStorage.removeItem('username');
              router.replace("/auth")
            }}>Logout</button>
            </li>
            </>
            :
            <>
            <li>
            <Link className="" href="/auth/login">Login</Link>
            </li>
            <li>
            <Link className="btn btn-secondary" href="/auth/register">Register</Link>
            </li>
            </>
          }
        </ul>
    </nav>
  )
}

export default Navbar