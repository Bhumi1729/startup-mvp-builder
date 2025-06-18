import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MVPBuilderForm from "../MVPBuilderForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewMVPPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  return (
    <div className="w-full min-h-screen bg-black relative">
      {/* Back to Dashboard button absolutely positioned top left */}
      <div className="absolute top-6 left-6 z-30">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center text-pink-500 hover:text-pink-400 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle background grain/texture effect */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
        
        {/* Very subtle ambient glow orbs */}
        <div className="absolute top-1/3 left-1/6 w-96 h-96 bg-pink-600/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-red-600/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2s"></div>
      </div>
      
      <div className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
        <MVPBuilderForm />
      </div>
    </div>
  );
}
