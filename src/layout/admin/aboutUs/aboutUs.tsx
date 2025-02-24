import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";


export default function AboutUs(){
    const objectives = [
        {
            title: "Empower Local Businesses",
            image: "/ob1.png",
            alt: "Empowering local businesses illustration",
        },
        {
            title: "Bridging the Gap in Digital Adoption",
            image: "/ob2.png",
            alt: "Digital adoption bridge illustration",
        },
        {
            title: "Affordable E-commerce",
            image: "/ob3.png",
            alt: "Affordable e-commerce illustration",
        },
    ];
    return(
        <section id="about" className="mb-16 text-center sm:mb-20 lg:mb-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal mb-4 text-primary">
                About Us
            </h2>
            <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-6 sm:mb-8"></div>
            <h3 className="text-lg sm:text-xl mb-4 font-serif">Objectives</h3>
            <p className="mb-4 sm:mb-6">
            "Connecting Bhutanese Businesses to Broader Markets"
            </p>
            <p className="mb-8 sm:mb-12">
              Coco Commercial is dedicated to transforming the digital landscape
              for Bhutanese businesses by:
            </p>

            {/* Updated Cards Section with Better Image Fitting */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 px-4">
              {objectives.map((objective, idx) => (
                <Card
                  key={idx}
                  className="text-center overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-8">
                    <div className="relative w-48 h-48 mx-auto mb-6">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={objective.image}
                          alt={objective.alt}
                          width={160}
                          height={160}
                          className="max-w-full max-h-full object-contain"
                          style={{ background: "none" }}
                        />
                      </div>
                    </div>
                    <h4 className="font-serif text-lg sm:text-xl text-primary mt-4">
                      {objective.title}
                    </h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
    )
}