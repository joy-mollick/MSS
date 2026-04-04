import React, {
    memo,
    useMemo,
    useState,
    useEffect,
    useCallback,
} from 'react';
import { Button } from "@/components/ui/button";
import {
    Calendar,
    CalendarDays,
    CreditCard,
    ShieldCheck,
    Ticket,
    Trophy,
    X,
    Image as ImageIcon,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import '../App.css';
import { db, firestore as firestore_db } from '../config';
import { collection, onSnapshot } from 'firebase/firestore';
import { ref, onValue, off } from 'firebase/database';

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

function getRemainingDays(dateStr) {
    const now = new Date();
    const draw = new Date(dateStr);
    const diff = draw.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getProgress(sold, total) {
    if (!total) return 0;
    return Math.min(100, Math.round((sold / total) * 100));
}

function isClosed(raffle) {
    return raffle.status === 'closed' || new Date(raffle.drawDate).getTime() <= Date.now();
}

function isUpcoming(raffle) {
    return !isClosed(raffle);
}

function normalizeRaffleImages(item) {
    const raw = Array.isArray(item?.attachmentUrls) ? item.attachmentUrls : [];

    const images = raw
        .map((file) => {
            if (typeof file === 'string') return file;

            const type = String(file?.type || '').toLowerCase();
            const url = file?.url || file?.downloadURL || file?.src || '';

            if (url && type.includes('image')) return url;
            return '';
        })
        .filter(Boolean);

    const uniqueImages = [...new Set(images)];

    if (uniqueImages.length > 0) return uniqueImages;
    if (item?.image) return [item.image];

    return [];
}

const Badge = memo(function Badge({ children, type = 'default' }) {
    const styleMap = {
        default: {
            background: 'rgba(255,255,255,0.06)',
            color: '#A7AFBD',
            border: '1px solid rgba(255,255,255,0.08)',
        },
        gold: {
            background: 'rgba(235,180,0,0.14)',
            color: '#F3BF17',
            border: '1px solid rgba(235,180,0,0.26)',
        },
        green: {
            background: 'rgba(8, 142, 78, 0.22)',
            color: '#22E58B',
            border: '1px solid rgba(34,229,139,0.24)',
        },
        gray: {
            background: 'rgba(120,130,150,0.14)',
            color: '#B2BAC8',
            border: '1px solid rgba(120,130,150,0.18)',
        },
    };

    return (
        <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] sm:text-[12px] font-semibold"
            style={styleMap[type]}
        >
            {children}
        </div>
    );
});

const FeaturedStat = memo(function FeaturedStat({ label, value, highlight = false }) {
    return (
        <div
            className="rounded-[16px] px-4 py-3 sm:px-5 sm:py-4 min-h-[82px] flex flex-col justify-center"
            style={{
                background: 'rgba(21,21,24,0.78)',
                border: `1px solid ${highlight ? 'rgba(235,180,0,0.26)' : 'rgba(255,255,255,0.06)'}`,
                backdropFilter: 'blur(4px)',
            }}
        >
            <div className="text-[#7F8797] text-[12px] sm:text-[14px] font-semibold">{label}</div>
            <div className={`mt-1 text-[24px] sm:text-[30px] font-extrabold ${highlight ? 'text-[#F2BD16]' : 'text-white'}`}>
                {value}
            </div>
        </div>
    );
});

const ProgressBar = memo(function ProgressBar({ value }) {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold text-[13px] sm:text-[14px]">Tickets Sold</span>
                <span className="text-[#F2BD16] font-bold text-[13px] sm:text-[14px]">{value}%</span>
            </div>

            <div className="w-full h-[8px] rounded-full bg-white/10 overflow-hidden">
                <div
                    className="h-full rounded-full"
                    style={{
                        width: `${value}%`,
                        background: 'linear-gradient(90deg, #F3BF17 0%, #E6A700 100%)',
                    }}
                />
            </div>
        </div>
    );
});

