import React from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const LayoutUser = () => {
  return (
    <div>
        
       <div>
      <Navbar />
      <main>
        <Outlet /> 
      </main>
      <Footer/>
    </div>
      
    </div>
  )
}

export default LayoutUser
