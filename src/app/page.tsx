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
      const whatsappMessage = `Hello Gosolar, My name is ${firstName} ${lastName}. ${message}`;
      window.open(`https://wa.me/250788689309?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
      setFirstName('');
      setLastName('');
      setMessage('');
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#013430] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-15 h-15">
              <img src="/logo.png" alt=""/>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">SUN ENERGY</h1>
              <p className="text-sm text-[#e5ad48]">SMART SOLAR FOR EVERYDAY LIVING</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-30">
            <a href="/" className="text-white hover:text-[#e5ad48] font-light transition-colors">Home</a>
            <a href="/about" className="text-white hover:text-[#e5ad48] font-light transition-colors">About</a>
            <a href="/contact" className="text-white hover:text-[#e5ad48] font-light transition-colors">Contact</a>
          </nav>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4 bg-[#013430] border-t border-[#e5ad48]/20">
            <a href="/" className="block py-2 text-white hover:text-[#e5ad48]">Home</a>
            <a href="/about" className="block py-2 text-white hover:text-[#e5ad48]">About</a>
            <a href="/contact" className="block py-2 text-white hover:text-[#e5ad48]">Contact</a>
          </div>
        )}
      </header>

      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto bg-cover bg-center" style={{backgroundImage: 'url(/solar.jpg)'}}>
          <div className="bg-[#013430]/70 px-4 md:px-8 py-16 md:py-32">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">Switch to Solar Today!</h2>
              <p className="text-base md:text-xl text-white mb-6 md:mb-8">Your go-to partner for sustainable energy. Start generating your own clean energy today and save with eco-friendly solar solutions.</p>
              <button onClick={() => window.open('https://wa.me/250788689309?text=Hello%20Gosolar,%20I%20am%20interested%20in%20solar%20solutions', '_blank')} className="bg-[#e5ad48] text-[#013430] px-6 md:px-8 py-3 md:py-4 font-bold text-base md:text-lg hover:bg-[#d49a35] transition-colors">Go Solar Today!</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#013430]">Why Solar Solutions?</h2>
          <p className="text-center text-[#d49a35] mb-12 text-lg font-semibold">Benefits of Going Solar</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-16 bg-[#013430] shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-3 text-white">Save Money and Stay Powered</h3>
              <p className="text-white">Lower your bills by generating your own energy and reduce dependence on purchased electricity. Forget about electricity outages - solar power keeps essential devices running so your home or business stays powered all the time.</p>
            </div>
            <div className="p-16 bg-white shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-3 text-[#013430]">Upgrade Your Home's Future Value</h3>
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Attractive to Buyers & Higher Resale Value</h4>
              <p className="text-gray-700">Homes with solar panels are seen as energy-efficient and modern. Properties with solar systems often sell at a premium, adding long-term value with durable, low-maintenance installations.</p>
            </div>
            <div className="p-16 bg-white shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-3 text-[#013430]">Better for the Environment</h3>
              <p className="text-gray-700">Choosing solar energy means protecting the planet while building a brighter future. Solar power uses clean, natural sunlight, helping reduce carbon emissions and supporting Rwanda's vision for a greener, climate-resilient future.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-8 text-[#013430]">How Solar Panels Work</h2>
          <p className="text-center text-gray-700 text-xl mb-16 max-w-3xl mx-auto">Transform sunlight into clean, reliable electricity for your home or business</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-16 bg-white h-[400px] shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold text-[#013430] mb-4">1. Capture Sunlight</h3>
              <p className="text-gray-700">Solar panels installed on your roof contain photovoltaic (PV) cells that capture direct sunlight and convert it into DC electricity.</p>
            </div>
            
            <div className="p-16 bg-white shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold text-[#013430] mb-4">2. Convert Power</h3>
              <p className="text-gray-700">An inverter converts DC electricity into AC electricity - the type used to power all your household and business appliances.</p>
            </div>
            
            <div className="p-16 bg-[#013430] shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold text-white mb-4">3. Power Your Life</h3>
              <p className="text-white">Excess electricity is stored in batteries for use at night or during outages, ensuring continuous and reliable power 24/7.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#013430]">Our Services</h2>
          <p className="text-center text-gray-700 mb-12">We specialize in design, supply, and installation of high-quality solar power systems tailored to your needs.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white shadow-lg hover:shadow-xl transition-all">
              <Home className="w-12 h-12 text-[#013430] mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-[#013430]">Residential</h3>
              <p className="text-gray-700">High-quality solar solutions for homes. Our residential systems are designed to maximize savings while providing reliable, clean power for your family with minimal maintenance costs.</p>
            </div>
            <div className="p-8 bg-[#013430] shadow-lg hover:shadow-xl transition-all">
              <Building2 className="w-12 h-12 text-white  mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-white">Commercial</h3>
              <p className="text-white">Sustainable energy solutions for businesses. Reduce operational costs and ensure reliable power supply while demonstrating your commitment to environmental responsibility.</p>
            </div>
            <div className="p-8 bg-white h-[450px] shadow-lg hover:shadow-xl transition-all">
              <Wrench className="w-12 h-12 text-[#013430] mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-[#013430]">Maintenance & Support</h3>
              <p className="text-gray-700">Modern solar panels are built to last 20+ years with very low upkeep. We provide comprehensive support services to ensure maximum efficiency and long-term reliability.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#013430]">Our Products</h2>
          <p className="text-center text-gray-700 mb-12">Premium solar equipment for your energy needs</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <img src="/solarpanels.jfif" alt="Solar Panels" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#013430] mb-2">Solar Panels</h3>
                <p className="text-gray-700">High-efficiency solar panels for maximum energy generation</p>
              </div>
            </div>
            <div className="bg-white shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <img src="/solarinverters.jfif" alt="Solar Inverters" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#013430] mb-2">Solar Inverters</h3>
                <p className="text-gray-700">Advanced inverters for efficient power conversion</p>
              </div>
            </div>
            <div className="bg-white shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <img src="/batteries.jfif" alt="Batteries" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#013430] mb-2">Batteries</h3>
                <p className="text-gray-700">Reliable energy storage for 24/7 power availability</p>
              </div>
            </div>
            <div className="bg-white shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <img src="/waterheater.jfif" alt="Water Heater" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#013430] mb-2">Water Heater</h3>
                <p className="text-gray-700">Solar water heating systems for energy savings</p>
              </div>
            </div>
            <div className="bg-white shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <img src="/solarheatpumps.jfif" alt="Solar Heat Pumps" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#013430] mb-2">Hi Solar Heat Pumps</h3>
                <p className="text-gray-700">Efficient heating and cooling solutions powered by solar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#013430]">See Our Work</h2>
          <p className="text-center text-gray-700 mb-12">Explore our completed solar installations and projects</p>
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

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-[#013430]">What Our Happy Clients Say?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-16 bg-[#013430] shadow-lg hover:shadow-xl transition-all">
              <p className="mb-4 font-light text-white">"Gosolar transformed our home with reliable solar power. No more electricity bills and we contribute to a cleaner environment. Highly recommended!"</p>
              <p className="font-semibold text-white">Uwimana Marie, Customer</p>
            </div>
            <div className="p-16 bg-white shadow-lg hover:shadow-xl transition-all">
              <p className="mb-4 font-light text-[#013430]">"Our business now runs on clean energy with significant cost savings. The installation was professional and the system works perfectly."</p>
              <p className="font-semibold text-[#013430]">Mugisha Jean-Claude, Customer</p>
            </div>
            <div className="p-16 bg-white shadow-lg hover:shadow-xl transition-all">
              <p className="mb-4 font-light text-[#013430]">"Excellent service from consultation to installation. The solar system has been running smoothly for over a year with minimal maintenance."</p>
              <p className="font-semibold text-[#013430]">Kalisa Patrick, Customer</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#013430] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-15 h-15 flex items-center justify-center">
                  <img src="/logo.png" className="w-15 h-15" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#e5ad48]">Sun Energy</h3>
                  <p className="text-sm text-white/80">Gosolar and power Rwanda’s future</p>
                </div>
              </div>
              <p className="text-white/70 mb-2">+250 788 689 309</p>
              <p className="text-white/70">KN 84 st Inkurunziza building</p>
              <p className="text-white/70">Kigali, Rwanda</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#e5ad48]">Quick Links</h4>
              <div className="space-y-2">
                <a href="/" className="block text-white/70 hover:text-[#e5ad48] transition-colors">Home</a>
                <a href="/about" className="block text-white/70 hover:text-[#e5ad48] transition-colors">About</a>
                <a href="/contact" className="block text-white/70 hover:text-[#e5ad48] transition-colors">Contact</a>
              </div>
              <div className="mt-4 flex gap-4">
                <a href="#" className="text-white/70 hover:text-[#e5ad48] transition-colors">Facebook</a>
                <a href="#" className="text-white/70 hover:text-[#e5ad48] transition-colors">LinkedIn</a>
                <a href="#" className="text-white/70 hover:text-[#e5ad48] transition-colors">Instagram</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#e5ad48]">Contact Info</h4>
              <p className="text-white/70 mb-4 text-sm">Start Your Solar Journey Today. Contact us for a customized solar quotation and take the first step toward smarter, sustainable energy.</p>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-3">
                <input type="text" placeholder="First name*" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full bg-[#013430]/50 border border-[#e5ad48]/30 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-[#e5ad48] focus:outline-none" />
                <input type="text" placeholder="Last name*" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full bg-[#013430]/50 border border-[#e5ad48]/30 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-[#e5ad48] focus:outline-none" />
                <textarea placeholder="Message*" value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full bg-[#013430]/50 border border-[#e5ad48]/30 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-[#e5ad48] focus:outline-none" rows={3}></textarea>
                <button type="submit" className="w-full bg-[#e5ad48] hover:bg-[#d49a35] text-[#013430] py-2 font-bold transition-colors">Send via WhatsApp</button>
              </form>
            </div>
          </div>
          <div className="border-t border-[#e5ad48]/20 pt-8 text-center text-white/70 text-sm">
            <p className="mb-6">© 2024 by Sun Energy. Powering Rwanda's Future</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <img src="/4ra.png" alt="4KVISION LTD" className="h-16 w-auto object-contain" />
              <div className="text-center md:text-left">
                <p className="text-sm text-white/70">Website made by <span className="font-semibold text-[#e5ad48]">4KVISION LTD</span></p>
                <p className="text-xs text-white/50">KN 84 st Inkurunziza building</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
