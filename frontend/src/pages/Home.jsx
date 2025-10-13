import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import IncomeTracker from '../components/IncomeTracker';
import Stats from '../components/Stats';

const Home = () => {
  return (
    <main>
      <Hero />
      <IncomeTracker />
      <Features />
      <Stats />
    </main>
  );
};

export default Home;