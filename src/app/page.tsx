"use client"

import BaseLayout from "@/layout/admin/layout/layout";
import Navbar from "@/layout/admin/navbar/navbar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AboutUs from "@/layout/admin/aboutUs/aboutUs";
import WhoWeServe from "@/layout/admin/serve/serve";
import ContactUs from "@/layout/admin/contactUs/contactUs";
import Footer from "@/layout/admin/footer/footer";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  return (
    <BaseLayout>
      <Navbar />
      <main className="container mx-auto px-6">
        <div className="py-8 sm:py-12 lg:py-16 text-center">
          <div className="mb-8 sm:mb-12">
            {/* Updated Logo Section to match previous styling */}
            <div className="flex justify-center mb-8 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="Coco Commercial Logo"
                width={120}
                height={120}
                className="drop-shadow-md"
              />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-primary mb-4 sm:mb-6">
              Coco Commercial
            </h1>
            <p className="italic text-base sm:text-lg leading-relaxed max-w-xl mx-auto px-4">
              "Where happiness meets business" - it's memorable, wonderful, and
              perfectly captures both the platform's Bhutanese identity through
              its CSR initiatives and its commercial purpose.
            </p>
              <Button
                variant="outline"
                onClick = {() => router.push('/admin/shopCreation')}
                className="mt-6 sm:mt-8 rounded-full px-6 sm:px-8 hover:bg-orange-400 hover:text-white transition-colors duration-300"
              >
                Get Started
              </Button>
          </div>
        </div> 
        <AboutUs />
        <WhoWeServe />
        <ContactUs />
      </main>
      <Footer />
    </BaseLayout>
  );
}
