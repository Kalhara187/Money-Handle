import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import IncomeTracker from '../components/IncomeTracker';
import Stats from '../components/Stats';
import VideoDemo from '../components/VideoDemo';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import AIChatBot from '../components/AIChatBot';

const Home = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="video-demo">
        <VideoDemo />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="stats">
        <Stats />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="ai-chatbot">
        <AIChatBot />
      </div>
    </main>
  );
};

export default Home;