const ImageThumbStrip = memo(function ImageThumbStrip({ images = [], onOpen, compact = false }) {
    if (!Array.isArray(images) || images.length === 0) return null;

    return (
        <div className="mt-5">
            <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                        style={{ background: 'rgba(243,191,23,0.12)', border: '1px solid rgba(243,191,23,0.16)' }}
                    >
                        <ImageIcon className="w-4 h-4 text-[#F2BD16]" />
                    </div>
                    <div className="text-white font-semibold text-[14px] sm:text-[15px]">
                        Gallery
                    </div>
                </div>

                <div
                    className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold"
                    style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#D8DEE9',
                    }}
                >
                    {images.length} image{images.length > 1 ? 's' : ''}
                </div>
            </div>

            <div
                className="flex gap-3 overflow-x-auto pb-2"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#E9A700 rgba(255,255,255,0.08)',
                }}
            >
                {images.map((img, index) => (
                    <button
                        key={`${img}-${index}`}
                        type="button"
                        onClick={() => onOpen?.(images, index)}
                        className="relative flex-shrink-0 overflow-hidden rounded-[14px] border cursor-pointer"
                        style={{
                            width: compact ? 74 : 88,
                            height: compact ? 74 : 88,
                            borderColor: 'rgba(255,255,255,0.12)',
                            background: '#0F1013',
                        }}
                    >
                        <img
                            src={img}
                            alt={`Raffle image ${index + 1}`}
                            className="w-full h-full object-cover"
                            draggable={false}
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.22) 100%)',
                            }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
});

