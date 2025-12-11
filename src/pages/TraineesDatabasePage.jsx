import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Clock, Filter, ChevronRight, ChevronLeft, ChevronDown, CheckCircle2, SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';

// Dummy Image import
import avatar from '@/assets/avatar.png';

// --- Hook to detect clicks outside of dropdowns to close them ---
function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

const TraineeCard = ({ trainee }) => {
    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-[#FAB614]/50 transition-colors duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <img
                        src={trainee.image}
                        alt={trainee.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#FAB614]/20"
                    />
                    <div>
                        <h3 className="text-lg font-bold text-white">{trainee.name}</h3>
                        <p className="text-[#FAB614] text-sm font-medium">{trainee.role}</p>
                    </div>
                </div>
                {trainee.isCertified && (
                    <div className="flex items-center gap-1 bg-[#FAB614]/10 border border-[#FAB614]/30 px-2 py-1 rounded text-xs text-[#FAB614]">
                        <span>CineCertified</span>
                        <CheckCircle2 size={12} />
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{trainee.progress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                        className="bg-[#FAB614] h-2 rounded-full"
                        style={{ width: `${trainee.progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Log Days</span>
                    <span className="text-white ">{trainee.logDays}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Date Inducted</span>
                    <span className="text-white ">{trainee.dateInducted}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Location</span>
                    <span className="text-white ">{trainee.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Experience</span>
                    <span className="text-white ">{trainee.experience}</span>
                </div>
            </div>

            {/* Action Button - Matches Screenshot (Outlined Gold) */}
            <Link
                to="/profile"
                className="block w-full text-center py-3 rounded-lg border border-[#FAB614]/40 text-[#FAB614] bg-[#FAB614]/5 font-semibold hover:bg-[#FAB614] hover:text-black transition-all duration-300"
            >
                View Full Profile
            </Link>
        </div>
    );
};

const TraineeDatabasePage = () => {
    // State for managing which dropdown is open
    const [activeDropdown, setActiveDropdown] = useState(null); // 'search', 'type', 'location'
    const dropdownRef = useRef(null);

    // Close dropdowns when clicking outside
    useOnClickOutside(dropdownRef, () => setActiveDropdown(null));

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    // Mock Data
    const trainees = Array(6).fill({
        name: "John Mitchel",
        role: "Camera Trainee",
        image: avatar,
        isCertified: true,
        progress: 6,
        logDays: 200,
        dateInducted: "24 September 2024",
        location: "Edinburgh",
        experience: "5 Years"
    });

    // Filter Lists
    const locations = [
        "East of England", "East Midlands", "London", "North East", "North West",
        "Northern Ireland", "Scotland", "South East", "South West", "Wales",
        "West Midlands", "Yorkshire and the Humber"
    ];

    const types = ["Features", "TV", "Commercials"];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#FAB614] selection:text-black">
            {/* Background decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
        </div>
            <Navbar selectedMenu="Database" />

            <div className="pt-32 pb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#FAB614] uppercase tracking-wider">
                    Trainee Database
                </h1>
            </div>

            {/* Filter & Search Bar Container */}
            <div className="container mx-auto px-4 mb-12" ref={dropdownRef}>
                <div className="bg-black border border-white/10 rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-center justify-between relative z-20">

                    {/* Search Input Area */}
                    <div className="relative w-full lg:w-[450px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search trainees by name, location, or specialisation..."
                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg pl-12 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#FAB614] placeholder-gray-500"
                        />

                        {/* Filter Slider Icon (Triggers Popup) */}
                        <button
                            onClick={() => toggleDropdown('search')}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-colors ${activeDropdown === 'search' ? 'text-[#FAB614] bg-white/10' : 'text-gray-400 hover:text-white'}`}
                        >
                            <SlidersHorizontal size={18} />
                        </button>

                        {/* SEARCH POPUP (Certified Checkbox + Apply Button) */}
                        {activeDropdown === 'search' && (
                            <div className="absolute top-full right-0 mt-3 w-72 bg-[#151515] border border-white/10 rounded-xl p-5 shadow-2xl z-50">
                                <div className="flex items-center gap-3 mb-6">
                                    <input type="checkbox" id="certified" className="accent-[#FAB614] w-4 h-4 cursor-pointer" />
                                    <label htmlFor="certified" className="text-gray-300 text-sm cursor-pointer select-none">Show Only Certified Trainees</label>
                                </div>
                                <button className="w-full bg-[#FAB614] hover:bg-[#E5970C] text-black font-bold py-3 rounded-lg text-sm transition-colors">
                                    Apply Filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Filter Buttons Group */}
                    <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end relative">
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] border border-white/10 hover:border-[#FAB614]/50 transition-colors text-sm font-medium text-gray-300">
                            <Clock size={16} />
                            <span>A-Z</span>
                        </button>

                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] border border-white/10 hover:border-[#FAB614]/50 transition-colors text-sm font-medium text-gray-300">
                            <Clock size={16} />
                            <span>Most days</span>
                        </button>

                        {/* TYPE Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('type')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] border transition-colors text-sm font-medium ${activeDropdown === 'type' ? 'border-[#FAB614] text-[#FAB614]' : 'border-white/10 text-gray-300 hover:border-[#FAB614]/50'}`}
                            >
                                <span>Type</span>
                                <ChevronDown size={16} />
                            </button>

                            {activeDropdown === 'type' && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-[#151515] border border-white/10 rounded-xl p-2 shadow-2xl z-50">
                                    <div className="space-y-1">
                                        {types.map((type) => (
                                            <label key={type} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                                                <input type="checkbox" className="accent-[#FAB614] w-3.5 h-3.5" />
                                                <span className="text-gray-300 text-sm">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* LOCATION Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('location')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] border transition-colors text-sm font-medium ${activeDropdown === 'location' ? 'border-[#FAB614] text-[#FAB614]' : 'border-[#FAB614]/20 text-[#FAB614] hover:bg-[#FAB614]/10'}`}
                            >
                                <span>Location</span>
                                <ChevronDown size={16} />
                            </button>

                            {activeDropdown === 'location' && (
                                <div className="absolute top-full right-0 mt-2 w-56 bg-[#151515] border border-white/10 rounded-xl p-2 shadow-2xl z-50 max-h-[310px] overflow-y-auto custom-scrollbar">
                                    <div className="space-y-1">
                                        {locations.map((loc) => (
                                            <label key={loc} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                                                <input type="checkbox" className="accent-[#FAB614] w-3.5 h-3.5 shrink-0" />
                                                <span className="text-gray-300 text-sm">{loc}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Trainee Grid */}
            <div className="container mx-auto px-4 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trainees.map((trainee, index) => (
                        <TraineeCard key={index} trainee={trainee} />
                    ))}
                </div>
            </div>

            {/* Pagination Section */}
            <div className="container mx-auto px-4 mt-12 mb-20 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Left Side: Items Per Page */}
                <button className="flex items-center gap-2 bg-[#FAB614] text-black font-bold text-sm px-6 py-3 rounded-full hover:bg-[#E5970C] transition-colors">
                    <span>Item per page: 15</span>
                    <ChevronDown size={16} strokeWidth={3} />
                </button>

                {/* Right Side: Pagination Controls */}
                <div className="flex items-center gap-2">

                    {/* Prev Button */}
                    <button className="flex items-center gap-1 bg-[#FAB614] text-black font-bold text-sm px-5 py-3 rounded-full hover:bg-[#E5970C] transition-colors disabled:opacity-50">
                        <ChevronLeft size={16} strokeWidth={3} />
                        <span>Prev</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-2 mx-2">
                        <button className="w-10 h-10 rounded-full bg-[#FAB614] text-black font-bold text-sm flex items-center justify-center hover:bg-[#E5970C] transition-colors">
                            1
                        </button>

                        {/* Active Page Style (White Background) */}
                        <button className="w-10 h-10 rounded-full bg-white text-black font-bold text-sm flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            2
                        </button>

                        <button className="w-10 h-10 rounded-full bg-[#FAB614] text-black font-bold text-sm flex items-center justify-center hover:bg-[#E5970C] transition-colors">
                            3
                        </button>
                        <button className="w-10 h-10 rounded-full bg-[#FAB614] text-black font-bold text-sm flex items-center justify-center hover:bg-[#E5970C] transition-colors">
                            4
                        </button>
                        <button className="w-10 h-10 rounded-full bg-[#FAB614] text-black font-bold text-sm flex items-center justify-center hover:bg-[#E5970C] transition-colors">
                            5
                        </button>
                    </div>

                    {/* Next Button */}
                    <button className="flex items-center gap-1 bg-[#FAB614] text-black font-bold text-sm px-5 py-3 rounded-full hover:bg-[#E5970C] transition-colors">
                        <span>Next</span>
                        <ChevronRight size={16} strokeWidth={3} />
                    </button>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TraineeDatabasePage;