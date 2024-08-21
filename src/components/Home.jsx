import { Container } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (

    <Container maxWidth="xl" className='bg-gray-200 h-[calc(100vh-7vh)]'>
        <div className='pt-10 mx-auto w-full flex items-center justify-center'>
            <NavLink className="bg-purple-600 text-xl text-white p-1 px-3 rounded-md " to='/dashboard'>Go to Dashboard</NavLink>
        </div>
    </Container>
  )
}

export default Home