const ImageLightboxModal = memo(function ImageLightboxModal({
    images = [],
    currentIndex = 0,
    onClose,
    onPrev,
    onNext,
    onSelect,
}) {
    if (!Array.isArray(images) || images.length === 0) return null;

    const activeImage = images[currentIndex] || images[0];

    return (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
            <div
                className="relative w-full max-w-[1100px] rounded-[24px] border overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, rgba(20,20,22,0.98) 0%, rgba(12,12,14,0.98) 100%)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
                    maxHeight: 'calc(100vh - 24px)',
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white hover:opacity-100 transition-opacity"
                    style={{
                        background: 'rgba(0,0,0,0.55)',
                        border: '1px solid rgba(255,255,255,0.12)',
                    }}
                >
                    <X className="w-5 h-5" />
                </button>

                {images.length > 1 && (
                    <>
                        <button
                            onClick={onPrev}
                            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white"
                            style={{
                                background: 'rgba(0,0,0,0.55)',
                                border: '1px solid rgba(255,255,255,0.12)',
                            }}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={onNext}
                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white"
                            style={{
                                background: 'rgba(0,0,0,0.55)',
                                border: '1px solid rgba(255,255,255,0.12)',
                            }}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </>
                )}

                <div className="p-3 sm:p-4 md:p-5">
                    <div
                        className="w-full rounded-[18px] overflow-hidden flex items-center justify-center"
                        style={{
                            background: '#090A0C',
                            minHeight: '58vh',
                            maxHeight: '72vh',
                        }}
                    >
                        <img
                            src={activeImage}
                            alt={`Raffle large preview ${currentIndex + 1}`}
                            className="max-w-full max-h-[72vh] object-contain"
                            draggable={false}
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="text-white font-semibold text-[14px] sm:text-[15px]">
                            Image {currentIndex + 1} of {images.length}
                        </div>

                        <div className="text-[#9AA3B2] text-[13px] sm:text-[14px]">
                            Click thumbnails below to switch
                        </div>
                    </div>

                    {images.length > 1 && (
                        <div
                            className="mt-4 flex gap-3 overflow-x-auto pb-2"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#E9A700 rgba(255,255,255,0.08)',
                            }}
                        >
                            {images.map((img, index) => {
                                const active = index === currentIndex;

                                return (
                                    <button
                                        key={`${img}-${index}`}
                                        type="button"
                                        onClick={() => onSelect?.(index)}
                                        className="relative flex-shrink-0 overflow-hidden rounded-[14px] border"
                                        style={{
                                            width: 82,
                                            height: 82,
                                            borderColor: active ? '#F2BD16' : 'rgba(255,255,255,0.12)',
                                            boxShadow: active ? '0 0 0 2px rgba(242,189,22,0.18)' : 'none',
                                            background: '#0F1013',
                                        }}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumb ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            draggable={false}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

const EnterRaffleModal = memo(function EnterRaffleModal({
    raffle,
    onClose,
    onConfirm,
    entering = false,
}) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    const packageDeals = useMemo(() => {
        if (!raffle) return [];

        return Array.isArray(raffle?.packageDeals) && raffle.packageDeals.length > 0
            ? raffle.packageDeals
            : [
                  {
                      id: 'default-package',
                      tickets: 1,
                      price: Number(raffle?.ticketPrice || 0),
                      badge: '',
                  },
              ];
    }, [raffle]);

    const maxTickets = useMemo(() => {
        return raffle ? Math.max((raffle?.totalTickets || 0) - (raffle?.soldTickets || 0), 0) : 0;
    }, [raffle]);

    const validPackages = useMemo(() => {
        return packageDeals
            .map((pkg, idx) => ({
                id: pkg?.id || `pkg-${idx}`,
                tickets: Number(pkg?.tickets || 0),
                price: Number(pkg?.price || 0),
                badge: pkg?.badge || '',
            }))
            .filter((pkg) => pkg.tickets > 0 && pkg.price > 0 && pkg.tickets <= Math.max(maxTickets, 0));
    }, [packageDeals, maxTickets]);

    const [selectedPackageId, setSelectedPackageId] = useState(validPackages[0]?.id || null);

    useEffect(() => {
        setSelectedPackageId(validPackages[0]?.id || null);
    }, [raffle?.id, validPackages]);

    const selectedPackage = useMemo(() => {
        return validPackages.find((pkg) => pkg.id === selectedPackageId) || validPackages[0] || null;
    }, [validPackages, selectedPackageId]);

    const totalCost = Number(selectedPackage?.price || 0);
    const ticketCount = Number(selectedPackage?.tickets || 0);
    const perTicket =
        ticketCount > 0 && totalCost > 0 ? (totalCost / ticketCount).toFixed(2) : null;
    const closed = raffle ? isClosed(raffle) : false;

    const handleConfirm = useCallback(async () => {
        const ok = await onConfirm?.({
            fullName,
            email,
            ticketCount: Number(selectedPackage?.tickets || 0),
            totalCost: Number(selectedPackage?.price || 0),
            packageId: selectedPackage?.id || '',
            packageBadge: selectedPackage?.badge || '',
            packagePrice: Number(selectedPackage?.price || 0),
            packageTickets: Number(selectedPackage?.tickets || 0),
        });

        if (!ok) {
            alert("Failed to enter raffle");
        }
    }, [email, fullName, onConfirm, selectedPackage]);

    if (!raffle) return null;

    return (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
            <div
                className="relative w-full max-w-[720px] rounded-[24px] overflow-hidden border"
                style={{
                    background: 'linear-gradient(180deg, rgba(31,31,34,0.98) 0%, rgba(26,26,29,0.98) 100%)',
                    borderColor: 'rgba(77,102,143,0.55)',
                    boxShadow: '0 24px 70px rgba(0,0,0,0.46)',
                    maxHeight: 'calc(100vh - 28px)',
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-5 sm:right-5 text-[#B8C0CE] hover:text-white transition-colors z-10"
                >
                    <X className="w-7 h-7 sm:w-8 sm:h-8" />
                </button>

                <div className="px-4 sm:px-5 md:px-6 py-5 sm:py-6 overflow-y-auto max-h-[calc(100vh-28px)]">
                    <div className="flex flex-col items-center text-center">
                        <div
                            className="w-[74px] h-[74px] rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(108, 64, 18, 0.72)' }}
                        >
                            <Ticket className="w-8 h-8 text-[#F3BF17]" fill="#F3BF17" />
                        </div>

                        <h3 className="mt-5 text-white font-extrabold text-[28px] sm:text-[36px] leading-none">
                            Enter Raffle
                        </h3>

                        <p className="mt-3 text-[#9FA8B7] text-[17px] sm:text-[20px] leading-tight">
                            {raffle.title}
                        </p>
                    </div>

                    <div
                        className="mt-6 rounded-[16px] p-4 sm:p-5"
                        style={{
                            background: 'linear-gradient(90deg, rgba(95,56,20,0.52) 0%, rgba(59,39,20,0.52) 100%)',
                            border: '1px solid rgba(185,102,24,0.42)',
                        }}
                    >
                        <div className="text-[#BFC5D1] text-[14px] sm:text-[16px] font-semibold">
                            Prize
                        </div>
                        <div
                            className="mt-3 text-white font-bold text-[17px] sm:text-[20px] leading-[1.35]"
                            style={{ whiteSpace: 'pre-line' }}
                        >
                            {raffle.subtitle}
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-white font-bold text-[16px] sm:text-[18px] mb-2.5">
                            Full Name
                        </label>
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full h-[56px] sm:h-[60px] rounded-[14px] px-4 sm:px-5 text-[17px] sm:text-[19px] text-white placeholder:text-[#8E96A4] outline-none"
                            style={{
                                background: '#050608',
                                border: '1px solid rgba(77,102,143,0.7)',
                            }}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-white font-bold text-[16px] sm:text-[18px] mb-2.5">
                            Email Address
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full h-[56px] sm:h-[60px] rounded-[14px] px-4 sm:px-5 text-[17px] sm:text-[19px] text-white placeholder:text-[#8E96A4] outline-none"
                            style={{
                                background: '#050608',
                                border: '1px solid rgba(77,102,143,0.7)',
                            }}
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block text-white font-bold text-[16px] sm:text-[18px] mb-3">
                            Choose Your Ticket Bundle
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {validPackages.map((pkg, index) => {
                                const active = selectedPackage?.id === pkg.id;
                                const packagePerTicket =
                                    pkg.tickets > 0 && pkg.price > 0
                                        ? (pkg.price / pkg.tickets).toFixed(2)
                                        : null;

                                return (
                                    <button
                                        key={pkg.id || index}
                                        type="button"
                                        onClick={() => setSelectedPackageId(pkg.id)}
                                        className="relative w-full rounded-[18px] p-4 sm:p-5 text-center transition-all duration-300"
                                        style={{
                                            background: active
                                                ? 'linear-gradient(180deg, rgba(76,58,22,0.92) 0%, rgba(58,44,18,0.92) 100%)'
                                                : 'linear-gradient(180deg, rgba(34,47,71,0.88) 0%, rgba(30,42,63,0.88) 100%)',
                                            border: active
                                                ? '2px solid #F3BF17'
                                                : '1px solid rgba(77,102,143,0.55)',
                                            boxShadow: active
                                                ? '0 0 24px rgba(243,191,23,0.16)'
                                                : 'none',
                                            minHeight: '180px',
                                        }}
                                    >
                                        {!!pkg.badge && (
                                            <div
                                                className="absolute left-1/2 -translate-x-1/2 top-[-11px] px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-extrabold"
                                                style={{
                                                    background: '#F3BF17',
                                                    color: '#111111',
                                                    letterSpacing: '0.3px',
                                                }}
                                            >
                                                {pkg.badge}
                                            </div>
                                        )}

                                        <div
                                            className="mx-auto w-[48px] h-[48px] rounded-full flex items-center justify-center"
                                            style={{
                                                background: active
                                                    ? 'rgba(243,191,23,1)'
                                                    : 'rgba(255,255,255,0.10)',
                                            }}
                                        >
                                            <Ticket
                                                className={`w-5 h-5 ${active ? 'text-[#111]' : 'text-[#B0B7C3]'}`}
                                                fill={active ? '#111111' : 'none'}
                                            />
                                        </div>

                                        <div className={`mt-4 font-extrabold text-[28px] sm:text-[32px] leading-none ${active ? 'text-[#F3BF17]' : 'text-white'}`}>
                                            £{pkg.price}
                                        </div>

                                        <div className={`mt-4 font-bold text-[17px] sm:text-[18px] ${active ? 'text-[#F3BF17]' : 'text-white'}`}>
                                            {pkg.tickets} Ticket{pkg.tickets > 1 ? 's' : ''}
                                        </div>

                                        <div className="mt-2.5 text-[13px] sm:text-[14px] text-[#8F98A8]">
                                            {packagePerTicket ? `£${packagePerTicket} each` : 'Package price'}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div
                        className="mt-6 rounded-[16px] p-4 sm:p-5"
                        style={{
                            background: '#050608',
                            border: '1px solid rgba(77,102,143,0.7)',
                        }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="text-[#A0A8B7] text-[16px] sm:text-[18px]">
                                    Tickets
                                </div>
                                <div className="mt-5 text-[#A0A8B7] text-[16px] sm:text-[18px]">
                                    Price per ticket
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-white font-bold text-[16px] sm:text-[18px]">
                                    {ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'}
                                </div>
                                <div className="mt-5 text-white font-bold text-[16px] sm:text-[18px]">
                                    {perTicket ? `£${perTicket} each` : '—'}
                                </div>
                            </div>
                        </div>

                        <div className="my-5 h-px bg-[#43506B]" />

                        <div className="flex items-center justify-between gap-4">
                            <div className="text-white font-extrabold text-[22px] sm:text-[24px]">
                                Total Cost
                            </div>
                            <div className="text-[#F3BF17] font-extrabold text-[34px] sm:text-[42px] leading-none">
                                £{totalCost}
                            </div>
                        </div>
                    </div>

                    <div
                        className="mt-4 rounded-[16px] p-4 sm:p-5"
                        style={{
                            background: '#050608',
                            border: '1px solid rgba(77,102,143,0.7)',
                        }}
                    >
                        <div className="flex items-center gap-3 text-[#A0A8B7] text-[15px] sm:text-[16px]">
                            <CreditCard className="w-5 h-5" />
                            <span>Payment Method: Stripe</span>
                        </div>

                        <div className="mt-3 flex items-center gap-3 text-[#A0A8B7] text-[15px] sm:text-[16px]">
                            <ShieldCheck className="w-5 h-5" />
                            <span>Secure & encrypted payment</span>
                        </div>
                    </div>

                    <div className="mt-5">
                        <Button
                            disabled={closed || entering || !fullName || !email || !selectedPackage}
                            onClick={handleConfirm}
                            className="bg-gradient-to-r cursor-pointer from-[#FAB614] to-[#E5970C] text-black font-extrabold rounded-[14px] shadow-[0_0_20px_rgba(229,151,12,0.26)] flex items-center gap-3 w-full justify-center !h-[58px] sm:!h-[64px] !text-[18px] sm:!text-[20px]"
                        >
                            <Ticket className="h-5 w-5 sm:h-5 sm:w-5" />
                            {closed ? 'Raffle Closed' : entering ? 'Processing...' : 'Pay & Enter Raffle'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
});

const FeaturedRaffleCard = memo(function FeaturedRaffleCard({ raffle, onEnter, onOpenGallery }) {
    const progress = getProgress(raffle.soldTickets, raffle.totalTickets);
    const left = Math.max(raffle.totalTickets - raffle.soldTickets, 0);

    return (
        <div
            className="relative overflow-hidden rounded-[24px] border"
            style={{
                borderColor: 'rgba(235,180,0,0.55)',
                background: '#111214',
                boxShadow: '0 18px 50px rgba(0,0,0,0.28)',
            }}
        >
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: raffle?.image ? `url("${raffle.image}")` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.42,
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.48) 70%, rgba(255,255,255,0.10) 100%)',
                }}
            />

            <div className="relative z-10 p-5 sm:p-7 md:p-8">
                <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.3fr_1fr] lg:gap-8">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                            <Badge type="green">
                                <span className="w-2 h-2 rounded-full bg-[#22E58B]" />
                                FEATURED DRAW
                            </Badge>
                            <Badge type="gold">£{raffle.ticketPrice} / ticket</Badge>
                        </div>

                        <h3 className="text-white font-bold leading-tight text-[28px] md:text-[36px] lg:text-[42px] uppercase">
                            {raffle.title}
                        </h3>

                        <div
                            className="mt-5 rounded-[16px] p-4 sm:p-5 max-w-[560px]"
                            style={{
                                background: 'rgba(37, 28, 9, 0.55)',
                                border: '1px solid rgba(235,180,0,0.18)',
                            }}
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(235,180,0,0.16)' }}
                                >
                                    <Trophy className="w-5 h-5 text-[#F2BD16]" />
                                </div>

                                <div>
                                    <div className="text-[#F2BD16] text-[11px] sm:text-[12px] font-bold mb-1">Prize</div>
                                    <div
                                        className="text-white text-[15px] sm:text-[18px] font-medium leading-snug"
                                        style={{ whiteSpace: 'pre-line' }}
                                    >
                                        {raffle.subtitle}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ImageThumbStrip
                            images={raffle.images}
                            onOpen={onOpenGallery}
                        />

                        <div className="mt-7">
                            <Button
                                onClick={() => onEnter(raffle)}
                                className="bg-gradient-to-r cursor-pointer from-[#FAB614] to-[#E5970C] text-black font-bold text-lg h-14 px-8 rounded-full shadow-[0_0_20px_rgba(229,151,12,0.3)] flex items-center gap-3"
                            >
                                <Calendar className="h-6 w-6" />
                                Enter This Raffle
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <FeaturedStat label="Total" value={raffle.totalTickets} />
                            <FeaturedStat label="Sold" value={raffle.soldTickets} />
                            <FeaturedStat label="Left" value={left} highlight />
                        </div>

                        <div className="mt-6">
                            <ProgressBar value={progress} />
                        </div>

                        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="inline-flex items-center gap-2 text-[#9AA3B2] text-[13px] sm:text-[15px]">
                                <CalendarDays className="w-4 h-4 text-[#F2BD16]" />
                                Draw closes: {formatDate(raffle.drawDate)}
                            </div>

                            <Badge type="gold">{getRemainingDays(raffle.drawDate)} days left</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const SmallRaffleCard = memo(function SmallRaffleCard({ raffle, onEnter, onOpenGallery }) {
    const progress = getProgress(raffle.soldTickets, raffle.totalTickets);
    const left = Math.max(raffle.totalTickets - raffle.soldTickets, 0);
    const closed = isClosed(raffle);

    return (
        <div
            className="overflow-hidden rounded-[20px] border h-full"
            style={{
                background: 'linear-gradient(180deg, rgba(16,17,20,0.98) 0%, rgba(11,12,15,0.98) 100%)',
                borderColor: closed ? 'rgba(120,130,150,0.18)' : 'rgba(235,180,0,0.25)',
                boxShadow: '0 14px 40px rgba(0,0,0,0.22)',
            }}
        >
            <div className="relative h-[220px] sm:h-[240px]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: raffle?.image ? `url("${raffle.image}")` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: closed ? 'grayscale(20%)' : 'none',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.30) 55%, rgba(0,0,0,0.86) 100%)',
                    }}
                />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
                    <Badge type="gold">£{raffle.ticketPrice} / ticket</Badge>
                    <Badge type={closed ? 'gray' : 'green'}>{closed ? 'Closed' : 'Active'}</Badge>
                </div>
            </div>

            <div className="p-5">
                <h4 className="text-white font-bold text-[24px] md:text-[28px] leading-tight uppercase">
                    {raffle.title}
                </h4>

                <p className="mt-3 text-white/70 text-[15px] md:text-[16px] leading-relaxed">
                    {raffle.description}
                </p>

                <div
                    className="mt-5 rounded-[14px] p-4"
                    style={{
                        background: 'rgba(37, 28, 9, 0.45)',
                        border: '1px solid rgba(235,180,0,0.12)',
                    }}
                >
                    <div className="flex items-start gap-3">
                        <div
                            className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(235,180,0,0.14)' }}
                        >
                            <Trophy className="w-4 h-4 text-[#F2BD16]" />
                        </div>

                        <div>
                            <div className="text-[#F2BD16] text-[11px] font-bold mb-1">Prize</div>
                            <div
                                className="text-white text-[14px] sm:text-[15px] leading-snug"
                                style={{ whiteSpace: 'pre-line' }}
                            >
                                {raffle.subtitle}
                            </div>
                        </div>
                    </div>
                </div>

                <ImageThumbStrip
                    images={raffle.images}
                    onOpen={onOpenGallery}
                    compact
                />

                <div className="grid grid-cols-2 gap-3 mt-5">
                    <div
                        className="rounded-[14px] p-4"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        <div className="text-[#6D7584] text-[11px] font-semibold">Sold</div>
                        <div className="text-white text-[26px] font-extrabold mt-1">{raffle.soldTickets}</div>
                    </div>

                    <div
                        className="rounded-[14px] p-4"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        <div className="text-[#F2BD16] text-[11px] font-semibold">Left</div>
                        <div className="text-[#F2BD16] text-[26px] font-extrabold mt-1">{left}</div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[#6D7584] text-[12px] font-semibold">Progress</span>
                        <span className="text-[#F2BD16] text-[13px] font-bold">{progress}%</span>
                    </div>

                    <div className="w-full h-[7px] rounded-full bg-white/10 overflow-hidden">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, #F3BF17 0%, #E6A700 100%)',
                            }}
                        />
                    </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-[#6D7584] text-[13px]">
                    <CalendarDays className="w-4 h-4 text-[#F2BD16]" />
                    Closes: {formatDate(raffle.drawDate)}
                </div>

                <div className="mt-6">
                    <Button
                        onClick={() => !closed && onEnter(raffle)}
                        disabled={closed}
                        className={`bg-gradient-to-r cursor-pointer from-[#FAB614] to-[#E5970C] text-black font-bold text-lg h-14 px-8 rounded-full shadow-[0_0_20px_rgba(229,151,12,0.3)] flex items-center gap-3 w-full justify-center ${
                            closed ? '!bg-[#1C2331] !text-[#677084] shadow-none cursor-not-allowed' : ''
                        }`}
                    >
                        <Calendar className="h-5 w-5" />
                        {closed ? 'Raffle Closed' : 'Enter Raffle'}
                    </Button>
                </div>
            </div>
        </div>
    );
});

const RafflesSection = () => {
    const [selectedRaffle, setSelectedRaffle] = useState(null);
    const [raffles, setRaffles] = useState([]);
    const [entriesMap, setEntriesMap] = useState({});
    const [load, setLoad] = useState(true);
    const [entering, setEntering] = useState(false);

    const [galleryImages, setGalleryImages] = useState([]);
    const [galleryIndex, setGalleryIndex] = useState(0);

    useEffect(() => {
        const unsub = onSnapshot(collection(firestore_db, "raffles"), (snapshot) => {
            const arr = snapshot.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            }));

            arr.sort((a, b) => {
                const at = a?.createdAt?.seconds ? a.createdAt.seconds * 1000 : 0;
                const bt = b?.createdAt?.seconds ? b.createdAt.seconds * 1000 : 0;
                return bt - at;
            });

            setRaffles(arr);
            setLoad(false);
        });

        return () => unsub();
    }, []);

    useEffect(() => {
        const entriesRef = ref(db, "raffle_entries");

        const callback = onValue(entriesRef, (snapshot) => {
            const data = snapshot.val() || {};
            setEntriesMap(data);
        });

        return () => off(entriesRef, "value", callback);
    }, []);

    const rafflesWithEntries = useMemo(() => {
        return raffles.map((item) => {
            const rawEntries = entriesMap?.[item.id] ? Object.values(entriesMap[item.id]) : [];
            const soldFromEntries = rawEntries.reduce((sum, entry) => sum + Number(entry.tickets || 0), 0);
            const images = normalizeRaffleImages(item);

            return {
                ...item,
                images,
                image: images[0] || "",
                ticketPrice: Number(item.price || 0),
                totalTickets: Number(item.total || 0),
                soldTickets: Number(item.sold ?? soldFromEntries ?? 0),
                drawDate: item.drawnDate,
                entries: rawEntries,
            };
        });
    }, [raffles, entriesMap]);

    const featuredRaffle = useMemo(() => {
        const upcoming = rafflesWithEntries
            .filter(isUpcoming)
            .sort((a, b) => new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime());

        return upcoming.length > 0 ? upcoming[0] : null;
    }, [rafflesWithEntries]);

    const otherRaffles = useMemo(() => {
        const others = [...rafflesWithEntries].filter((item) => item.id !== featuredRaffle?.id);

        return others.sort((a, b) => {
            const aClosed = isClosed(a);
            const bClosed = isClosed(b);

            if (aClosed !== bClosed) return aClosed ? 1 : -1;
            return new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime();
        });
    }, [rafflesWithEntries, featuredRaffle]);

    const openGallery = useCallback((images = [], index = 0) => {
        if (!Array.isArray(images) || images.length === 0) return;
        setGalleryImages(images);
        setGalleryIndex(index);
    }, []);

    const closeGallery = useCallback(() => {
        setGalleryImages([]);
        setGalleryIndex(0);
    }, []);

    const showPrevImage = useCallback(() => {
        setGalleryIndex((prev) => {
            if (!galleryImages.length) return 0;
            return prev === 0 ? galleryImages.length - 1 : prev - 1;
        });
    }, [galleryImages]);

    const showNextImage = useCallback(() => {
        setGalleryIndex((prev) => {
            if (!galleryImages.length) return 0;
            return prev === galleryImages.length - 1 ? 0 : prev + 1;
        });
    }, [galleryImages]);

    const submitRaffleEntry = useCallback(async (raffle, payload) => {
        try {
            if (!raffle?.id) return false;

            setEntering(true);

            const response = await fetch(
                `https://app-p4r2la7ira-uc.a.run.app/create-raffle-checkout-session?amount=${encodeURIComponent(payload.totalCost)}&email=${encodeURIComponent(payload.email)}&fullName=${encodeURIComponent(payload.fullName)}&raffleId=${encodeURIComponent(raffle.id)}&raffleTitle=${encodeURIComponent(raffle.title || "")}&rafflePrize=${encodeURIComponent(raffle.subtitle || "")}&packageId=${encodeURIComponent(payload.packageId || "")}&packageBadge=${encodeURIComponent(payload.packageBadge || "")}&packageTickets=${encodeURIComponent(payload.packageTickets || payload.ticketCount || 0)}`
            );

            const data = await response.json();

            if (data?.url) {
                window.location.href = data.url;
                return true;
            }

            return false;
        } catch {
            return false;
        } finally {
            setEntering(false);
        }
    }, []);

    const handleOpenEnterModal = useCallback((raffle) => {
        setSelectedRaffle(raffle);
    }, []);

    const handleCloseEnterModal = useCallback(() => {
        setSelectedRaffle(null);
    }, []);

    const handleGallerySelect = useCallback((index) => {
        setGalleryIndex(index);
    }, []);

    return (
        <>
            <section className="relative z-10 container mx-auto px-6 pt-20 pb-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center gap-6 text-center mb-10 sm:mb-12">
                        <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight uppercase">
                            <span className="text-[#FAB614] block md:inline">
                                Active
                            </span>{' '}
                            <span className="text-white block md:inline">
                                Raffles
                            </span>
                        </h2>

                        <div className="max-w-5xl">
                            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                                Support us further by entering our CineCertified Raffles for a chance to win incredible prizes sponsored
                                <br />
                                by our supporters. Every ticket directly supports our work and the community as a whole.
                            </p>
                        </div>
                    </div>

                    {load ? (
                        <div className="text-center text-white/70 py-10">Loading raffles...</div>
                    ) : null}

                    {!load && featuredRaffle && (
                        <FeaturedRaffleCard
                            raffle={featuredRaffle}
                            onEnter={handleOpenEnterModal}
                            onOpenGallery={openGallery}
                        />
                    )}

                    {!load && otherRaffles.length > 0 && (
                        <div className="mt-7 sm:mt-8">
                            <div
                                className="flex gap-5 sm:gap-6 overflow-x-auto pb-3"
                                style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#E9A700 rgba(255,255,255,0.08)',
                                }}
                            >
                                {otherRaffles.map((raffle) => (
                                    <div
                                        key={raffle.id}
                                        className="flex-shrink-0 w-[88vw] sm:w-[420px] lg:w-[430px]"
                                    >
                                        <SmallRaffleCard
                                            raffle={raffle}
                                            onEnter={handleOpenEnterModal}
                                            onOpenGallery={openGallery}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {selectedRaffle && (
                <EnterRaffleModal
                    raffle={selectedRaffle}
                    onClose={handleCloseEnterModal}
                    entering={entering}
                    onConfirm={(payload) => submitRaffleEntry(selectedRaffle, payload)}
                />
            )}

            {galleryImages.length > 0 && (
                <ImageLightboxModal
                    images={galleryImages}
                    currentIndex={galleryIndex}
                    onClose={closeGallery}
                    onPrev={showPrevImage}
                    onNext={showNextImage}
                    onSelect={handleGallerySelect}
                />
            )}
        </>
    );
};

export default RafflesSection;