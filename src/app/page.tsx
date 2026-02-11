"use client";
import { Sun, Leaf, DollarSign, Shield, Zap, Home, Building2, Wrench, Menu, X } from "lucide-react";
import { useState } from "react";

const HomePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && message) {
      const whatsappMessage = `Hello Sun Energy, My name is ${firstName} ${lastName}. ${message}`;
      window.open(`https://wa.me/250788689309?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
      setFirstName('');
      setLastName('');
      setMessage('');
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-15 h-15">
              <img src="/logo.png" alt=""/>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sun Energy</h1>
              <p className="text-sm text-gray-600">Powering Rwanda's Future</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="/" className="text-gray-700 hover:text-orange-500 font-light">Home</a>
            <a href="/about" className="text-gray-700 hover:text-orange-500 font-light">About</a>
            <a href="/contact" className="text-gray-700 hover:text-orange-500 font-light">Contact</a>
          </nav>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4 bg-white border-t">
            <a href="/" className="block py-2 text-gray-700 hover:text-orange-500">Home</a>
            <a href="/about" className="block py-2 text-gray-700 hover:text-orange-500">About</a>
            <a href="/contact" className="block py-2 text-gray-700 hover:text-orange-500">Contact</a>
          </div>
        )}
      </header>

      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto bg-cover bg-center" style={{backgroundImage: 'url(/solar.jpg)'}}>
          <div className="bg-black/40 px-4 md:px-8 py-16 md:py-32">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">Switch to Solar Today!</h2>
              <p className="text-base md:text-xl text-white mb-6 md:mb-8">Your go-to partner for sustainable energy. Start generating your own clean energy today and save with eco-friendly solar solutions.</p>
              <button onClick={() => window.open('https://wa.me/250788689309?text=Hello%20Sun%20Energy,%20I%20am%20interested%20in%20solar%20solutions', '_blank')} className="bg-orange-500 text-white px-6 md:px-8 py-3 md:py-4 font-semibold text-base md:text-lg hover:bg-orange-600">Go Solar Today!</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Why Solar Solutions?</h2>
          <p className="text-center text-orange-500 mb-12">Benefits of Going Solar</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-16" style={{backgroundColor: '#cadbe3'}}>
              <h3 className="text-2xl font-bold mb-3">Save Money and Stay Powered</h3>
              <p className="text-gray-600">Lower your bills by generating your own energy and reduce dependence on purchased electricity. Forget about electricity outages - solar power keeps essential devices running so your home or business stays powered all the time.</p>
            </div>
            <div className="p-16" style={{backgroundColor: '#b45c3d'}}>
              <h3 className="text-2xl font-bold mb-3 text-white">Upgrade Your Home's Future Value</h3>
              <h4 className="text-lg font-semibold mb-2 text-white">Attractive to Buyers & Higher Resale Value</h4>
              <p className="text-white">Homes with solar panels are seen as energy-efficient and modern. Properties with solar systems often sell at a premium, adding long-term value with durable, low-maintenance installations.</p>
            </div>
            <div className="p-16" style={{backgroundColor: '#afc8df'}}>
              <h3 className="text-2xl font-bold mb-3">Better for the Environment</h3>
              <p className="text-gray-600">Choosing solar energy means protecting the planet while building a brighter future. Solar power uses clean, natural sunlight, helping reduce carbon emissions and supporting Rwanda's vision for a greener, climate-resilient future.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-8 text-gray-900">How Solar Panels Work</h2>
          <p className="text-center text-gray-600 text-xl mb-16 max-w-3xl mx-auto">Transform sunlight into clean, reliable electricity for your home or business</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-16" style={{backgroundColor: '#cadbe3'}}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Capture Sunlight</h3>
              <p className="text-gray-600">Solar panels installed on your roof contain photovoltaic (PV) cells that capture direct sunlight and convert it into DC electricity.</p>
            </div>
            
            <div className="p-16" style={{backgroundColor: '#cadbe3'}}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Convert Power</h3>
              <p className="text-gray-600">An inverter converts DC electricity into AC electricity - the type used to power all your household and business appliances.</p>
            </div>
            
            <div className="p-16" style={{backgroundColor: '#cadbe3'}}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Power Your Life</h3>
              <p className="text-gray-600">Excess electricity is stored in batteries for use at night or during outages, ensuring continuous and reliable power 24/7.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-600 mb-12">We specialize in design, supply, and installation of high-quality solar power systems tailored to your needs.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8" style={{backgroundColor: '#b45c3d'}}>
              <Home className="w-12 h-12 text-white mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-white">Residential</h3>
              <p className="text-white">High-quality solar solutions for homes. Our residential systems are designed to maximize savings while providing reliable, clean power for your family with minimal maintenance costs.</p>
            </div>
            <div className="p-8" style={{backgroundColor: '#12222e'}}>
              <Building2 className="w-12 h-12 text-white mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-white">Commercial</h3>
              <p className="text-white">Sustainable energy solutions for businesses. Reduce operational costs and ensure reliable power supply while demonstrating your commitment to environmental responsibility.</p>
            </div>
            <div className="p-8" style={{backgroundColor: '#cfdde9'}}>
              <Wrench className="w-12 h-12 text-gray-700 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Maintenance & Support</h3>
              <p className="text-gray-700">Modern solar panels are built to last 20+ years with very low upkeep. We provide comprehensive support services to ensure maximum efficiency and long-term reliability.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Our Products</h2>
          <p className="text-center text-gray-600 mb-12">Premium solar equipment for your energy needs</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 overflow-hidden">
              <img src="/solarpanels.jfif" alt="Solar Panels" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Solar Panels</h3>
                <p className="text-gray-600">High-efficiency solar panels for maximum energy generation</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 overflow-hidden">
              <img src="/solarinverters.jfif" alt="Solar Inverters" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Solar Inverters</h3>
                <p className="text-gray-600">Advanced inverters for efficient power conversion</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 overflow-hidden">
              <img src="/batteries.jfif" alt="Batteries" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Batteries</h3>
                <p className="text-gray-600">Reliable energy storage for 24/7 power availability</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 overflow-hidden">
              <img src="/waterheater.jfif" alt="Water Heater" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Water Heater</h3>
                <p className="text-gray-600">Solar water heating systems for energy savings</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 overflow-hidden">
              <img src="/solarheatpumps.jfif" alt="Solar Heat Pumps" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Solar Heat Pumps</h3>
                <p className="text-gray-600">Efficient heating and cooling solutions powered by solar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">See Our Work</h2>
          <p className="text-center text-gray-600 mb-12">Explore our completed solar installations and projects</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <img src="/showcase (6).jpg" alt="Solar Installation" className="w-full h-full object-cover" />
            </div>
            <div>
              <img src="/showcase (7).jpg" alt="Solar Panel" className="w-full h-48 object-cover" />
            </div>
            <div>
              <img src="/showcase (2).jpg" alt="Project" className="w-full h-48 object-cover" />
            </div>
            <div>
              <img src="/showcase (3).jpg" alt="Installation" className="w-full h-48 object-cover" />
            </div>
            <div>
              <img src="/solar.jpg" alt="Solar System" className="w-full h-48 object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">What Our Happy Clients Say?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-16" style={{backgroundColor: '#cfdde9'}}>
              <p className="mb-4 font-light text-gray-700">"Sun Energy transformed our home with reliable solar power. No more electricity bills and we contribute to a cleaner environment. Highly recommended!"</p>
              <p className="font-semibold text-gray-900">Uwimana Marie, Customer</p>
            </div>
            <div className="p-16" style={{backgroundColor: '#cfdde9'}}>
              <p className="mb-4 font-light text-gray-700">"Our business now runs on clean energy with significant cost savings. The installation was professional and the system works perfectly."</p>
              <p className="font-semibold text-gray-900">Mugisha Jean-Claude, Customer</p>
            </div>
            <div className="p-16" style={{backgroundColor: '#cfdde9'}}>
              <p className="mb-4 font-light text-gray-700">"Excellent service from consultation to installation. The solar system has been running smoothly for over a year with minimal maintenance."</p>
              <p className="font-semibold text-gray-900">Kalisa Patrick, Customer</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-500 text-white" style={{display: 'none'}}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">What Our Happy Clients Say?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6">
              <p className="mb-4 italic">"I'm a testimonial. Click to edit me and add text that says something nice about you and your services."</p>
              <p className="font-semibold">Sandy Williams, Homeowner</p>
            </div>
            <div className="bg-white/10 p-6">
              <p className="mb-4 italic">"I'm a testimonial. Click to edit me and add text that says something nice about you and your services."</p>
              <p className="font-semibold">Quinn Davis, CEO Quinn's Inc.</p>
            </div>
            <div className="bg-white/10 p-6">
              <p className="mb-4 italic">"I'm a testimonial. Click to edit me and add text that says something nice about you and your services."</p>
              <p className="font-semibold">Casey John, Ops Manager GAL's LTD</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 flex items-center justify-center">
                  <Sun className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sun Energy</h3>
                  <p className="text-sm text-gray-400">Powering Rwanda's Future</p>
                </div>
              </div>
              <p className="text-gray-400 mb-2">info@sunenergy.rw</p>
              <p className="text-gray-400 mb-2">+250 788 689 309</p>
              <p className="text-gray-400">Kigali, Rwanda</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="/" className="block text-gray-400 hover:text-white">Home</a>
                <a href="/about" className="block text-gray-400 hover:text-white">About</a>
                <a href="/contact" className="block text-gray-400 hover:text-white">Contact</a>
              </div>
              <div className="mt-4 flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white">Yelp</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <p className="text-gray-400 mb-4 text-sm">Start Your Solar Journey Today. Contact us for a customized solar quotation and take the first step toward smarter, sustainable energy.</p>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-3">
                <input type="text" placeholder="First name*" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full bg-gray-800 border border-gray-700 px-3 py-2 text-sm" />
                <input type="text" placeholder="Last name*" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full bg-gray-800 border border-gray-700 px-3 py-2 text-sm" />
                <textarea placeholder="Message*" value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full bg-gray-800 border border-gray-700 px-3 py-2 text-sm" rows={3}></textarea>
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 py-2 font-semibold">Send via WhatsApp</button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 by Sun Energy. Powering Rwanda's Future</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
