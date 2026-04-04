import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Search,
    Clock,
    ChevronDown,
    CheckCircle2,
    SlidersHorizontal,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';
import blackLogo from '../assets/logos/admin.png';
import { db } from '../config';
import { decrypt } from '../Crypto';

const LOCATIONS = [
    'East of England',
    'East Midlands',
    'London',
    'North East',
    'North West',
    'Northern Ireland',
    'Scotland',
    'South East',
    'South West',
    'Wales',
    'West Midlands',
    'Yorkshire and the Humber',
];

const TYPES = [
    'Broadcast',
    'Commercial',
    'Feature',
    'HETV',
    'Live Show',
    'Music Videos',
    'TV Series/Drama',
];

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}

function formatInductedDate(value) {
    const date = new Date(Number(value));
    if (Number.isNaN(date.getTime())) return 'Not provided';

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

function hasMatchingType(userTypes = [], selectedTypes = []) {
    for (let i = 0; i < userTypes.length; i++) {
        if (selectedTypes.includes(String(userTypes[i]))) {
            return true;
        }
    }
    return false;
}

const TraineeCard = memo(function TraineeCard({ trainee }) {
    const progressPercent = `${(Number(trainee.overallProgress || 0) * 100).toFixed(2)}%`;

    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-[#FAB614]/50 transition-colors duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <img
                        src={trainee.Image || blackLogo}
                        alt={trainee.fullName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#FAB614]/20"
                        draggable={false}
                    />
                    <div>
                        <h3 className="text-lg font-bold text-white">{trainee.fullName}</h3>
                        <p className="text-[#FAB614] text-sm font-medium">{trainee.safeRole}</p>
                    </div>
                </div>

                {trainee.isCertified && (
                    <div className="flex items-center gap-1 bg-[#FAB614]/10 border border-[#FAB614]/30 px-2 py-1 rounded text-xs text-[#FAB614]">
                        <span>CineCertified</span>
                        <CheckCircle2 size={12} />
                    </div>
                )}
            </div>

            <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{progressPercent}</span>
                </div>

                <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                        className="bg-[#FAB614] h-2 rounded-full"
                        style={{ width: progressPercent }}
                    />
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Logged Days</span>
                    <span className="text-white">{trainee.totalLoggedDays}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Date Inducted</span>
                    <span className="text-white">{trainee.inductedDate}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Location</span>
                    <span className="text-white">{trainee.safeLocation}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Experience</span>
                    <span className="text-white">{trainee.safeExperience}</span>
                </div>
            </div>

            <Link
                to="/profile"
                state={{ user: trainee.originalData }}
                className="block w-full text-center py-3 rounded-lg border border-[#FAB614]/40 text-[#FAB614] bg-[#FAB614]/5 font-semibold hover:bg-[#FAB614] hover:text-black transition-all duration-300"
            >
                View Full Profile
            </Link>
        </div>
    );
});

const TraineeDatabasePage = () => {
    const [trainees, setTrainees] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectTypes, setSelectTypes] = useState(Array(TYPES.length).fill(false));
    const [selectLocations, setSelectLocations] = useState(Array(LOCATIONS.length).fill(false));
    const [days, setDays] = useState(false);
    const [select, setSelect] = useState(false);
    const [highest, setHighest] = useState(false);
    const [certifiedOnly, setCertifiedOnly] = useState(false);

    const dropdownRef = useRef(null);

    useOnClickOutside(dropdownRef, () => setActiveDropdown(null));

    const toggleDropdown = useCallback((name) => {
        setActiveDropdown((prev) => (prev === name ? null : name));
    }, []);

    const markSelectedLocation = useCallback((index) => {
        setSelectLocations((prev) => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    }, []);

    const markSelectedType = useCallback((index) => {
        setSelectTypes((prev) => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    }, []);

    const getAllTrainees = useCallback(async () => {
        try {
            const snap = await db.ref('Sign_up').once('value');
            const value = snap.val() || {};
            const arr = Object.values(value);

            const normalized = arr
                .filter((item) => item?.First_Name !== undefined)
                .map((item) => {
                    const firstName = item.First_Name ? decrypt(item.First_Name) : '';
                    const lastName = item.Last_Name ? decrypt(item.Last_Name) : '';
                    const role = item.Role ? decrypt(item.Role) : '';
                    const region = item.Region ? decrypt(item.Region) : '';

                    const safeLocation =
                        region === undefined ||
                        region === null ||
                        String(region).trim() === ''
                            ? 'Not provided'
                            : String(region);

                    const safeExperience =
                        item.Experience === undefined ||
                        item.Experience === null ||
                        String(item.Experience).trim() === ''
                            ? 'Not provided'
                            : item.Experience;

                    const safeRole =
                        role === undefined ||
                        role === null ||
                        String(role).trim() === ''
                            ? 'Not provided'
                            : String(role);

                    const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Not provided';

                    return {
                        ...item,
                        originalData: item,
                        fullName,
                        fullNameLower: fullName.toLowerCase(),
                        safeRole,
                        safeLocation,
                        safeLocationLower:
                            safeLocation === 'Not provided' ? '' : safeLocation.toLowerCase(),
                        safeExperience,
                        totalLoggedDays: Number(item.total_logged_days || 0),
                        overallProgress: Number(item.overall_progress || 0),
                        inductedDate: formatInductedDate(item.id),
                    };
                });

            setTrainees(normalized);
        } catch (e) {
            console.log('Error ', e);
        }
    }, []);

    useEffect(() => {
        getAllTrainees();
    }, [getAllTrainees]);

    const visibleTrainees = useMemo(() => {
        let temp = [...trainees];
        const search = searchText.trim().toLowerCase();

        if (search) {
            temp = temp.filter((item) => {
                return (
                    item.fullNameLower.includes(search) ||
                    item.safeLocationLower.includes(search)
                );
            });
        }

        const selectedLocationValues = LOCATIONS.filter((_, index) => selectLocations[index]).map(
            (loc) => loc.toLowerCase()
        );

        if (selectedLocationValues.length > 0) {
            temp = temp.filter((item) =>
                selectedLocationValues.includes(item.safeLocationLower)
            );
        }

        const selectedTypeValues = TYPES.filter((_, index) => selectTypes[index]);

        if (selectedTypeValues.length > 0) {
            temp = temp.filter((item) =>
                hasMatchingType(item.job_type || [], selectedTypeValues)
            );
        }

        if (certifiedOnly) {
            temp = temp.filter((item) => !!item.isCertified);
        }

        if (highest) {
            temp.sort((a, b) => b.overallProgress - a.overallProgress);
        } else if (days) {
            temp.sort((a, b) => b.totalLoggedDays - a.totalLoggedDays);
        } else {
            temp.sort((a, b) =>
                select
                    ? a.fullName.localeCompare(b.fullName, undefined, { sensitivity: 'base' })
                    : b.fullName.localeCompare(a.fullName, undefined, { sensitivity: 'base' })
            );
        }

        return temp;
    }, [trainees, searchText, selectLocations, selectTypes, certifiedOnly, highest, days, select]);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#FAB614] selection:text-black">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
            </div>

            <Navbar selectedMenu="Database" />

            <div className="pt-32 pb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#FAB614] uppercase tracking-wider">
                    Trainee Database
                </h1>
            </div>

            <div className="container mx-auto px-4 mb-12" ref={dropdownRef}>
                <div className="bg-black border border-white/10 rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-center justify-between relative z-20">
                    <div className="relative w-full lg:w-[450px]">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />

                        <input
                            value={searchText}
                            onChange={(e) => setSearchText(e.currentTarget.value)}
                            type="text"
                            placeholder="Search trainees by name, location, or specialisation..."
                            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg pl-12 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#FAB614] placeholder-gray-500"
                        />

                        <button
                            onClick={() => toggleDropdown('search')}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-colors ${
                                activeDropdown === 'search'
                                    ? 'text-[#FAB614] bg-white/10'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <SlidersHorizontal size={18} />
                        </button>

                        {activeDropdown === 'search' && (
                            <div className="absolute top-full right-0 mt-3 w-72 bg-[#151515] border border-white/10 rounded-xl p-5 shadow-2xl z-50">
                                <div className="flex items-center gap-3 mb-6">
                                    <input
                                        type="checkbox"
                                        id="certified"
                                        checked={certifiedOnly}
                                        onChange={() => setCertifiedOnly((prev) => !prev)}
                                        className="accent-[#FAB614] w-4 h-4 cursor-pointer"
                                    />
                                    <label
                                        htmlFor="certified"
                                        className="text-gray-300 text-sm cursor-pointer select-none"
                                    >
                                        Show Only Certified Trainees
                                    </label>
                                </div>

                                <button
                                    onClick={() => setActiveDropdown(null)}
                                    className="w-full bg-[#FAB614] hover:bg-[#E5970C] text-black font-bold py-3 rounded-lg text-sm transition-colors"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end relative">
                        <button
                            onClick={() => setSelect((prev) => !prev)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] border transition-colors text-sm font-medium ${
                                select
                                    ? 'border-[#FAB614] text-[#FAB614]'
                                    : 'border-white/10 text-gray-300 hover:border-[#FAB614]/50'
                            }`}
                        >
                            <Clock size={16} />
                            <span>A-Z</span>
                        </button>

                        <button
                            onClick={() => setHighest((prev) => !prev)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] border transition-colors text-sm font-medium ${
                                highest
                                    ? 'border-[#FAB614] text-[#FAB614]'
                                    : 'border-white/10 text-gray-300 hover:border-[#FAB614]/50'
                            }`}
                        >
                            <span>Highest %</span>
                        </button>

                        <button
                            onClick={() => setDays((prev) => !prev)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] border transition-colors text-sm font-medium ${
                                days
                                    ? 'border-[#FAB614] text-[#FAB614]'
                                    : 'border-white/10 text-gray-300 hover:border-[#FAB614]/50'
                            }`}
                        >
                            <Clock size={16} />
                            <span>Most days</span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('type')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] border transition-colors text-sm font-medium ${
                                    activeDropdown === 'type'
                                        ? 'border-[#FAB614] text-[#FAB614]'
                                        : 'border-white/10 text-gray-300 hover:border-[#FAB614]/50'
                                }`}
                            >
                                <span>Type</span>
                                <ChevronDown size={16} />
                            </button>

                            {activeDropdown === 'type' && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-[#151515] border border-white/10 rounded-xl p-2 shadow-2xl z-50">
                                    <div className="space-y-1">
                                        {TYPES.map((type, index) => (
                                            <label
                                                key={type}
                                                className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer"
                                            >
                                                <input
                                                    checked={selectTypes[index]}
                                                    onChange={() => markSelectedType(index)}
                                                    type="checkbox"
                                                    className="accent-[#FAB614] w-3.5 h-3.5"
                                                />
                                                <span className="text-gray-300 text-sm">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('location')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] border transition-colors text-sm font-medium ${
                                    activeDropdown === 'location'
                                        ? 'border-[#FAB614] text-[#FAB614]'
                                        : 'border-[#FAB614]/20 text-[#FAB614] hover:bg-[#FAB614]/10'
                                }`}
                            >
                                <span>Location</span>
                                <ChevronDown size={16} />
                            </button>

                            {activeDropdown === 'location' && (
                                <div className="absolute top-full right-0 mt-2 w-56 bg-[#151515] border border-white/10 rounded-xl p-2 shadow-2xl z-50 max-h-[310px] overflow-y-auto custom-scrollbar">
                                    <div className="space-y-1">
                                        {LOCATIONS.map((loc, index) => (
                                            <label
                                                key={loc}
                                                className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer"
                                            >
                                                <input
                                                    onChange={() => markSelectedLocation(index)}
                                                    checked={selectLocations[index]}
                                                    type="checkbox"
                                                    className="accent-[#FAB614] w-3.5 h-3.5 shrink-0"
                                                />
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

            <div className="container mx-auto px-4 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleTrainees.map((trainee) => (
                        <TraineeCard
                            key={trainee.id || `${trainee.fullName}-${trainee.safeLocation}`}
                            trainee={trainee}
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TraineeDatabasePage;