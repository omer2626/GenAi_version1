import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Features from './Features'
import FooterCopyright from './FooterCopyright'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='h-max max-w-full overflow-x-hidden px-[10%] bg-black text-white'>
        <Header></Header>
        <Outlet />
    </div>
  )
}

export default Home
