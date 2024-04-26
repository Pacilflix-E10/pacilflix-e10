import Image from 'next/image'
import { type ReactNode } from 'react'

const AuthLayout = ({children}: {children: ReactNode}) => {
  return (
    <main className='flex items-center justify-center h-screen'>
        <Image src="/login-bg.png" alt="Pacilflix" fill className='object-cover brightness-50' />
        <div className="z-10 bg-white p-5 rounded-md max-w-[400px] w-full">
        {children}
        </div>
    </main>
  )
}

export default AuthLayout