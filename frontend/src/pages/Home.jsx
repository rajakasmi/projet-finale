import React from 'react'
import Carousel from '../components/Carousel'
import Categories from './Catégories'
import SaleSection from './SaleSection'
import Features from './Feature'



const Home = () => {
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  return (
    <div>
        
<Carousel />
<Categories />
< SaleSection />
< Features />


      
    </div>
  )
}

export default Home
