import React, { useEffect, useState } from 'react';
import {
    ChevronLeft,
    MapPin,
    Clock,
    User,
    Check,
    Armchair,
    BookOpen,
    Lock,
    Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';
import { db } from '../config';
import moment from 'moment';
import { toast } from 'wc-toast';
import { decrypt } from '../Crypto';

const FinalAssessment = () => {
    const hash = window.location.hash;
    const queryString = hash.includes("?") ? hash.split("?")[1] : "";
    const params = new URLSearchParams(queryString);

    const rawUser = params.get("user") || "";
    const fixedPrefix = "ABZ2NLMOV";

    const extractedUserId = rawUser.startsWith(fixedPrefix)
        ? rawUser.slice(fixedPrefix.length)
        : "";

    const [userId, setUserId] = useState(extractedUserId);
    const [userLoading, setUserLoading] = useState(true);

    const [currentStep, setCurrentStep] = useState(1);

    const [bookingData, setBookingData] = useState({
        location: null,
        course: null,
        details: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            role: '',
            notes: ''
        }
    });

    const [all_courses, setAllCourses] = useState([]);
    const [location_arr, setLocations] = useState([]);
    const [courses, setCourses] = useState([]);

    const [discountCode, setDiscountCode] = useState("");
    const [discountInfo, setDiscountInfo] = useState(null);
    const [discountError, setDiscountError] = useState("");
    const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);

    console.log('Extracted User ID: ', extractedUserId);
    console.log('Booking data ', bookingData);
    console.log('Location list ', location_arr);

    useEffect(() => {
        if (extractedUserId !== '') {
            setUserId(extractedUserId);
        }
    }, [extractedUserId]);

    useEffect(() => {
        if (userId !== '') {
            setUserLoading(true);

            const signRef = db.ref('Sign_up').child(String(userId));

            const callback = signRef.on('value', async (snap) => {
                if (snap !== undefined && snap.val() !== null) {
                    let val = snap.val();
                    let firstName = decrypt(val.First_Name || "");
                    let surname = decrypt(val.Last_Name || "");
                    let mail = decrypt(val.Email || "");

                    setBookingData((prev) => ({
                        ...prev,
                        details: {
                            ...prev.details,
                            firstName,
                            lastName: surname,
                            email: mail
                        }
                    }));

                    setUserLoading(false);
                } else if (snap !== undefined) {
                    setUserLoading(false);
                    toast('Unauthorized access. Redirecting to home page.');
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                }
            });

            return () => signRef.off('value', callback);
        } else {
            setUserLoading(false);
            toast('Unauthorized access. Redirecting to home page.');
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }
    }, [userId]);

    function gatherUserDetails() {
        if (
            bookingData.details.role !== '' &&
            bookingData.details.company !== '' &&
            bookingData.details.firstName !== '' &&
            bookingData.details.lastName !== '' &&
            bookingData.details.email !== '' &&
            bookingData.details.phone !== ''
        ) {
            payByFinal();
        } else {
            toast('Missing information');
        }
    }

  
    async function payByFinal() {



        let booking_obj = {
            ...bookingData.details,
            course_id: bookingData.course.id,
            booking_id: new Date().getTime()
        };

        await db.ref('FinalBooking')
            .child(String(booking_obj.course_id))
            .child(String(booking_obj.booking_id))
            .set(booking_obj);

        await fetch("https://app-p4r2la7ira-uc.a.run.app/send-final-assessment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_email: 'r.whitlock@boomsoftware.co.uk',
                user_name: bookingData.details.firstName + " " + bookingData.details.lastName,
                courseName: bookingData.course.courseName,
                instructor: bookingData.course.instructor,
                location: bookingData.course.location,
                venue: bookingData.course.venue,
                startTime: bookingData.course.startTime,
                endTime: bookingData.course.endTime,
                date: bookingData.course.date
            })
        });

        handleNext();
    }

    useEffect(() => {
        const finalRef = db.ref('Final');

        const subscribe = finalRef.on('value', async (snap) => {
            if (snap !== undefined && snap.val() !== null) {
                let arr = Object.values(snap.val());
                for (let i = 0; i < arr.length; i++) {
                    let val = (await db.ref('FinalBooking')
                        .child(String(arr[i].id))
                        .once('value')).numChildren();
                    arr[i].total_applied = val;
                }
                setAllCourses([...arr]);
            } else if (snap !== undefined) {
                setAllCourses([]);
            }
        });

        return () => finalRef.off('value', subscribe);
    }, []);

    useEffect(() => {
        const locRef = db.ref("Assessment_locations");

        const callback = locRef.on("value", (snapshot) => {
            const data = snapshot.val() || {};

            const arr = Object.values(data)
                .map((item, index) => ({
                    id: item?.id || index,
                    name: item?.name || "",
                    count: 0,
                }))
                .filter((item) => item.name)
                .sort((a, b) => a.name.localeCompare(b.name));

            setLocations(arr);
        });

        return () => locRef.off("value", callback);
    }, []);

    function howmany(loc) {
        let count = 0;
        for (let i = 0; i < all_courses.length; i++) {
            if (all_courses[i].location === loc) {
                count++;
            }
        }
        return count;
    }

    useEffect(() => {
        setLocations((prev) =>
            prev.map((loc) => ({
                ...loc,
                count: howmany(loc.name),
            }))
        );
    }, [all_courses]);

    function availableLocationCourses(loc) {
        let temp = [];
        for (let i = 0; i < all_courses.length; i++) {
            if (all_courses[i].location === loc) {
                temp.push(all_courses[i]);
            }
        }
        setCourses([...temp]);
    }

    useEffect(() => {
        if (bookingData.location != null) {
            availableLocationCourses(bookingData.location.name);
        } else {
            setCourses([]);
        }
    }, [bookingData, all_courses]);

    const handleNext = () => setCurrentStep((prev) => prev + 1);

    function handleBack() {
        if (currentStep === 3) {
            setBookingData({
                ...bookingData,
                course: null
            });
            setDiscountCode('');
            setDiscountInfo(null);
            setDiscountError("");
        }
        setCurrentStep((prev) => prev - 1);
    }

    const updateDetails = (e) => {
        setBookingData({
            ...bookingData,
            details: { ...bookingData.details, [e.target.name]: e.target.value }
        });
    };

    function fakeValidateDiscount() {
        if (bookingData.course.discountCode === discountCode) {
            return { valid: true, value: bookingData.course.discountPercentage };
        } else {
            return { valid: false };
        }
    }

    const applyDiscountCode = async () => {
        if (!discountCode.trim()) return;

        setIsApplyingDiscount(true);
        setDiscountError("");
        setDiscountInfo(null);

        try {
            const response = fakeValidateDiscount(discountCode);

            if (!response.valid) {
                setDiscountError("Invalid or expired discount code");
                return;
            }

            setDiscountInfo(response);
        } catch (err) {
            setDiscountError("Something went wrong. Try again.");
        } finally {
            setIsApplyingDiscount(false);
        }
    };

    const UserDetailsLoading = () => {
        return (
            <div className="min-h-screen bg-black text-white selection:bg-[#FAB614] selection:text-black font-sans">
                <wc-toast></wc-toast>
                <Navbar selectedMenu='Professional' />

                <div className="container mx-auto px-4 pt-32 pb-20">
                    <div className="min-h-[60vh] flex items-center justify-center">
                        <div className="max-w-md w-full text-center bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 shadow-xl">
                            <div className="flex justify-center mb-6">
                                <Loader2
                                    size={48}
                                    className="text-[#FAB614] animate-spin"
                                />
                            </div>

                            <h1 className="text-2xl font-bold text-white mb-3">
                                Loading your details
                            </h1>

                            <p className="text-gray-400 leading-relaxed mb-6">
                                Please wait while we securely fetch your assessment details.
                            </p>

                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                <Lock size={16} className="text-[#FAB614]" />
                                Secure session verification
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    };

    const StripePaymentWaiting = () => {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black px-4">
                <div className="max-w-md w-full text-center bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 shadow-xl">
                    <div className="flex justify-center mb-6">
                        <Loader2
                            size={48}
                            className="text-[#FAB614] animate-spin"
                        />
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-3">
                        Redirecting to Secure Payment
                    </h1>

                    <p className="text-gray-400 leading-relaxed mb-6">
                        You’re being securely redirected to Stripe to complete your payment.
                        <br />
                        Please do not refresh or close this page.
                    </p>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Lock size={16} className="text-[#FAB614]" />
                        Secured by Stripe
                    </div>
                </div>
            </div>
        );
    };

    const renderStep1 = () => (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-xl text-gray-300 mb-2">Select Your Location</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {location_arr.map((loc) => {
                    const isDisabled = loc.count === 0;
                    const isSelected = bookingData.location?.id === loc.id;

                    return (
                        <button
                            key={loc.id}
                            disabled={isDisabled}
                            onClick={() => {
                                if (!isDisabled) {
                                    setBookingData({ ...bookingData, location: loc });
                                }
                            }}
                            className={`
                                text-left p-6 rounded-xl border transition-all duration-300
                                ${isDisabled
                                    ? 'opacity-40 cursor-not-allowed bg-[#1A1A1A] border-white/10'
                                    : isSelected
                                        ? 'bg-[#FAB614] border-[#FAB614] text-black'
                                        : 'bg-[#1A1A1A] border-white/10 text-white hover:border-[#FAB614]/50'
                                }
                            `}
                        >
                            <h3 className="text-lg font-bold mb-1">
                                {loc.name}
                            </h3>

                            <p
                                className={`text-sm ${isSelected ? 'text-black/80' : 'text-gray-400'
                                    }`}
                            >
                                {loc.count} courses available
                            </p>
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-center">
                <button
                    onClick={handleNext}
                    disabled={!bookingData.location}
                    className="bg-[#FAB614] text-black font-bold px-12 py-4 rounded-full hover:bg-[#E5970C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg cursor-pointer"
                >
                    Continue
                </button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-xl text-gray-300">
                    Final Assessment in {bookingData.location?.name || 'London'}
                </h2>
            </div>

            <div className="space-y-6">
                {courses.map((course) => {
                    const isFull = course.total_applied >= course.capacity;

                    return (
                        <div
                            key={course.id}
                            className={`bg-[#1A1A1A] border rounded-xl p-6 md:p-8 transition-all duration-300 shadow-lg
                            ${isFull ? "border-red-500/30 opacity-80" : "border-white/10 hover:border-[#FAB614]/30"}
                        `}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                        {moment(new Date(Number(course.date))).format("DD MMM, YYYY")}
                                    </h3>
                                </div>
                            </div>

                            <div className="space-y-2 mb-5">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <BookOpen size={20} className="text-[#FAB614]" />
                                    <span className="text-xl font-bold text-white mb-1">
                                        {course.courseName}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                    <Clock size={20} className="text-[#FAB614]" />
                                    <span className="text-lg">
                                        {course.startTime} - {course.endTime}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                    <MapPin size={20} className="text-[#FAB614]" />
                                    <span className="text-lg">{course.venue}</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                    <User size={20} className="text-[#FAB614]" />
                                    <span className="text-lg">
                                        Instructor: {course.instructor}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Armchair
                                        size={20}
                                        className={isFull ? "text-red-400" : "text-[#FAB614]"}
                                    />

                                    {!isFull ? (
                                        <span className="text-lg text-green-400 font-medium">
                                            Availability: {course.total_applied}/{course.capacity} enrolled
                                        </span>
                                    ) : (
                                        <span className="text-lg text-red-400 font-semibold">
                                            Sold Out
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                disabled={isFull}
                                onClick={() => {
                                    if (isFull) return;
                                    setBookingData({ ...bookingData, course });
                                    handleNext();
                                }}
                                className={`
                                    w-full py-2 rounded-full text-lg font-semibold transition-all
                                    ${isFull
                                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                        : "bg-[#FAB614] text-black hover:bg-[#E5970C] cursor-pointer shadow-[0_4px_14px_rgba(250,182,20,0.39)] hover:-translate-y-0.5"
                                    }
                                `}
                            >
                                {isFull ? "Course Full" : "Select This Course"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderStep3 = () => {
        const basePrice = Number(bookingData.course?.price || 0);

        let finalPrice = basePrice;
        if (discountInfo != null) {
            finalPrice = basePrice - (basePrice * discountInfo.value) / 100;
        }

        return (
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-xl text-gray-300">Booking Details</h2>
                </div>

                <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 block">
                                Selected Course
                            </span>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-white">
                                    <BookOpen size={14} className="text-[#FAB614]" />
                                    {bookingData.course?.courseName}
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <Clock size={14} className="text-[#FAB614]" />
                                    {moment(new Date(Number(bookingData.course?.date))).format("ddd DD MMM, YYYY")} •{" "}
                                    {bookingData.course.startTime} - {bookingData.course.endTime}
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <MapPin size={14} className="text-[#FAB614]" />
                                    {bookingData.course?.venue}, {bookingData.course?.location}
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <User size={14} className="text-[#FAB614]" />
                                    {bookingData.course?.instructor}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-300">First Name *</label>
                        <input value={bookingData.details.firstName} type="text" name="firstName" placeholder="First Name" className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none" onChange={updateDetails} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-300">Last Name *</label>
                        <input value={bookingData.details.lastName} type="text" name="lastName" placeholder="Last Name" className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none" onChange={updateDetails} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-300">Email Address *</label>
                        <input value={bookingData.details.email} type="email" name="email" placeholder="Enter your Email" className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none" onChange={updateDetails} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-300">Phone Number *</label>
                        <input type="tel" name="phone" placeholder="Enter your phone number" className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none" onChange={updateDetails} />
                    </div>

                    <div className="space-y-2 md:col-span-1">
                        <label className="text-sm text-gray-300">Company/Production *</label>
                        <input type="text" name="company" placeholder="Enter your company or production name" className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none" onChange={updateDetails} />
                    </div>

                    <div className="space-y-2 md:col-span-1">
                        <label className="text-sm text-gray-300">Role in Camera Department *</label>
                        <select name="role" className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none cursor-pointer" onChange={updateDetails} >
                            <option value="">Select your role</option>
                            <option value="Trainee">Trainee</option>
                            <option value="Professional Crew">Professional Crew</option>
                        </select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm text-gray-300">Additional Notes</label>
                        <textarea name="notes" placeholder="Any additional information or special requirements (max 500 characters)" className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none h-32 resize-none" onChange={updateDetails}></textarea>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={gatherUserDetails}
                        className="bg-[#FAB614] text-black font-bold px-12 py-4 rounded-full hover:bg-[#E5970C] transition-colors text-lg cursor-pointer"
                    >
                        Submit Booking
                    </button>
                </div>
            </div>
        );
    };

    const renderStep5 = () => (
        <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-[#FAB614] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(250,182,20,0.4)]">
                <Check size={48} className="text-black" strokeWidth={4} />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Thank you for booking</h2>
            <p className="text-gray-400 text-lg mb-12">We will reach out to you shortly.</p>

            <Link
                to="/"
                className="bg-[#FAB614] text-black font-bold px-16 py-4 rounded-full hover:bg-[#E5970C] transition-colors cursor-pointer"
            >
                Home
            </Link>
        </div>
    );

    if (userLoading) {
        return <UserDetailsLoading />;
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#FAB614] selection:text-black font-sans">
            <wc-toast></wc-toast>
            <Navbar selectedMenu='Professional' />

            <div className="container mx-auto px-4 pt-32 pb-20">
                {currentStep <= 5 && (
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={currentStep === 1 ? () => { } : handleBack}
                            className={`flex items-center gap-2 text-white hover:text-[#FAB614] transition-colors cursor-pointer ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                        >
                            <ChevronLeft size={20} />
                            <span className="font-medium">Back</span>
                        </button>

                        <h1 className="text-3xl md:text-4xl font-bold text-white absolute left-1/2 -translate-x-1/2">
                            {bookingData.details.firstName}, <span className="text-[#FAB614]">Book Your Final Assessment</span>
                        </h1>
                        <div className="w-16"></div>
                    </div>
                )}

                <div className="mt-12">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep5()}
                </div>
            </div>

            <Footer />
        </div>
    );
};

const CheckCircle2 = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

export default FinalAssessment;