import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import IncomeTracker from '../components/IncomeTracker';
import Stats from '../components/Stats';
import VideoDemo from '../components/VideoDemo';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

const Home = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <IncomeTracker />
      <Features />
      <VideoDemo />
      <Testimonials />
      <Stats />
      <FAQ />
    </main>
  );
};

export default Home;
