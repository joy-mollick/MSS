import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Clock, Filter, ChevronRight, ChevronLeft, ChevronDown, CheckCircle2, SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';

// Dummy Image import
import blackLogo from '../assets/logos/admin.png';
import avatar from '@/assets/avatar.png';
import { db } from '../config';
import { decrypt } from '../Crypto'
import moment from 'moment';

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

    const safeLocation =
        trainee.Region === undefined ||
            trainee.Region === null ||
            decrypt(trainee.Region) === undefined ||
            decrypt(trainee.Region) === null ||
            String(decrypt(trainee.Region)).trim() === ""
            ? "Not provided"
            : decrypt(trainee.Region);

    const safeExperience =
        trainee.Experience === undefined ||
            trainee.Experience === null ||
            String(trainee.Experience).trim() === ""
            ? "Not provided"
            : trainee.Experience;

    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-[#FAB614]/50 transition-colors duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <img
                        src={trainee.Image == undefined ? blackLogo : trainee.Image}
                        alt={decrypt(trainee.First_Name) + ' ' + decrypt(trainee.Last_Name)}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#FAB614]/20"
                    />
                    <div>
                        <h3 className="text-lg font-bold text-white">{decrypt(trainee.First_Name) + ' ' + decrypt(trainee.Last_Name)}</h3>
                        <p className="text-[#FAB614] text-sm font-medium">{decrypt(trainee.Role)}</p>
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
                    <span>{Number(trainee.overall_progress * 100).toFixed(2)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                        className="bg-[#FAB614] h-2 rounded-full"
                        style={{ width: `${Number(trainee.overall_progress * 100).toFixed(2)}%` }}
                    ></div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Logged Days</span>
                    <span className="text-white ">{trainee.total_logged_days}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Date Inducted</span>
                    <span className="text-white ">{moment(new Date(Number(trainee.id))).format('DD MMM, YYYY')}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Location</span>
                    <span className="text-white ">{safeLocation}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Experience</span>
                    <span className="text-white ">{safeExperience}</span>
                </div>
            </div>

            {/* Action Button - Matches Screenshot (Outlined Gold) */}
            <Link
                to="/profile"
                state={{ user: trainee }}
                className="block w-full text-center py-3 rounded-lg border border-[#FAB614]/40 text-[#FAB614] bg-[#FAB614]/5 font-semibold hover:bg-[#FAB614] hover:text-black transition-all duration-300"
            >
                View Full Profile
            </Link>
        </div>
    );
};

