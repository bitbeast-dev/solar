"use client";
import { Sun, Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
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
              <h1 className="text-2xl font-bold text-gray-900">Gosolar</h1>
              <p className="text-sm text-gray-600">Powering Rwanda's Future</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="/" className="text-gray-700 hover:text-orange-500 font-light">Home</a>
            <a href="/about" className="text-gray-700 hover:text-orange-500 font-light">About</a>
            <a href="/contact" className="text-orange-500 font-light">Contact</a>
          </nav>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4 bg-white border-t">
            <a href="/" className="block py-2 text-gray-700 hover:text-orange-500">Home</a>
            <a href="/about" className="block py-2 text-gray-700 hover:text-orange-500">About</a>
            <a href="/contact" className="block py-2 text-orange-500">Contact</a>
          </div>
        )}
      </header>

      <section className="py-12 md:py-20 px-4 md:px-6" style={{backgroundColor: '#cadbe3'}}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 md:mb-8 text-gray-900">Contact Us</h2>
          <p className="text-center text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">Get in touch with our team for solar solutions tailored to your needs</p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900">Send Us a Message</h3>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="First name*" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                    className="w-full border border-gray-300 px-4 py-3 text-gray-900" 
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Last name*" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required 
                    className="w-full border border-gray-300 px-4 py-3 text-gray-900" 
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Message*" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    required 
                    className="w-full border border-gray-300 px-4 py-3 text-gray-900" 
                    rows={6}
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 font-semibold text-lg">Send via WhatsApp</button>
              </form>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">+250 788 689 309</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">info@gosolar.rw</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Location</h4>
                    <p className="text-gray-600">Kigali, Rwanda</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-12 p-6 md:p-8" style={{backgroundColor: '#cfdde9'}}>
                <h4 className="text-xl font-bold mb-4 text-gray-900">Business Hours</h4>
                <div className="space-y-2 text-gray-700">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
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
                  <h3 className="text-xl font-bold">Gosolar</h3>
                  <p className="text-sm text-gray-400">Powering Rwanda's Future</p>
                </div>
              </div>
              <p className="text-gray-400 mb-2">info@gosolar.rw</p>
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
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <p className="text-gray-400 mb-4 text-sm">Follow us on social media for updates and solar energy tips.</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p className="mb-6">© 2024 by Gosolar. Powering Rwanda's Future</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <img src="/4ra.png" alt="4KVISION LTD" className="h-16 w-auto object-contain" />
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400">Website made by <span className="font-semibold text-white">4KVISION LTD</span></p>
                <p className="text-xs text-gray-500">KN 84 st Inkurunziza building</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
