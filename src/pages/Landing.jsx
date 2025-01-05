import React from 'react'
import Header from '../components/Header'
import Menu from '../components/Menu'
import GameOptions from '../components/GameOptions'
import Footer from '../components/Footer'

const Landing = () => {
  return (
    <div className='bg-blue-900 min-h-screen text-white font-sans'>
    <Header/>
    <Menu/>
    <GameOptions/>
    <Footer/>

  </div>
  )
}

export default Landing