import React, { useMemo, useState } from 'react';
import { Heart, Lock, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';
import { toast } from 'wc-toast';

const DonationPage = () => {
    const [showNewsletter] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [amountOpen, setAmountOpen] = useState(false);

    const donationOptions = [
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

    const selectedLabel = useMemo(() => {
        const found = donationOptions.find((x) => x.value === selectedAmount);
        return found ? found.label : 'Select an amount';
    }, [selectedAmount]);

    const finalAmount =
        selectedAmount === 'custom'
            ? Number(customAmount || 0)
            : Number(selectedAmount || 0);

    const handleDonate = () => {
        if (!finalAmount || finalAmount <= 0) {
            toast.error('Please select or enter an amount');
            return;
        }

        toast.success(`Donation amount selected: £${finalAmount}`);
    };

    const handleAmountPick = (value) => {
        setSelectedAmount(value);
        setAmountOpen(false);

        if (value !== 'custom') {
            setCustomAmount('');
        }
    };

    return (
        <>
            <wc-toast></wc-toast>

            <div
                className={`min-h-screen bg-black text-white overflow-x-hidden ${showNewsletter ? 'h-screen overflow-hidden' : ''
                    }`}
            >
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
                </div>

                <Navbar selectedMenu="Donation" />

                <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 mt-6 sm:mt-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Support Badge */}

                        <div style={{ height: 10, width: '90%' }} />

                        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
                            <div
                                className="inline-flex items-center justify-center gap-3 sm:gap-4
    h-[50px] sm:h-[56px] md:h-[60px]
    px-8 sm:px-10 md:px-12
    rounded-full"
                                style={{
                                    background:
                                        "linear-gradient(90deg, rgba(67,46,21,0.78) 0%, rgba(88,58,23,0.82) 50%, rgba(67,46,21,0.78) 100%)",
                                    border: "1px solid rgba(255,191,0,0.14)",
                                    boxShadow:
                                        "0 10px 30px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,210,30,0.06)",
                                    backdropFilter: "blur(4px)",
                                    WebkitBackdropFilter: "blur(4px)",
                                }}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]"
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
                                        color: "#FFD21E",
                                        fontFamily: "inherit",
                                        fontSize: "clamp(16px, 2vw, 20px)",
                                    }}
                                >
                                    Support Us
                                </span>
                            </div>
                        </div>

                        {/* Heading */}
                        <div className="text-center max-w-4xl mx-auto">
                            <h1
                                className="text-white font-extrabold uppercase
                text-[34px] sm:text-[48px] md:text-[60px] leading-[0.98]"
                                style={{ fontFamily: 'inherit' }}
                            >
                                MAKE A DIFFERENCE
                            </h1>

                            <p className="mt-5 sm:mt-6 text-[#AEB5C2] text-base sm:text-xl md:text-[20px] leading-7 sm:leading-8 max-w-3xl mx-auto">
                                Your generous donation helps us continue providing exceptional
                                training and support to camera professionals across the UK.
                            </p>
                        </div>

                        {/* Donation Card */}
                        {/* Donation Card */}
                        <div className="mt-12 sm:mt-14">
                            <div
                                className="mx-auto w-full max-w-3xl rounded-[22px] border border-[#41506B]
    px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-7"
                                style={{
                                    background:
                                        'linear-gradient(180deg, rgba(31,31,34,0.97) 0%, rgba(27,27,30,0.97) 100%)',
                                    boxShadow:
                                        '0 24px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)',
                                }}
                            >
                                {/* Select Amount */}
                                <div className="mb-6">
                                    <label className="block text-[#A7AFBD] text-[18px] sm:text-[22px] md:text-[26px] font-semibold mb-3">
                                        Select Amount
                                    </label>

                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setAmountOpen((prev) => !prev)}
                                            className="w-full rounded-[16px]
          border border-[#465774]
          text-white text-left text-[17px] sm:text-[20px]
          px-4 sm:px-6 pr-14
          h-[58px] sm:h-[68px]
          outline-none transition-all duration-300"
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
                                                className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
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
                                                    className={`w-4 h-4 text-white transition-transform duration-300 ${amountOpen ? 'rotate-180' : ''
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
                                                {donationOptions.map((item, idx) => {
                                                    const active = selectedAmount === item.value;

                                                    return (
                                                        <button
                                                            key={item.value}
                                                            type="button"
                                                            onClick={() => handleAmountPick(item.value)}
                                                            className="w-full text-left px-4 sm:px-6 h-[48px] sm:h-[52px]
                  text-[16px] sm:text-[18px] transition-all duration-200"
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

                                {/* Custom Amount */}
                                <div className="mb-6">
                                    <label className="block text-[#A7AFBD] text-[18px] sm:text-[22px] md:text-[26px] font-semibold mb-3">
                                        Enter Custom Amount
                                    </label>

                                    <div
                                        className="flex items-center gap-3 w-full rounded-[16px]
        border border-[#465774]
        h-[58px] sm:h-[68px] px-4 sm:px-6"
                                        style={{
                                            background:
                                                'linear-gradient(180deg, #0B0B0D 0%, #060608 100%)',
                                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                                        }}
                                    >
                                        <span className="text-white text-[22px] sm:text-[28px] font-semibold">
                                            £
                                        </span>

                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={customAmount}
                                            onChange={(e) => {
                                                setCustomAmount(e.target.value);
                                                if (e.target.value !== '') setSelectedAmount('custom');
                                                if (e.target.value === '') setSelectedAmount('');
                                            }}
                                            className="w-full bg-transparent text-white placeholder:text-[#9AA3B2]
          text-[17px] sm:text-[20px] outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Donate Button */}
                                <button
                                    type="button"
                                    disabled={!finalAmount || finalAmount <= 0}
                                    onClick={handleDonate}
                                    className={`w-full h-[58px] sm:h-[68px] rounded-[16px]
      text-[18px] sm:text-[20px] font-semibold
      transition-all duration-300 flex items-center justify-center gap-3
      ${finalAmount > 0
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

                                {/* Secure Note */}
                                <div className="flex items-center justify-center gap-2 mt-6 text-[#4C5B75] text-sm sm:text-[18px]">
                                    <Lock className="w-4 h-4" />
                                    <span>Secure payment processing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default DonationPage;