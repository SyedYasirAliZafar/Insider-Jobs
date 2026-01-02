import React from 'react'
import { assets } from '../assets/assets'
import {UserButton, useUser, useClerk} from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

function Navbar() {

    const {user} = useUser()

    const {openSignIn} = useClerk()

  return (
    <div className='shadow py-4'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <img src={assets.logo} alt="" />
        {
            user ? <div className='flex items-center gap-3'>
                <Link to={'/applications'}>Applied Jobs</Link>
                <p>|</p>
                <p className='max-sm:hidden'>Hi, {user.firstName+ " "+user.lastName}</p>
                <UserButton/>
            </div> 
            : 
            <div className='flex gap-4 max-sm:text-xs'>
            <button className='text-gray-600 cursor-pointer '>Recruiter Login</button>
            <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer active:scale-95 transition'>Login</button>
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar
