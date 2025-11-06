


import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

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

import LayoutAdmin from './components/Admin/Layout/LayoutAdmin'
import LayoutUser from './components/LayoutUser'
import AdminRoute from './components/Route/ProtectRoute'
import DashboardAdmin from './pages/Admin/DashbordAdmin'
import ProductsAdmin from './pages/Admin/ProductAdmin'
import OrderAdmin from './pages/Admin/OrderAdmin'
import CategoryAdmin from './pages/Admin/CategoryAdmin'
import UserAdmin from './pages/Admin/UserAdmin'
import UserRoute from './components/Route/UserRoute'




const App = () => {
  return (

    <div>

      <Routes>
        <Route element={<LayoutUser />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/:category/:subcategory" element={<Product />} />
          <Route path="/singleproduct" element={<SingleProduct />} />
          <Route path="/categories/:categoryName" element={<CategoryProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={
              <UserRoute>
                <Profile />
              </UserRoute>
            }
          />

          <Route
            path="/order"
            element={
              <UserRoute>
                <OrderPage />
              </UserRoute>
            }
          />

          <Route
            path="/myorders"
            element={
              <UserRoute>
                <MyOrder />
              </UserRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <UserRoute>
                <Cart />
              </UserRoute>
            }
          />

        </Route >
        <Route element={<AdminRoute><LayoutAdmin /></AdminRoute>}>
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/products" element={<ProductsAdmin />} />
          <Route path="/admin/categories" element={<CategoryAdmin />} />
          <Route path="/admin/orders" element={<OrderAdmin />} />
          <Route path="/admin/users" element={<UserAdmin />} />
        </Route>
      </Routes>


    </div>

  )
}

export default App
