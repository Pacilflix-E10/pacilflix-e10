import Link from 'next/link'
import React from 'react'

const AuthPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <h1 className="text-3xl font-bold text-center mb-5">Welcome to Pacilflix E10</h1>
        <div className="flex gap-3 w-full">
        <Link href="/auth/login" className="btn flex-1">Login</Link>
        <Link href="/auth/register" className="btn flex-1">Register</Link>
        </div>
    </div>
  )
}
    
export default AuthPage