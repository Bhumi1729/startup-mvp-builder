import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Startup MVP Builder",
  description: "Build your startup MVP with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SignedIn>
            <header className="flex justify-between items-center p-4 md:px-6 backdrop-blur-md bg-black/80 border-b border-pink-600/20 sticky top-0 z-50 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <div className="w-9 h-9 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-red-600 rounded-lg flex items-center justify-center animate-pulse">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-red-600 rounded-lg blur opacity-30 -z-10 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
                  Startup MVP Builder
                </div>
              </div>
              <div className="scale-125">
                <UserButton afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-12 h-12 ring-2 ring-pink-500/40 hover:ring-pink-500/70 transition-all duration-300",
                      userButtonTrigger: "h-12 w-12",
                      avatarImage: "w-full h-full object-cover"
                    }
                  }}
                />
              </div>
            </header>
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
