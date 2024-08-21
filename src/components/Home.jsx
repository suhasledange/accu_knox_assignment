import { Container } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-gray-100'>
    <Container maxWidth="xl" className=' h-[calc(100vh-7vh)]'>
        <div className='pt-10 mx-auto w-full flex items-center justify-center'>
            <NavLink className="bg-purple-600 text-xl text-white p-1 px-3 rounded-md " to='/dashboard'>Go to Dashboard</NavLink>
        </div>
    </Container>
    </div>

  )
}

export default Home
