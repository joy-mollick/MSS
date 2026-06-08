import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  MapPin,
  Clock,
  Calendar,
  User,
  Check,
  Armchair,
  BookOpen,
  Lock,
  Loader2,
  Building2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';
import { db } from '../config';
import { toast } from 'wc-toast';

const formatDate = (value, formatType = 'full') => {
  const date = new Date(Number(value));
  if (Number.isNaN(date.getTime())) return '';

  if (formatType === 'step2') {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  if (formatType === 'step3') {
    const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(date);
    const day = new Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format(date);
    const month = new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date);
    const year = new Intl.DateTimeFormat('en-GB', { year: 'numeric' }).format(date);
    return `${weekday} ${day} ${month}, ${year}`;
  }

  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const BookingPage = () => {
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
      notes: '',
    },
  });

  const [all_courses, setAllCourses] = useState([]);
  const [location_arr, setLocations] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountInfo, setDiscountInfo] = useState(null);
  const [discountError, setDiscountError] = useState('');
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const handleBack = useCallback(() => {
    if (currentStep === 3) {
      setBookingData((prev) => ({
        ...prev,
        course: null,
      }));
      setDiscountCode('');
      setDiscountInfo(null);
      setDiscountError('');
    }
    setCurrentStep((prev) => prev - 1);
  }, [currentStep]);

  const updateDetails = useCallback((e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value,
      },
    }));
  }, []);

  const gatherUserDetails = useCallback(() => {
    if (
      bookingData.details.role !== '' &&
      bookingData.details.company !== '' &&
      bookingData.details.firstName !== '' &&
      bookingData.details.lastName !== '' &&
      bookingData.details.email !== '' &&
      bookingData.details.phone !== ''
    ) {
      handleNext();
    } else {
      toast('Missing information');
    }
  }, [bookingData.details, handleNext]);

  const fakeValidateDiscount = useCallback(() => {
    if (bookingData.course.discountCode === discountCode) {
      return { valid: true, value: bookingData.course.discountPercentage };
    } else {
      return { valid: false };
    }
  }, [bookingData.course, discountCode]);

  const applyDiscountCode = useCallback(async () => {
    if (!discountCode.trim()) return;

    setIsApplyingDiscount(true);
    setDiscountError('');
    setDiscountInfo(null);

    try {
      const response = fakeValidateDiscount(discountCode);

      if (!response.valid) {
        setDiscountError('Invalid or expired discount code');
        return;
      }

      setDiscountInfo(response);
    } catch (err) {
      setDiscountError('Something went wrong. Try again.');
    } finally {
      setIsApplyingDiscount(false);
    }
  }, [discountCode, fakeValidateDiscount]);

  const payByStripe = useCallback(
    async (amount) => {
      const booking_obj = {
        ...bookingData.details,
        course_id: bookingData.course.id,
        booking_id: new Date().getTime(),
        paid: false,
        pay: amount,
      };

      const params = new URLSearchParams({
        buyerName: `${bookingData.details.firstName} ${bookingData.details.lastName}`,
        amount: String(amount),
        course_name: bookingData.course.courseName,
        email: booking_obj.email,
        courseId: String(bookingData.course.id),
        bookingId: String(booking_obj.booking_id),
      });

      let response = await fetch(
        `https://app-p4r2la7ira-uc.a.run.app/create-checkout-session?${params.toString()}`
      );

      try {
        response = await response.json();

        if (response.error) {
          toast('Something went wrong!');
        } else {
          response = response.url;

          await db
            .ref('CourseBooking')
            .child(String(booking_obj.course_id))
            .child(String(booking_obj.booking_id))
            .set(booking_obj);

          handleNext();

          setTimeout(() => {
            window.location.href = response;
          }, 1500);
        }
      } catch {
        toast('Something went wrong!');
      }
    },
    [bookingData, handleNext]
  );

  useEffect(() => {
    const subscribe = db.ref('Course').on('value', async (snap) => {
      if (snap !== undefined && snap.val() != null) {
        const arr = Object.values(snap.val());

        for (let i = 0; i < arr.length; i++) {
          const val = (
            await db
              .ref('CourseBooking')
              .child(String(arr[i].id))
              .orderByChild('paid')
              .equalTo(true)
              .once('value')
          ).numChildren();

          arr[i].total_applied = val;
        }

        setAllCourses([...arr]);
      } else if (snap !== undefined) {
        setAllCourses([]);
      }
    });

    return () => subscribe();
  }, []);

  useEffect(() => {
    const locRef = db.ref('Training_locations');

    const callback = locRef.on('value', (snapshot) => {
      const data = snapshot.val() || {};

      const arr = Object.values(data)
        .map((item, index) => ({
          id:
            item?.id ||
            item?.name?.toLowerCase?.().replace(/\s+/g, '-') ||
            `loc-${index}`,
          name: item?.name || '',
          count: 0,
        }))
        .filter((item) => item.name)
        .sort((a, b) => a.name.localeCompare(b.name));

      setLocations(arr);
    });

    return () => locRef.off('value', callback);
  }, []);

  const howmany = useCallback(
    (loc) => {
      let count = 0;
      for (let i = 0; i < all_courses.length; i++) {
        if (all_courses[i].location === loc) {
          count++;
        }
      }
      return count;
    },
    [all_courses]
  );

  useEffect(() => {
    setLocations((prev) => {
      const temp = prev.map((loc) => ({
        ...loc,
        count: howmany(loc.name),
      }));

      temp.sort((a, b) => a.name.localeCompare(b.name));
      return temp;
    });
  }, [all_courses, howmany]);

  const courses = useMemo(() => {
    if (bookingData.location == null) return [];

    const temp = [];
    for (let i = 0; i < all_courses.length; i++) {
      if (all_courses[i].location === bookingData.location.name) {
        temp.push(all_courses[i]);
      }
    }
    return temp;
  }, [bookingData.location, all_courses]);

  const basePrice = useMemo(() => {
    return Number(bookingData.course?.price || 0);
  }, [bookingData.course]);

  const finalPrice = useMemo(() => {
    let price = basePrice;
    if (discountInfo != null) {
      price = basePrice - (basePrice * discountInfo.value) / 100;
    }
    return price;
  }, [basePrice, discountInfo]);

  const discountAmount = useMemo(() => {
    const fee = bookingData.course?.price || 0;
    return discountInfo == null ? 0 : (fee * discountInfo.value) / 100;
  }, [bookingData.course, discountInfo]);

  const total = useMemo(() => {
    const fee = bookingData.course?.price || 0;
    return fee - discountAmount;
  }, [bookingData.course, discountAmount]);

  const StripePaymentWaiting = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="max-w-md w-full text-center bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <Loader2 size={48} className="text-[#FAB614] animate-spin" />
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
        <h2 className="text-xl text-gray-300 mb-2">Select Your Region</h2>
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
                  setBookingData((prev) => ({
                    ...prev,
                    location: loc,
                  }));
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
              <h3 className="text-lg font-bold mb-1">{loc.name}</h3>

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
          Training Courses in {bookingData.location?.name || 'London'}
        </h2>
      </div>

      <div className="space-y-6">
        {courses.map((course) => {
          const isFull = course.total_applied >= course.capacity;

          return (
            <div
              key={course.id}
              className={`bg-[#1A1A1A] border rounded-xl p-6 md:p-8 transition-all duration-300 shadow-lg
                ${isFull
                  ? 'border-red-500/30 opacity-80'
                  : 'border-white/10 hover:border-[#FAB614]/30'
                }
              `}
            >
              <div className="flex justify-between items-start mb-4">

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {formatDate(course.date, 'step2')}
                  </h3>

                  {course.city ? (
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#FAB614]/35 bg-gradient-to-r from-[#FAB614]/20 to-[#FAB614]/5 px-3.5 py-1.5 text-sm font-semibold text-[#FAB614] shadow-[0_0_18px_rgba(250,182,20,0.12)]">
                      <MapPin size={15} className="text-[#FAB614]" />
                      <span className="text-[#FAB614]">{course.city}</span>
                    </div>
                  ) : null}
                </div>

                <div className="text-right">
                  <span className="block text-2xl font-bold text-[#FAB614]">
                    £{course.price}
                  </span>
                  <span className="block text-sm text-gray-400">Per Person</span>
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
                   <Building2 size={20} className="text-[#FAB614]" />
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
                    className={isFull ? 'text-red-400' : 'text-[#FAB614]'}
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
                  setBookingData((prev) => ({
                    ...prev,
                    course,
                  }));
                  handleNext();
                }}
                className={`
                  w-full py-2 rounded-full text-lg font-semibold transition-all
                  ${isFull
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-[#FAB614] text-black hover:bg-[#E5970C] cursor-pointer shadow-[0_4px_14px_rgba(250,182,20,0.39)] hover:-translate-y-0.5'
                  }
                `}
              >
                {isFull ? 'Course Full' : 'Select This Course'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep3 = () => {
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
                  {formatDate(bookingData.course?.date, 'step3')} •{' '}
                  {bookingData.course?.startTime} - {bookingData.course?.endTime}
                </div>
                <div className="flex items-center gap-2 text-white">
                  <MapPin size={14} className="text-[#FAB614]" />
                  {bookingData.course?.venue},{bookingData.course?.city} {(bookingData.course.city!=undefined && bookingData.course.city!='')?',':''} {bookingData.course?.location}
                </div>
                <div className="flex items-center gap-2 text-white">
                  <User size={14} className="text-[#FAB614]" />
                  {bookingData.course?.instructor}
                </div>
              </div>
            </div>

            <div className="text-right mt-4 md:mt-0">
              {discountInfo && (
                <span className="block text-sm text-gray-400 line-through">
                  £{basePrice}
                </span>
              )}
              <span className="text-[#FAB614] font-bold text-2xl">
                £{finalPrice.toFixed(2)}
              </span>
              <span className="block text-xs text-gray-400">Per Person</span>
            </div>
          </div>
        </div>

        {bookingData.course.discountCode !== '' ? (
          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 mb-8">
            <label className="text-sm text-gray-300 mb-2 block">
              Discount Code
            </label>

            <div className="flex gap-3">
              <input
                type="text"
                value={discountCode}
                placeholder="Enter discount code"
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                className="flex-1 bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none"
              />

              <button
                onClick={applyDiscountCode}
                className="bg-[#FAB614] text-black font-semibold px-6 rounded-lg hover:bg-[#E5970C] transition"
              >
                Apply
              </button>
            </div>

            {discountError && (
              <p className="text-red-400 mt-2 text-sm">{discountError}</p>
            )}

            {discountInfo && (
              <p className="text-green-400 mt-2 text-sm">
                Discount applied ({discountInfo.value}% off)
              </p>
            )}
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={bookingData.details.firstName}
              placeholder="First Name"
              className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none"
              onChange={updateDetails}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={bookingData.details.lastName}
              placeholder="Last Name"
              className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none"
              onChange={updateDetails}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Email Address *</label>
            <input
              type="email"
              name="email"
              value={bookingData.details.email}
              placeholder="Enter your Email"
              className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none"
              onChange={updateDetails}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={bookingData.details.phone}
              placeholder="Enter your phone number"
              className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none"
              onChange={updateDetails}
            />
          </div>

          <div className="space-y-2 md:col-span-1">
            <label className="text-sm text-gray-300">Company/Production *</label>
            <input
              type="text"
              name="company"
              value={bookingData.details.company}
              placeholder="Enter your company or production name"
              className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none"
              onChange={updateDetails}
            />
          </div>

          <div className="space-y-2 md:col-span-1">
            <label className="text-sm text-gray-300">Role in Camera Department *</label>
            <select
              name="role"
              value={bookingData.details.role}
              className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none cursor-pointer"
              onChange={updateDetails}
            >
              <option value="">Select your role</option>
              <option value="Trainee">Trainee</option>
              <option value="Professional Crew">Professional Crew</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-gray-300">Additional Notes</label>
            <textarea
              name="notes"
              value={bookingData.details.notes}
              placeholder="Any additional information or special requirements (max 500 characters)"
              className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none h-32 resize-none"
              onChange={updateDetails}
            ></textarea>
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

  const renderStep4 = () => {
    const fee = bookingData.course?.price || 0;

    return (
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-1 gap-8">
        <div className="bg-[#111] border border-white/10 rounded-xl p-8 h-fit">
          <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

          <div className="bg-[#1A1A1A] rounded-lg p-4 mb-6">
            <h4 className="text-[#FAB614] font-bold mb-2">First Aid Training</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <BookOpen size={14} /> {bookingData.course?.courseName}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} /> {formatDate(bookingData.course?.date)} •{' '}
                {bookingData.course?.startTime} - {bookingData.course?.endTime}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                {bookingData.course?.venue}, {bookingData.course?.location}
              </div>
              <div className="flex items-center gap-2">
                <User size={14} /> Instructor: {bookingData.course?.instructor}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-white font-bold mb-3">Attendee Details</h4>
            <div className="bg-[#1A1A1A] rounded-lg p-4 space-y-1 text-sm text-gray-400">
              <p>
                Name:{' '}
                <span className="text-white">
                  {bookingData.details.firstName} {bookingData.details.lastName}
                </span>
              </p>
              <p>
                Email: <span className="text-white">{bookingData.details.email}</span>
              </p>
              <p>
                Phone: <span className="text-white">{bookingData.details.phone}</span>
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 mb-6 space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Course Fee</span>
              <span>£{fee.toFixed(2)}</span>
            </div>

            {discountInfo && (
              <div className="flex justify-between text-gray-300">
                <span>Discount Code ({discountInfo.value}%)</span>
                <span>- £{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#FAB614] font-bold text-xl mt-4 pt-4 border-t border-white/10">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => payByStripe(Number(total.toFixed(2)))}
            className="w-full bg-[#FAB614] text-black font-bold py-4 rounded-lg hover:bg-[#E5970C] transition-colors mb-4 cursor-pointer"
          >
            Pay £{total.toFixed(2)}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-green-500">
            <CheckCircle2 size={12} />
            <span>Your payment information is secure and encrypted</span>
          </div>
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

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FAB614] selection:text-black font-sans">
      <wc-toast></wc-toast>
      <Navbar selectedMenu="Professional Development" />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {currentStep <= 5 && (
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={currentStep === 1 ? () => { } : handleBack}
              className={`flex items-center gap-2 text-white hover:text-[#FAB614] transition-colors cursor-pointer ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''
                }`}
            >
              <ChevronLeft size={20} />
              <span className="font-medium">Back</span>
            </button>

            <h1 className="text-3xl md:text-4xl font-bold text-white absolute left-1/2 -translate-x-1/2">
              Book <span className="text-[#FAB614]">First Aid</span> Training
            </h1>

            <div className="w-16"></div>
          </div>
        )}

        <div className="mt-12">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && <StripePaymentWaiting />}
          {currentStep === 6 && renderStep5()}
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

export default BookingPage;