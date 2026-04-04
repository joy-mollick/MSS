import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Heart, Lock, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import RefflesSection from '@/components/RefflesSection';
import Footer from '@/components/HomePage/Footer';
import { toast } from 'wc-toast';

const DONATION_OPTIONS = [
    { label: '£10', value: '10' },
    { label: '£20', value: '20' },
    { label: '£30', value: '30' },
    { label: '£40', value: '40' },
    { label: '£50', value: '50' },
    { label: '£100', value: '100' },
    { label: '£500', value: '500' },
    { label: '£1000', value: '1000' },
    { label: 'Custom Amount', value: 'custom' },
];

const DonationPage = () => {
    const [showNewsletter] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [amountOpen, setAmountOpen] = useState(false);

    const [step, setStep] = useState('select'); // select | details | thanks
    const [donorName, setDonorName] = useState('');
    const [donorEmail, setDonorEmail] = useState('');

    const selectedLabel = useMemo(() => {
        const found = DONATION_OPTIONS.find((x) => x.value === selectedAmount);
        return found ? found.label : 'Select an amount';
    }, [selectedAmount]);

    const finalAmount = useMemo(() => {
        return selectedAmount === 'custom'
            ? Number(customAmount || 0)
            : Number(selectedAmount || 0);
    }, [selectedAmount, customAmount]);

    useEffect(() => {
        const hash = window.location.hash || '';
        const queryString = hash.includes('?') ? hash.split('?')[1] : '';
        const params = new URLSearchParams(queryString);

        const stripeSuccess =
            params.get('success') === 'true' ||
            params.get('payment') === 'success' ||
            params.get('donation') === 'success' ||
            !!params.get('session_id');

        if (stripeSuccess) {
            setStep('thanks');
            setDonorName(localStorage.getItem('donation_name') || '');
            setDonorEmail(localStorage.getItem('donation_email') || '');
        }
    }, []);

    const handleDonate = useCallback(() => {
        if (!finalAmount || finalAmount <= 0) {
            toast.error('Please select or enter an amount');
            return;
        }

        setAmountOpen(false);
        setStep('details');
    }, [finalAmount]);

    const handleAmountPick = useCallback((value) => {
        setSelectedAmount(value);
        setAmountOpen(false);

        if (value !== 'custom') {
            setCustomAmount('');
        }
    }, []);

    const handleCustomAmountChange = useCallback((e) => {
        const value = e.target.value;
        setCustomAmount(value);

        if (value !== '') setSelectedAmount('custom');
        if (value === '') setSelectedAmount('');
    }, []);

    const handleConfirmDonation = useCallback(async () => {
        if (!donorName.trim()) {
            toast.error('Please enter your full name');
            return;
        }

        if (!donorEmail.trim()) {
            toast.error('Please enter your email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(donorEmail.trim())) {
            toast.error('Please enter a valid email address');
            return;
        }

        if (!finalAmount || finalAmount <= 0) {
            toast.error('Please select a valid donation amount');
            return;
        }

        try {
            localStorage.setItem('donation_name', donorName.trim());
            localStorage.setItem('donation_email', donorEmail.trim());
            localStorage.setItem('donation_amount', String(finalAmount));

            const response = await fetch(
                `https://app-p4r2la7ira-uc.a.run.app/create-donation-checkout-session?amount=${encodeURIComponent(
                    finalAmount
                )}&email=${encodeURIComponent(donorEmail.trim())}&donorName=${encodeURIComponent(
                    donorName.trim()
                )}`
            );

            const data = await response.json();

            if (data?.url) {
                window.location.href = data.url;
            } else {
                toast.error('Failed to create donation checkout session');
            }
        } catch {
            toast.error('Something went wrong');
        }
    }, [donorEmail, donorName, finalAmount]);

    const goBackToSelect = useCallback(() => {
        setStep('select');
    }, []);

    return (
        <>
            <wc-toast></wc-toast>

            <div
                className={`min-h-screen bg-black text-white overflow-x-hidden ${
                    showNewsletter ? 'h-screen overflow-hidden' : ''
                }`}
            >
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
                </div>

                <Navbar selectedMenu="Donation" />

                <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 mt-6 sm:mt-10">
                    <div className="max-w-5xl mx-auto">
                        <div style={{ height: 10, width: '90%' }} />

                        <>
                            <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
                                <div
                                    className="inline-flex items-center justify-center gap-3 sm:gap-4 h-[48px] sm:h-[54px] md:h-[58px] px-7 sm:px-9 md:px-11 rounded-full"
                                    style={{
                                        background:
                                            'linear-gradient(90deg, rgba(67,46,21,0.78) 0%, rgba(88,58,23,0.82) 50%, rgba(67,46,21,0.78) 100%)',
                                        border: '1px solid rgba(255,191,0,0.14)',
                                        boxShadow:
                                            '0 10px 30px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,210,30,0.06)',
                                        backdropFilter: 'blur(4px)',
                                        WebkitBackdropFilter: 'blur(4px)',
                                    }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] md:w-[19px] md:h-[19px]"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 21s-6.7-4.35-9.16-8.16C.94 9.89 2.09 6 5.76 6c2.17 0 3.46 1.22 4.12 2.2C10.54 7.22 11.83 6 14 6c3.67 0 4.82 3.89 2.92 6.84C18.46 16.65 12 21 12 21Z"
                                            fill="#FFD21E"
                                        />
                                    </svg>

                                    <span
                                        className="font-semibold leading-none"
                                        style={{
                                            color: '#FFD21E',
                                            fontFamily: 'inherit',
                                            fontSize: 'clamp(15px, 2vw, 19px)',
                                        }}
                                    >
                                        Support Us
                                    </span>
                                </div>
                            </div>

                            <div className="text-center max-w-4xl mx-auto">
                                <h1
                                    className="text-white font-extrabold uppercase text-[32px] sm:text-[44px] md:text-[56px] leading-[0.98]"
                                    style={{ fontFamily: 'inherit' }}
                                >
                                    MAKE A DIFFERENCE
                                </h1>

                                <div className="mt-5 sm:mt-6 text-center text-[#AEB5C2] text-[15px] sm:text-[18px] md:text-[19px] leading-7 sm:leading-8 mx-auto">
                                    <p className="block lg:hidden max-w-3xl mx-auto">
                                        Your generous support enables us to continue championing UK freelance professionals while building a nationwide skills passport that supports both emerging and established talent.
                                    </p>

                                    <p className="hidden lg:block max-w-none mx-auto">
                                        <span className="block whitespace-nowrap">
                                            Your generous support enables us to continue championing UK freelance professionals while building a nationwide
                                        </span>
                                        <span className="block">
                                            skills passport that supports both emerging and established talent.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </>

                        <div className="mt-10 sm:mt-12">
                            <div
                                className="mx-auto w-full max-w-[650px] rounded-[18px] border border-[#41506B] px-4 sm:px-5 md:px-6 py-4 sm:py-5"
                                style={{
                                    minHeight: '420px',
                                    background:
                                        'linear-gradient(180deg, rgba(31,31,34,0.97) 0%, rgba(27,27,30,0.97) 100%)',
                                    boxShadow:
                                        '0 24px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)',
                                }}
                            >
                                {step === 'select' && (
                                    <div className="flex flex-col justify-center h-full">
                                        <div className="mb-5">
                                            <label className="block text-[#A7AFBD] text-[17px] sm:text-[20px] md:text-[23px] font-semibold mb-3">
                                                Select Amount
                                            </label>

                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setAmountOpen((prev) => !prev)}
                                                    className="w-full rounded-[14px] border border-[#465774] text-white text-left text-[16px] sm:text-[18px] px-4 sm:px-5 pr-14 h-[54px] sm:h-[62px] outline-none transition-all duration-300"
                                                    style={{
                                                        background:
                                                            'linear-gradient(180deg, #0B0B0D 0%, #060608 100%)',
                                                        boxShadow:
                                                            'inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 20px rgba(0,0,0,0.18)',
                                                    }}
                                                >
                                                    {selectedLabel}
                                                </button>

                                                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                                    <div
                                                        className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
                                                        style={{
                                                            background: amountOpen
                                                                ? 'rgba(235,180,0,0.16)'
                                                                : 'rgba(255,255,255,0.03)',
                                                            border: amountOpen
                                                                ? '1px solid rgba(235,180,0,0.35)'
                                                                : '1px solid rgba(255,255,255,0.05)',
                                                        }}
                                                    >
                                                        <ChevronDown
                                                            className={`w-4 h-4 text-white transition-transform duration-300 ${
                                                                amountOpen ? 'rotate-180' : ''
                                                            }`}
                                                        />
                                                    </div>
                                                </div>

                                                {amountOpen && (
                                                    <div
                                                        className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-[14px] border border-[#39465D]"
                                                        style={{
                                                            background:
                                                                'linear-gradient(180deg, rgba(27,27,30,0.99) 0%, rgba(22,22,24,0.99) 100%)',
                                                            boxShadow:
                                                                '0 24px 60px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.03)',
                                                        }}
                                                    >
                                                        {DONATION_OPTIONS.map((item, idx) => {
                                                            const active = selectedAmount === item.value;

                                                            return (
                                                                <button
                                                                    key={item.value}
                                                                    type="button"
                                                                    onClick={() => handleAmountPick(item.value)}
                                                                    className="w-full text-left px-4 sm:px-5 h-[46px] sm:h-[50px] text-[15px] sm:text-[17px] transition-all duration-200"
                                                                    style={{
                                                                        color: active ? '#F2C14E' : '#AAB2C0',
                                                                        background: active
                                                                            ? 'linear-gradient(90deg, rgba(235,180,0,0.15) 0%, rgba(235,180,0,0.06) 100%)'
                                                                            : 'transparent',
                                                                        borderTop:
                                                                            idx === 0
                                                                                ? 'none'
                                                                                : '1px solid rgba(255,255,255,0.07)',
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        if (!active) {
                                                                            e.currentTarget.style.background =
                                                                                'rgba(255,255,255,0.035)';
                                                                            e.currentTarget.style.color = '#FFFFFF';
                                                                        }
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        if (!active) {
                                                                            e.currentTarget.style.background =
                                                                                'transparent';
                                                                            e.currentTarget.style.color = '#AAB2C0';
                                                                        }
                                                                    }}
                                                                >
                                                                    {item.label}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-5">
                                            <label className="block text-[#A7AFBD] text-[17px] sm:text-[20px] md:text-[23px] font-semibold mb-3">
                                                Enter Custom Amount
                                            </label>

                                            <div
                                                className="flex items-center gap-3 w-full rounded-[14px] border border-[#465774] h-[54px] sm:h-[62px] px-4 sm:px-5"
                                                style={{
                                                    background:
                                                        'linear-gradient(180deg, #0B0B0D 0%, #060608 100%)',
                                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                                                }}
                                            >
                                                <span className="text-white text-[21px] sm:text-[25px] font-semibold">
                                                    £
                                                </span>

                                                <input
                                                    type="number"
                                                    min="0"
                                                    placeholder="0"
                                                    value={customAmount}
                                                    onChange={handleCustomAmountChange}
                                                    className="w-full bg-transparent text-white placeholder:text-[#9AA3B2] text-[16px] sm:text-[18px] outline-none"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            disabled={!finalAmount || finalAmount <= 0}
                                            onClick={handleDonate}
                                            className={`w-full h-[54px] sm:h-[62px] rounded-[14px] text-[17px] sm:text-[19px] font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                                                finalAmount > 0
                                                    ? 'text-black hover:scale-[1.01]'
                                                    : 'bg-[#445168] text-[#8C93A3] cursor-not-allowed'
                                            }`}
                                            style={{
                                                background: finalAmount > 0 ? '#EBB400' : '#445168',
                                                boxShadow:
                                                    finalAmount > 0
                                                        ? '0 16px 34px rgba(235,180,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)'
                                                        : 'none',
                                            }}
                                        >
                                            <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
                                            <span>Donate Now</span>
                                        </button>

                                        <div className="flex items-center justify-center gap-2 mt-5 text-[#4C5B75] text-sm sm:text-[16px]">
                                            <Lock className="w-4 h-4" />
                                            <span>Secure payment processing</span>
                                        </div>
                                    </div>
                                )}

                                {step === 'details' && (
                                    <div className="flex flex-col justify-center h-full">
                                        <div className="flex flex-col items-center text-center py-1">
                                            <div
                                                className="flex items-center justify-center rounded-full mb-4"
                                                style={{
                                                    width: '64px',
                                                    height: '64px',
                                                    background: 'rgba(235,180,0,0.22)',
                                                }}
                                            >
                                                <Heart className="w-7 h-7 text-[#FBBF24]" fill="currentColor" />
                                            </div>

                                            <h2 className="text-white font-extrabold text-[26px] sm:text-[34px] leading-tight">
                                                Complete Your Donation
                                            </h2>

                                            <div className="mt-2 text-[#FBBF24] font-extrabold text-[38px] sm:text-[48px] leading-none">
                                                £{finalAmount}
                                            </div>
                                        </div>

                                        <div className="mt-6 mb-5">
                                            <label className="block text-[#A7AFBD] text-[17px] sm:text-[20px] md:text-[23px] font-semibold mb-3">
                                                Full Name
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Your name"
                                                value={donorName}
                                                onChange={(e) => setDonorName(e.target.value)}
                                                className="w-full rounded-[14px] border border-[#465774] bg-[#050608] text-white placeholder:text-[#9AA3B2] outline-none h-[54px] sm:h-[62px] px-4 sm:px-5 text-[16px] sm:text-[18px]"
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label className="block text-[#A7AFBD] text-[17px] sm:text-[20px] md:text-[23px] font-semibold mb-3">
                                                Email Address
                                            </label>

                                            <input
                                                type="email"
                                                placeholder="you@example.com"
                                                value={donorEmail}
                                                onChange={(e) => setDonorEmail(e.target.value)}
                                                className="w-full rounded-[14px] border border-[#465774] bg-[#050608] text-white placeholder:text-[#9AA3B2] outline-none h-[54px] sm:h-[62px] px-4 sm:px-5 text-[16px] sm:text-[18px]"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleConfirmDonation}
                                            className="w-full h-[54px] sm:h-[62px] rounded-[14px] text-[17px] sm:text-[19px] font-semibold transition-all duration-300 flex items-center justify-center gap-3 text-black hover:scale-[1.01]"
                                            style={{
                                                background: '#EBB400',
                                                boxShadow:
                                                    '0 16px 34px rgba(235,180,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)',
                                            }}
                                        >
                                            <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
                                            <span>{`Confirm Donation — £${finalAmount}`}</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={goBackToSelect}
                                            className="w-full mt-3 h-[50px] sm:h-[56px] rounded-[14px] border border-[#465774] text-white text-[15px] sm:text-[17px] font-medium transition-all duration-300 hover:bg-white/5"
                                        >
                                            Back
                                        </button>

                                        <div className="flex items-center justify-center gap-2 mt-5 text-[#4C5B75] text-sm sm:text-[16px]">
                                            <Lock className="w-4 h-4" />
                                            <span>Secure payment processing</span>
                                        </div>
                                    </div>
                                )}

                                {step === 'thanks' && (
                                    <div className="flex flex-col items-center justify-center text-center h-full py-2">
                                        <div
                                            className="flex items-center justify-center rounded-full mb-5"
                                            style={{
                                                width: '72px',
                                                height: '72px',
                                                background: 'rgba(235,180,0,0.22)',
                                            }}
                                        >
                                            <Heart className="w-8 h-8 text-[#FBBF24]" fill="currentColor" />
                                        </div>

                                        <h2 className="text-white font-extrabold text-[28px] sm:text-[36px] leading-tight">
                                            Thank You So Much
                                        </h2>

                                        <div className="mt-2 text-[#FBBF24] font-bold text-[21px] sm:text-[28px] leading-tight">
                                            for Supporting Us! 🧡
                                        </div>

                                        <p className="mt-6 text-[#AEB5C2] text-[16px] sm:text-[19px] leading-[1.55] max-w-[540px]">
                                            Your generosity means the world to us and helps us keep building great things.
                                            <br />
                                            We truly appreciate every bit of support.
                                        </p>

                                        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
                                            <div className="flex items-center gap-2 text-[#4C5B75] text-[14px] sm:text-[16px]">
                                                <Lock className="w-4 h-4" />
                                                <span>A confirmation has been sent to</span>
                                            </div>

                                            <span className="text-white text-[16px] sm:text-[19px] break-all">
                                                {donorEmail || 'your email address'}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={goBackToSelect}
                                            className="mt-7 h-[50px] sm:h-[56px] px-6 rounded-[14px] border border-[#465774] text-white text-[15px] sm:text-[17px] font-medium transition-all duration-300 hover:bg-white/5"
                                        >
                                            Back to Donation
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <RefflesSection />

                <Footer />
            </div>
        </>
    );
};

export default DonationPage;