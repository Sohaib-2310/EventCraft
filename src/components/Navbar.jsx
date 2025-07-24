import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const navItems = [
        { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Services', action: () => scrollToSection('services') },
        { label: 'Packages', action: () => scrollToSection('deals') },
        { label: 'Gallery', action: () => scrollToSection('gallery') },
        { label: 'Availability', action: () => scrollToSection('availability') },
        { label: 'Contact Us', action: () => scrollToSection('contact') }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold">
                            Event<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Craft</span>
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={item.action}
                                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-purple-600 p-2"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                            {navItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={item.action}
                                    className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
