import React, { useEffect } from 'react'
import Carousel from '../components/Carousel'
import Categories from './Catégories'
import SaleSection from './SaleSection'
import Features from './Feature'

const Home = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="w-full">
        <Carousel />
        <Categories />
        <SaleSection />
        <Features />
      </div>
    </section>
  )
}

export default Home;
