"use client"

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const Navbar = () => {

    const router = useRouter();

  const path = usePathname();

  const { user } = useAuth();

  if (path.includes('/auth')) return null;


  return (
    <nav className='flex items-center justify-between fixed top-0 left-0 h-20 w-full bg-black p-5 z-50'>
        <h1 className="text-red-600 text-3xl font-bold">
          <Link href='/'>
            Pacil
            <span className='text-white'>Flix E10</span>
          </Link>
        </h1>
        {
          user ?
          <ul className="flex items-center justify-center gap-3 text-white">
            <li>
              <Link href='/' className="transition block duration-300 hover:font-bold">Home</Link>
            </li>
            <li>
              <Link href='/tayangan' className="transition block duration-300 hover:font-bold">Shows</Link>
            </li>
            <li>
              <Link href='/contributors' className="transition block duration-300 hover:font-bold">Contributors</Link>
            </li>
            <li>
              <Link href='/favorites' className="transition block duration-300 hover:font-bold">Favorites</Link>
            </li>
            <li>
              <Link href='/downloads' className="transition block duration-300 hover:font-bold">Downloads</Link>
            </li>
            <li>
              <Link href='/subscriptions' className="transition block duration-300 hover:font-bold">Subscriptions</Link>
            </li>
          </ul>
          : 
          <p>
            <Link href="/tayangan" className='hover:font-bold text-white'>Trailer</Link>
          </p>
        }
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