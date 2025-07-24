import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './pages/Hero'
import Services from './pages/Services'
import Deals from './pages/Deals'
import Gallery from './pages/Gallery'
import Availability from './pages/Availability'
import Contact from './pages/Contact'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Deals />
      <Gallery />
      <Availability />
      <Contact />
      <Footer />
    </>
  )
}

export default App
