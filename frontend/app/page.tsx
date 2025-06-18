import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import LandingPageHero from "./components/LandingPageHero";
import FeatureSection from "./components/FeatureSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <SignedOut>
        {/* Show LandingPageHero for signed-out users */}
        <LandingPageHero />
        <FeatureSection />
        <AboutSection />
        <Footer />
      </SignedOut>
      
      <SignedIn>
        {/* Redirect signed-in users directly to dashboard */}
        <RedirectToDashboard />
      </SignedIn>
    </>
  );
}

function RedirectToDashboard() {
  redirect('/dashboard');
  return null;
}
