import React from 'react'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import Fauteuils from './pages/Fauteuils'
import Tables from './pages/Table'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Footer from './components/Footer'


const App = () => {
  return (
    <div>
      


    
<Carousel />
<Fauteuils />
<Tables/>
<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      <Footer />

    </div>
    
  )
}

export default App
