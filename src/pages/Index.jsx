import React from 'react';
import Hero from './Hero';
import Services from './Services';
import Deals from './Deals';
import Gallery from './Gallery';
import Availability from './Availability';
import Contact from './Contact';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';

const Index = () => {
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
  );
};

export default Index;
