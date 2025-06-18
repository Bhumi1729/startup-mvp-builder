'use client';
import React from 'react';
import { Dancing_Script } from 'next/font/google';
import { MultiDirectionSlide } from './MultiDirectionSlide';

// Initialize the cursive font
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700']
});

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-black py-24 overflow-hidden">
      {/* Subtle background grain/texture effect - matching hero section */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>
      
      {/* Background glow effects matching hero section */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-red-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2s"></div>
      
      <div className="container mx-auto px-6 relative z-10">        <div className="max-w-4xl mx-auto">
          {/* Heading with multidirectional slide effect */}
          <div className="mb-16">
            <MultiDirectionSlide 
              textLeft="Where Ideas Begin"
              textRight="— And Products Are Born"
              leftClassName="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              rightClassName="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent"
            />
          </div>
          
          {/* About text with enhanced styling */}
          <div className="space-y-8 text-center">
            {/* <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
              Your first product is more than a prototype — it's a statement.
            </p> */}
            
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Your first product isn’t just a prototype — it’s your opening move, your story in motion. At MVP Builder, we don’t deal in trends or templates. We blend market intelligence, product thinking, system architecture, and intuitive design into one sharp, strategic build process. It’s for founders who want to move fast — but with clarity, confidence, and zero compromise.
            </p>
            
            <div className="pt-6">
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                We exist for founders who think ahead, build sharp, and aim higher from Day One.
              </p>
                <p className={`${dancingScript.className} text-2xl md:text-3xl mt-6 text-transparent bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text relative`}>
                Because the right first move isn't just fast — it's fearless.
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-pink-500 to-red-500"></span>
              </p>
            </div>
          </div>
          
          {/* Subtle divider with gradient */}
          <div className="mt-20 max-w-xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></div>
          </div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        .animation-delay-2s { animation-delay: 2s; }
      `}</style>
    </section>
  );
}
