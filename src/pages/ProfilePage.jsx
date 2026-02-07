import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  MapPin,
  Briefcase,
  Mail,
  Phone,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';
import { decrypt, decryptPass } from '../Crypto'
// Dummy Avatar Import
import avatar from '@/assets/avatar.png'; // Ensure you have this asset
import blackLogo from '../assets/logos/admin.png';
import { db } from '../config';
import { CvViewer } from '../components/CvViewer';
//import CvViewer from '../components/CvViewer';

const ProfilePage = () => {

  const { state } = useLocation();
  const user = state?.user;

  const [references, setReferences] = useState([])

  useEffect(() => {
    const subscribe = db.ref('Industry_ref').orderByChild('user_id').equalTo(user.id).on('value', (snapshot) => {
      if (snapshot != undefined && snapshot.val() != null) {
        let arr = Object.values(snapshot.val())
        let temp = []
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].verify == true) {
            temp.push(arr[i])
          }
        }
        setReferences([...temp])
      }
      else {
        setReferences([])
      }
    })
    return () => subscribe()
  }, [user])

  const [health_safety, setHealthSafety] = useState(null)
  const [first_aid, setFirstAid] = useState(null)

  useEffect(() => {
    const subscribe = db.ref('Health_and_Safety').child(String(user.id)).on('value', (snap) => {
      if (snap != undefined && snap.val() != null) {
        setHealthSafety(snap.val())
      }
      else {
        setHealthSafety(null)
      }
    })
    return () => subscribe()
  }, [user])

  useEffect(() => {
    const subscribe = db.ref('First_aid_training').child(String(user.id)).on('value', (snap) => {
      if (snap != undefined && snap.val() != null) {
        setFirstAid(snap.val())
      }
      else {
        setFirstAid(null)
      }
    })
    return () => subscribe()
  }, [user])

  const [contract, setContract] = useState(false)
  const [finance, setFinance] = useState(false)

  function quizAnswersContracts() {
    let arr = user.quizAnswers == undefined ? [] : user.quizAnswers
    let correct = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != null && arr[i].correct == true) {
        correct++;
      }
    }
    return correct >= 25
  }

  function quizFinances() {
    let arr = user.quizFinance == undefined ? [] : user.quizFinance
    let correct = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != null && arr[i].correct == true) {
        correct++;
      }
    }
    return correct >= 27
  }

  useEffect(() => {
    let cont = quizAnswersContracts()
    setContract(cont)

    let fiance = quizFinances()
    setFinance(fiance)
  }, [user])

  // --- DATA OBJECT ---
  const traineeProfile = {
    id: "t1",
    name: decrypt(user.First_Name) + ' ' + decrypt(user.Last_Name),
    avatar: user.Image == undefined ? blackLogo : user.Image,
    location: decrypt(user.Region),
    experience: user.Experience,
    trainingProgress: Number(user.overall_progress * 100).toFixed(2),
    loggedDays: user.total_logged_days,
    totalDaysRequired: 200,
    contact: {
      email: decrypt(user.Email),
      phone: decryptPass(user.Number)
    },
    personalInfo: {
      fullName: decrypt(user.First_Name) + ' ' + decrypt(user.Last_Name),
      currentRole: decrypt(user.Role),
      department: decrypt(user.department),
      cvFileName: decrypt(user.CV_name),
      cvSize: "2.4 MB",
      Cv:user.Cv
    },
    skills: [
      { name: "First Aid Training", completed: first_aid == null ? false : true },
      { name: "Contracts & Negotiations", completed: contract },
      { name: "Managing Finances", completed: finance },
      { name: "Health and Safety", completed: health_safety == null ? false : true }
    ],
    references: [
      {
        name: "James Thompson",
        role: "Focus Puller",
        quote: "John has demonstrated exceptional understanding of camera systems and networking concepts. His attention to detail and problem-solving abilities make him a valuable asset to any production team. Highly recommend for sign-off."
      },
      {
        name: "Sarah Jenkins", // Changed name slightly to simulate variety, though screenshot had duplicate
        role: "Focus Puller",
        quote: "John has demonstrated exceptional understanding of camera systems and networking concepts. His attention to detail and problem-solving abilities make him a valuable asset to any production team. Highly recommend for sign-off."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FAB614] selection:text-black">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
      </div>
      <Navbar selectedMenu="Database" />

      <div className="container mx-auto px-4 pt-32 pb-20 max-w-6xl">

        {/* TOP HEADER CARD */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 mb-8">

          {/* Back Link */}
          <Link to="/trainees" className="inline-flex items-center gap-2 text-white hover:text-[#FAB614] mb-8 transition-colors">
            <ChevronLeft size={20} />
            <span className="font-medium">Back</span>
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="shrink-0">
              <img
                src={traineeProfile.avatar}
                alt={traineeProfile.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#FAB614]/20"
              />
            </div>

            {/* Main Info */}
            <div className="flex-grow w-full">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-white mb-2">{traineeProfile.name}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-[#FAB614]" />
                    <span>Location: <span className="text-white">{traineeProfile.location}</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={16} className="text-[#FAB614]" />
                    <span>Experience: <span className="text-white">{traineeProfile.experience}</span></span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/10 w-full mb-6"></div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-[#FAB614] font-medium mb-2">
                    <span>Training Progress</span>
                    <span>{traineeProfile.trainingProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full">
                    <div
                      className="h-full bg-[#FAB614] rounded-full"
                      style={{ width: `${traineeProfile.trainingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Days Logged: {traineeProfile.loggedDays}/{traineeProfile.totalDaysRequired}
                  </p>
                </div>

                {/* Logged Days Big Number */}
                <div className='ml-5'>
                  <span className="text-[#FAB614] font-medium block mb-1">Logged Days</span>
                  <span className="text-4xl font-bold text-white">{traineeProfile.loggedDays}</span>
                </div>

                {/* Contact Info */}
                <div>
                  <span className="text-[#FAB614] font-medium block mb-2">Contact Info</span>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      <a href={`mailto:${traineeProfile.contact.email}`} className="hover:text-white transition-colors">{traineeProfile.contact.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      <span>{traineeProfile.contact.phone}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* PERSONAL INFORMATION */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 h-full">
            <h3 className="text-[#FAB614] font-bold text-lg mb-6">Personal Information</h3>

            <div className="space-y-6">
              <div>
                <span className="block text-gray-500 text-sm mb-1">Full Name:</span>
                <span className="text-white font-medium">{traineeProfile.personalInfo.fullName}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-sm mb-1">Current Role:</span>
                <span className="text-white font-medium">{traineeProfile.personalInfo.currentRole}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-sm mb-1">Department:</span>
                <span className="text-white font-medium">{traineeProfile.personalInfo.department}</span>
              </div>

          
              <CvViewer
                traineeProfile={traineeProfile}
                cvUrl={traineeProfile.personalInfo.Cv}
              />


            </div>
          </div>

          {/* SKILLS DEVELOPMENT */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 h-full">
            <h3 className="text-[#FAB614] font-bold text-lg mb-6">Skills Development</h3>
            <div className="space-y-3">
              {traineeProfile.skills.map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between bg-[#151515] border border-white/5 rounded-lg px-4 py-4">
                  <span className="text-white font-medium">{skill.name}</span>
                  {skill.completed && (
                    <CheckCircle2 size={20} className="text-[#FAB614]" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>


        {/* REFERENCES */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 mb-12">
          <h3 className="text-[#FAB614] font-bold text-lg mb-6">References</h3>
          <div className="space-y-4">
            {references.map((ref, idx) => (
              <div key={idx} className="bg-[#151515] border border-white/5 rounded-xl p-6">
                <h4 className="text-white font-bold mb-1">{ref.first + ' ' + ref.last}, <span className="text-gray-400 font-normal">{ref.role}</span></h4>
                <p className="text-gray-400 text-sm leading-relaxed italic">"{ref.reference}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ACTION */}
        <div className="flex justify-center">
          <Link
            to="/trainees"
            className="bg-[#FAB614] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#E5970C] transition-colors shadow-lg hover:shadow-[#FAB614]/20"
          >
            Back To Database
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;