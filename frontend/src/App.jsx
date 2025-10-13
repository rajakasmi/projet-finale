import React from 'react'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'


import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Footer from './components/Footer'
import Product from './pages/Product'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import About from './pages/About'




const App = () => {
  return (
   
    <div>
       <Navbar />
<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/product"element={<Product />} />
        <Route path="/singleproduct"element={<SingleProduct />} />  
        <Route path="/cart"element={<Cart />} />
        <Route path="/contact"element={<Contact />} />
        <Route path="/about"element={<About />} />
      </Routes>
      <Footer />

    </div>
    
  )
}

export default App