const TraineeDatabasePage = () => {
    // State for managing which dropdown is open

    const [trainees, setTrainees] = useState([])
    const [show_trainees, setShowTrainees] = useState([])
    const [region, setRegion] = useState(null)
    const [searchText, setSearchText] = useState("");

    const [activeDropdown, setActiveDropdown] = useState(null); // 'search', 'type', 'location'
    const dropdownRef = useRef(null);

    // Close dropdowns when clicking outside
    useOnClickOutside(dropdownRef, () => setActiveDropdown(null));

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    // Mock Data
    async function getAllTrainees() {
        try {
            let snap = await db.ref('Sign_up').once('value')
            let arr = Object.values(snap.val())
            let temp = []
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].First_Name != undefined) temp.push(arr[i])
            }
            setTrainees([...temp])
        }
        catch (e) {
            console.log('Error ', e)
        }
    }

    //console.log('all trainees ...', trainees)

    useEffect(() => {
        getAllTrainees()
    }, [])

    // Filter Lists
    const locations = [
        "East of England", "East Midlands", "London", "North East", "North West",
        "Northern Ireland", "Scotland", "South East", "South West", "Wales",
        "West Midlands", "Yorkshire and the Humber"
    ];

    const types = [
        'Broadcast',
        'Commercial',
        'Feature',
        'HETV',
        'Live Show',
        'Music Videos',
        'TV Series/Drama'
    ]

    const [select_types, setSelectTypes] = useState(Array(types.length).fill(false))

    const [select_locations, setSelectLocations] = useState(Array(locations.length).fill(false))
    const [days, setDays] = useState(false)
    const [select, setSelect] = useState(false)

    const [highest, setHighest] = useState(false)

    function markselected(i) {
        let temp = [...select_locations]
        temp[i] = !temp[i]
        setSelectLocations([...temp])
    }

    function markselectedType(i) {
        let temp = [...select_types]
        temp[i] = !temp[i]
        setSelectTypes([...temp])
    }

    function getSearchResult(arr, search) {
        let temp = []
        let ser = search.toLowerCase()
        for (let i = 0; i < arr.length; i++) {
            let name = decrypt(arr[i].First_Name) + ' ' + decrypt(arr[i].Last_Name)
            name = String(name).toLowerCase()
            let region = arr[i].Region == undefined ? '' : String(decrypt(arr[i].Region)).toLowerCase()
            if (name.includes(ser) || region.includes(ser)) {
                temp.push(arr[i])
            }
        }
        return temp;
    }

    function if_user_has_type(arr, types) {
        for (let i = 0; i < arr.length; i++) {
            if (types.includes(String(arr[i]))) {
                return true
            }
        }
        return false
    }


    useEffect(() => {
        let temp = []
        if (select) {
            temp = [...trainees]
            for (let i = 0; i < temp.length; i++) {
                temp[i].name = decrypt(temp[i].First_Name) + ' ' + decrypt(temp[i].Last_Name)
                // temp[i].fav = isFavourite(temp[i].id)
            }
            temp.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
            if (searchText != '') {
                temp = getSearchResult(temp, searchText)
            }

        }
        if (!select) {
            temp = [...trainees]
            for (let i = 0; i < temp.length; i++) {
                temp[i].name = decrypt(temp[i].First_Name) + ' ' + decrypt(temp[i].Last_Name)
                // temp[i].fav = isFavourite(temp[i].id)
            }
            temp.sort((a, b) => b.name.localeCompare(a.name, undefined, { sensitivity: 'base' }));
            if (searchText != '') {
                temp = getSearchResult(temp, searchText)
            }

        }

        // location 
        let ticked = []
        for (let i = 0; i < select_locations.length; i++) {
            if (select_locations[i] == true) {
                ticked.push(locations[i].toLowerCase())
            }
        }

        // types
        let ticked_types = []
        for (let i = 0; i < select_types.length; i++) {
            if (select_types[i] == true) {
                ticked_types.push(types[i])
            }
        }

        let res = []
        for (let i = 0; i < temp.length; i++) {
            let loc = String(decrypt(temp[i].Region)).toLowerCase()
            if (ticked.length > 0) {
                if (ticked.includes(loc)) {
                    res.push(temp[i])
                }
            }
            else {
                res.push(temp[i])
            }
        }

        let res1 = []
        for (let i = 0; i < res.length; i++) {
            if (ticked_types.length > 0) {
                if (if_user_has_type(res[i].job_type == undefined ? [] : res[i].job_type, ticked_types)) {
                    res1.push(res[i])
                }
            }
            else {
                res1.push(res[i])
            }
        }

        setShowTrainees([...res1])
    }, [select, trainees, searchText, select_locations, select_types])

    useEffect(() => {
        let temp = []

        if (days) {
            temp = [...trainees]
            for (let i = 0; i < temp.length; i++) {
                temp[i].total_logged_days = temp[i].total_logged_days == undefined ? 0 : temp[i].total_logged_days
                // temp[i].fav = isFavourite(temp[i].id)
            }
            temp.sort((a, b) => b.total_logged_days - a.total_logged_days);

            if (searchText != '') {
                temp = getSearchResult(temp, searchText)
            }

        }

        if (!days) {
            temp = [...trainees]
            for (let i = 0; i < temp.length; i++) {
                temp[i].total_logged_days = temp[i].total_logged_days == undefined ? 0 : temp[i].total_logged_days
                // temp[i].fav = isFavourite(temp[i].id)
            }
            temp.sort((a, b) => a.total_logged_days - b.total_logged_days);
            if (searchText != '') {
                temp = getSearchResult(temp, searchText)
            }

        }

        if (highest) {
            temp = [...trainees]
            for (let i = 0; i < temp.length; i++) {
                temp[i].overall_progress = temp[i].overall_progress == undefined ? 0 : temp[i].overall_progress
                // temp[i].fav = isFavourite(temp[i].id)
            }
            temp.sort((a, b) => b.overall_progress - a.overall_progress);
            if (searchText != '') {
                temp = getSearchResult(temp, searchText)
            }
        }


        // location 
        let ticked = []
        for (let i = 0; i < select_locations.length; i++) {
            if (select_locations[i] == true) {
                ticked.push(locations[i].toLowerCase())
            }
        }

        // types
        let ticked_types = []
        for (let i = 0; i < select_types.length; i++) {
            if (select_types[i] == true) {
                ticked_types.push(types[i])
            }
        }

        let res = []
        for (let i = 0; i < temp.length; i++) {
            let loc = String(decrypt(temp[i].Region)).toLowerCase()
            if (ticked.length > 0) {
                if (ticked.includes(loc)) {
                    res.push(temp[i])
                }
            }
            else {
                res.push(temp[i])
            }
        }

        let res1 = []
        for (let i = 0; i < res.length; i++) {
            if (ticked_types.length > 0) {
                if (if_user_has_type(res[i].job_type == undefined ? [] : res[i].job_type, ticked_types)) {
                    res1.push(res[i])
                }
            }
            else {
                res1.push(res[i])
            }
        }

        setShowTrainees([...res1])
    }, [days, trainees, searchText, select_locations, select_types, highest])


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
                            value={searchText}
                            onChange={(e) => setSearchText(e.currentTarget.value)}
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
                        <button
                            onClick={() => setSelect(!select)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] border transition-colors text-sm font-medium
    ${select
                                    ? "border-[#FAB614] text-[#FAB614]"
                                    : "border-white/10 text-gray-300 hover:border-[#FAB614]/50"
                                }
  `}
                        >
                            <Clock size={16} />
                            <span>A-Z</span>
                        </button>


                        <button
                            onClick={() => setHighest(!highest)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] border transition-colors text-sm font-medium
    ${highest
                                    ? "border-[#FAB614] text-[#FAB614]"
                                    : "border-white/10 text-gray-300 hover:border-[#FAB614]/50"
                                }
  `}
                        >
                            <span>Highest %</span>
                        </button>



                        <button
                            onClick={() => setDays(!days)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] border transition-colors text-sm font-medium
    ${days
                                    ? "border-[#FAB614] text-[#FAB614]"
                                    : "border-white/10 text-gray-300 hover:border-[#FAB614]/50"
                                }
  `}
                        >
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
                                        {types.map((type, index) => (
                                            <label key={type} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                                                <input checked={select_types[index]} onChange={() => markselectedType(index)} type="checkbox" className="accent-[#FAB614] w-3.5 h-3.5" />
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
                                        {locations.map((loc, index) => (
                                            <label key={loc} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                                                <input onChange={() => markselected(index)} checked={select_locations[index]} type="checkbox" className="accent-[#FAB614] w-3.5 h-3.5 shrink-0" />
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
                    {show_trainees.map((trainee, index) => (
                        <TraineeCard key={index} trainee={trainee} />
                    ))}
                </div>
            </div>

            {/* Pagination Section */}


            <Footer />
        </div>
    );
};

export default TraineeDatabasePage;

