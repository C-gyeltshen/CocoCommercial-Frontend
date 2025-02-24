import { Button } from "@/components/ui/button";

export default function ContactUs(){
    return(
        <section id="contact" className="mb-16 text-center sm:mb-20 lg:mb-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal mb-4 text-primary">
                Contact Us
                </h2>
                <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-6 sm:mb-8"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Stay in Touch Section */}
                <div className="text-center lg:text-left bg-gradient-to-r from-blue-100 to-blue-300 p-8 rounded-lg shadow-lg">
                    <h3 className="font-serif text-xl sm:text-2xl mb-4 text-primary">
                    Stay in Touch!
                    </h3>
                    <p className="text-gray-600 mb-6">
                    Follow us on our socials so you never miss out on the latest
                    news and updates.
                    </p>
                    <div className="flex justify-center space-x-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                        <i className="fab fa-facebook-f text-2xl"></i>
                    </a>
                    <a href="#" className="text-blue-400 hover:text-blue-600">
                        <i className="fab fa-twitter text-2xl"></i>
                    </a>
                    <a href="#" className="text-pink-500 hover:text-pink-700">
                        <i className="fab fa-instagram text-2xl"></i>
                    </a>
                    <a href="#" className="text-blue-700 hover:text-blue-900">
                        <i className="fab fa-linkedin-in text-2xl"></i>
                    </a>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="p-8 bg-white rounded-lg shadow-lg">
                    <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                        type="text"
                        placeholder="First Name*"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                        <input
                        type="text"
                        placeholder="Last Name*"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                    <input
                        type="email"
                        placeholder="Email*"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <select className="w-full p-3 border rounded-md text-gray-600 focus:ring-2 focus:ring-primary focus:outline-none">
                        <option value="">What is your inquiry related to?*</option>
                        <option value="service">Services</option>
                        <option value="support">Support</option>
                        <option value="general">General Inquiry</option>
                    </select>
                    <textarea
                        placeholder="Message*"
                        rows={4}
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <Button
                        variant="default"
                        className="w-full bg-primary py-3 hover:bg-primary-dark hover:shadow-lg transition-all"
                    >
                        Submit
                    </Button>
                    </form>
                </div>
                </div>
            </section>
    )
}