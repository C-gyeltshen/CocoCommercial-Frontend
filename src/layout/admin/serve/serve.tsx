"use client"

import Image from "next/image";
import { useState } from "react";

export default function WhoWeServe(){
    const [activeCircle, setActiveCircle] = useState(0);

    const circleContents = [
        {
            title: "Bhutanese Entrepreneurs",
            subtitle: "Hospitality and Tourism",
            description:
                "Small business owners selling handicrafts, textiles products.",
            image: "/1.png",
            },
            {
            title: "Agriculture and Livestock Providers",
            subtitle: "Primary Sector",
            description:
                "Organic farmers, Dairy producers, Poultry and meat processing",
            image: "/2.png",
            },
            {
            title: "Wholesale Trade",
            subtitle: "Retail Sector",
            description:
                "Grocery stores, general shops Electronics, appliance stores, Stationery and bookshops",
            image: "/3.png",
            },
            {
            title: "Hospitality and Tourism",
            subtitle: "Service Sector",
            description:
                "Cafes, restaurants, local eateries, Food and beverage production",
            image: "/4.png",
            },
        ];
    return(
        <section className="mb-16 sm:mb-20 lg:mb-24 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-normal mb-4 text-primary">
          Who We Serve
        </h2>
        <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-6 sm:mb-8"></div>

        <div className="flex flex-col items-center justify-center gap-8">
          {/* Big Circle with Content */}
          <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-gray-300 bg-white shadow-lg">
            <div className="absolute inset-0">
              <Image
                src={circleContents[activeCircle].image}
                alt={circleContents[activeCircle].title}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                priority
              />
            </div>
          </div>

          {/* Description Section */}
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-serif text-xl text-[#1B4965] mb-2">
              {circleContents[activeCircle].title}
            </h3>
            <h4 className="text-lg text-gray-700 mb-2">
              {circleContents[activeCircle].subtitle}
            </h4>
            <p className="text-gray-600 mb-6">
              {circleContents[activeCircle].description}
            </p>
          </div>

          {/* Small Circles with Numbers */}
          <div className="flex space-x-6">
            {circleContents.map((_, index) => (
              <div
                key={index}
                onClick={() => setActiveCircle(index)}
                className={`w-12 h-12 rounded-full cursor-pointer border-2 transition-all flex items-center justify-center ${
                  activeCircle === index
                    ? "border-[#1B4965] bg-gray-100 scale-110"
                    : "border-gray-300 bg-gray-200"
                }`}
              >
                <span
                  className={`text-lg font-medium ${
                    activeCircle === index
                      ? "text-[#1B4965]"
                      : "text-gray-600"
                  }`}
                >
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}