"use client";
import { Sun, Menu, X } from "lucide-react";
import { useState } from "react";

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#013430] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-15 h-15">
              <img src="/logo.png" alt=""/>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Sun Energy</h1>
              <p className="text-sm text-[#e5ad48]">Powering Rwanda's Future</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-20">
            <a href="/" className="text-white hover:text-[#e5ad48] font-light transition-colors">Home</a>
            <a href="/about" className="text-[#e5ad48] font-light">About</a>
            <a href="/contact" className="text-white hover:text-[#e5ad48] font-light transition-colors">Contact</a>
          </nav>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4 bg-[#013430] border-t border-[#e5ad48]/20">
            <a href="/" className="block py-2 text-white hover:text-[#e5ad48]">Home</a>
            <a href="/about" className="block py-2 text-[#e5ad48]">About</a>
            <a href="/contact" className="block py-2 text-white hover:text-[#e5ad48]">Contact</a>
          </div>
        )}
      </header>

      <section className="py-20 px-6 bg-[#013430]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-8 text-white">About Sun Energy</h2>
          <p className="text-center text-[#e5ad48] text-xl max-w-3xl mx-auto">Leading Rwanda's renewable energy revolution with innovative solar solutions</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-[#013430]">Our Mission</h3>
              <p className="text-gray-700 mb-4">Sun Energy is committed to transforming Rwanda's energy landscape by providing accessible, reliable, and sustainable solar power solutions to homes and businesses across the nation.</p>
              <p className="text-gray-700">We believe in a future where clean energy powers every household and business, contributing to Rwanda's vision of becoming a green economy leader in Africa.</p>
            </div>
            <div>
              <img src="/solar.jpg" alt="Solar panels" className="w-full h-96 object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#013430]">Why Choose Sun Energy?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-all">
              <h4 className="text-xl font-bold mb-3 text-[#013430]">Expert Team</h4>
              <p className="text-gray-700">Our certified technicians have years of experience in solar installation and maintenance, ensuring quality service every time.</p>
            </div>
            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-all">
              <h4 className="text-xl font-bold mb-3 text-[#013430]">Quality Products</h4>
              <p className="text-gray-700">We use only premium solar panels and equipment from trusted manufacturers, backed by comprehensive warranties.</p>
            </div>
            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-all">
              <h4 className="text-xl font-bold mb-3 text-[#013430]">Customer Support</h4>
              <p className="text-gray-700">24/7 customer support and maintenance services to keep your solar system running at peak performance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6 text-[#013430]">Our Impact</h3>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <p className="text-5xl font-bold text-[#e5ad48] mb-2">500+</p>
              <p className="text-gray-700">Installations Completed</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#e5ad48] mb-2">1000+</p>
              <p className="text-gray-700">Happy Customers</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#e5ad48] mb-2">5MW+</p>
              <p className="text-gray-700">Clean Energy Generated</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#013430] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#e5ad48] flex items-center justify-center">
                  <Sun className="w-6 h-6 text-[#013430]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#e5ad48]">Sun Energy</h3>
                  <p className="text-sm text-white/80">Powering Rwanda's Future</p>
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
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#e5ad48]">Connect With Us</h4>
              <p className="text-white/70 mb-4 text-sm">Follow us on social media for updates and solar energy tips.</p>
              <div className="flex gap-4">
                <a href="#" className="text-white/70 hover:text-[#e5ad48] transition-colors">Facebook</a>
                <a href="#" className="text-white/70 hover:text-[#e5ad48] transition-colors">LinkedIn</a>
              </div>
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
}
