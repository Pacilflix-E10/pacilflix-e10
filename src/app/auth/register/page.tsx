"use client"

import register from '@/actions/register'
import withPublic from '@/hoc/withPublic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const RegisterPage = () => {

  const router = useRouter();

  return (
    <div className='flex flex-col gap-8'>
        <h1 className="text-4xl font-bold text-center">Sign Up</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          if (!formData.get('username') || !formData.get('password') || formData.get("username")!.length < 5 || formData.get("password")!.length < 6 ) return alert('Please fill in all fields');
          register(formData).then(res => {
            if (res === 'Register Successfull') router.push("/auth/login");
            if (res === 'User already exist') return alert('User already exist');
          });
        }} className='flex flex-col gap-3'>
            <div className="">
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input name="username" type="text" className="grow" placeholder="Username" />
            </label>
            <small>Username must be longer than 5 characters</small>
            </div>
            <div className="">
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input name="password" type="password" className="grow" placeholder='Password' />
            </label>
              <small>Password must be longer than 5 characters</small>
            </div>
            <button className="btn btn-primary">Sign up</button>
        </form>
        <p className=''>
            Have an account?{' '}
            <Link href="/auth/login" className="link">Sign in</Link>
        </p>
    </div>
  )
}
    
export default withPublic(RegisterPage)