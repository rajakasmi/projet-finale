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
import Profile from './pages/Profile' 
import CategoryProducts from './pages/CategoryProducts'
import ProductDetail from './pages/SingleProduct'
import OrderPage from './pages/Order'
import MyOrder from './pages/MyOrder'
import Sidebar from './components/Admin/Layout/Sidebar'
import LayoutAdmin from './components/Admin/Layout/LayoutAdmin'
import LayoutUser from './components/LayoutUser'
import AdminRoute from './components/Route/ProtectRoute'
import Dashbord from './pages/Admin/Dashbord'




const App = () => {
  return (
   
    <div>
       
<Routes>
  <Route element={<LayoutUser />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/:category/:subcategory" element={<Product/>} />
        <Route path="/singleproduct"element={<SingleProduct />} />
        <Route path="/categories/:categoryName" element={<CategoryProducts />} /> 
        <Route path="/product/:id" element={<ProductDetail />} />  
        <Route path="/cart"element={<Cart />} />
        <Route path="/contact"element={<Contact />} />
        <Route path="/about"element={<About />} />
        <Route path="/Profile"element={<Profile />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/myorders" element={<MyOrder />} />
        
        </Route >
        <Route element={<AdminRoute><LayoutAdmin/></AdminRoute>}>
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashbord />} />
          <Route path="/admin/products" element={<div>Admin Products</div>} />
          <Route path="/admin/categories" element={<div>Admin Categories</div>} />
          <Route path="/admin/orders" element={<div>Admin Orders</div>} />
          <Route path="/admin/users" element={<div>Admin Users</div>} />
        </Route>
      </Routes>
      

    </div>
    
  )
}

export default App
