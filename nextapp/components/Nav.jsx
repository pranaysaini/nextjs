"use client";

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import {useState, useEffect} from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'


const Nav = () => {

  const isUserLoggedIn = 'true';
  const [Providers, setProviders] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setProviders();
  }, [])


  return (
    
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
          <Image src='/assets/images/logo.svg' alt="promptopea logo" width={30} height={30}
                  className='object-contain' />
          <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation*/}
      <div className='sm:flex hidden'>
        {isUserLoggedIn 
        
          ? 
        
        (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
                Create Post
            </Link>
            
            <button type="button" onClick={signOut} className='outline_btn'>
              Signout
            </button>

            <Link href="/profile">
              <Image src="/assets/images/logo.svg" width={37} height={37} className='rounded-full' alt="profile" />
            </Link>
          </div>
          ) 
          
            : 
          (
            <>
              
              {providers && Object.values(providers).map((providers) => (
                <button type="button" 
                        key={providers.name} 
                        onClick={() => signIn(providers.id)}
                        className='black_btn'
                        >

                    Sign In
                </button>
              ))}
            
            </>
          ) 
        }

      </div>



      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative' >
        {isUserLoggedIn 
          
          ? 
        
        (
          <div className='flex'>
            <Image src="/assets/images/logo.svg" width={37} height={37} className='rounded-full' alt="profile" 
                  onClick={() => setToggle((prev) => !prev)} />

                {
                  toggle && (
                    <div className='dropdown'>
                      <Link href="/profile" className='dropdown_link'
                            onClick={() => (setToggle(false))}>
                          My Profile
                      </Link>

                      <Link href="/create-prompt" className='dropdown_link'
                            onClick={() => (setToggle(false))}>
                          Create Prompt
                      </Link>

                      <button type="button" onClick={() => {() => setToggle(false);
                                                            signOut();
                      }} className='mt-5 w-full black_btn'>
                          Sign Out
                      </button>

                    </div>
                  )
                }
          </div>

        )
        
          :
        
        (
          <>
              
              {providers && Object.values(providers).map((providers) => (
                <button type="button" 
                        key={providers.name} 
                        onClick={() => signIn(providers.id)}
                        className='black_btn'
                        >

                    Sign In
                </button>
              ))}
            
            </>

        )}

      </div>






      
    </nav>
    
    


  )
}

export default Nav