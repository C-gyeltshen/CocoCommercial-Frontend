import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CocoCommercial = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full" />
        <h1 className="text-2xl font-semibold text-[#1a365d] mb-4">
          Coco Commercial
        </h1>
        <p className="text-gray-600 italic mb-4">
          "Where happiness meets business" - it's memorable, wonderful, and
          perfectly captures both the platform's Bhutanese identity through its
          CSR initiatives and its commercial purpose.
        </p>
        <Button variant="outline" className="rounded-full">
          Get Started
        </Button>
      </div>

      {/* About Us Section */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-center mb-8">About Us</h2>
        <h3 className="text-lg text-center mb-4">Objectives</h3>
        <p className="text-center mb-8 text-gray-600">
          "Connecting Bhutanese Businesses to Broader Markets"
        </p>
        <p className="text-center mb-8 text-gray-600">
          Coco Commercial is dedicated to transforming the digital landscape for
          Bhutanese businesses by:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full" />
              <h4 className="font-medium">Empower Local Businesses</h4>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full" />
              <h4 className="font-medium">
                Bridging the Gap in Digital Adoption
              </h4>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full" />
              <h4 className="font-medium">Affordable E-commerce</h4>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-center mb-8">Who We Serve</h2>
        <p className="text-center mb-8 text-gray-600">
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
                src="/api/placeholder/400/400"
                alt="Bhutanese marketplace illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section>
        <h2 className="text-xl font-semibold text-center">Contact Us</h2>
      </section>
    </div>
  );
};

export default CocoCommercial;
