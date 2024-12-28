import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const CocoCommercial = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Navigation Bar */}
      <nav className="bg-[#567B9C] py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Coco Commercial Logo"
              width={50}
              height={50}
              className="mr-8"
            />
            <div className="flex items-center space-x-12">
              <a href="#" className="text-white hover:text-gray-200 text-lg">
                Home
              </a>
              <a
                href="#about"
                className="text-white hover:text-gray-200 text-lg"
              >
                About Us
              </a>
              <a
                href="#contact"
                className="text-white hover:text-gray-200 text-lg"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="text-white hover:text-gray-200 text-lg"
            >
              Login
            </Button>
            <Button
              variant="default"
              className="bg-[#FF9B50] text-white hover:bg-[#FF8730] text-lg px-8"
            >
              Sign up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="Coco Commercial Logo"
            width={80}
            height={80}
            className="mx-auto mb-6"
          />
          <h1 className="text-3xl font-semibold text-[#2B4C7E] mb-4">
            Coco Commercial
          </h1>
          <p className="text-gray-600 italic">
            "Where happiness meets business" - it's memorable, wonderful, and
            perfectly captures both the platform's Bhutanese identity through
            its CSR initiatives and its commercial purpose.
          </p>
          <Button variant="outline" className="mt-6 rounded-full">
            Get Started
          </Button>
        </div>

        {/* About Us Section */}
        <section id="about" className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-[#2B4C7E]">
            About Us
          </h2>
          <h3 className="text-lg mb-4">Objectives</h3>
          <p className="text-gray-600 mb-8">
            "Connecting Bhutanese Businesses to Broader Markets"
          </p>
          <p className="text-gray-600 mb-12">
            Coco Commercial is dedicated to transforming the digital landscape
            for Bhutanese businesses by:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Empower Local Businesses",
              "Bridging the Gap in Digital Adoption",
              "Affordable E-commerce",
            ].map((text, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full" />
                  <h4 className="font-medium text-[#2B4C7E]">{text}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-[#2B4C7E]">
            Who We Serve
          </h2>
          <p className="text-gray-600 mb-12">
            Our platform is designed to support a diverse range of Bhutanese
            businesses, including:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-full aspect-square bg-gray-100 rounded-full"
                />
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full aspect-square rounded-full overflow-hidden">
                <img
                  src="/bhutan-marketplace.jpg"
                  alt="Bhutanese marketplace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-[#2B4C7E]">
            Contact Us
          </h2>
          <div className="max-w-lg mx-auto">
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your message"
                  rows={4}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <Button variant="default" className="w-full bg-[#2B4C7E]">
                Submit
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CocoCommercial;
