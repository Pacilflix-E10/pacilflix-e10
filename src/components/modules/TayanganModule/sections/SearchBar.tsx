'use client'
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export const SearchBar = () => {
    const searchParams = useSearchParams(); 
    const { replace } = useRouter(); 
    const pathname = usePathname(); 

    const [search, setSearch] = useState(''); 

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }
        replace(pathname + '?' + params.toString());
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();      
        handleSearch(search);
    }

    return (      
        <form onSubmit={handleSubmit} className="flex w-full max-w-lg mx-auto space-x-1">
            <input 
                type="text" 
                className="input input-bordered w-full" 
                placeholder="Cari tayangan" 
                onChange={(e) => setSearch(e.target.value)}
            />
            <button 
                type="submit"
                className="px-4 py-2 rounded-lg btn btn-primary"                                                
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </button>  
            {/* <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                        
        </form>        
    )
}