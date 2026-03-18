
import './App.css'
import React, { useEffect, useState } from 'react'
import { HomePage } from './pages/HomePage';
import { HashRouter  as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AncillaryLearningPage from './pages/AncillaryLearningPage';
import PatronsPage from './pages/PatronsPage';
import NewsPage from './pages/NewsPage';
import FAQsPage from './pages/FAQsPage';
import TraineeDatabasePage from './pages/TraineesDatabasePage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import { auth } from './config';
import ConfirmationPage from './pages/ConfirmationPage';
import DonationPage from './pages/DonationPage';
import FinalAssessment from './pages/FinalAssessment';

function App() {

  const [ready, setReady] = useState(false)

  useEffect(() => {
    auth.signInWithEmailAndPassword('n.joy@boomsoftware.co.uk', '2103199j').then(() => {
      setReady(true)
    }).catch((e) => {
      console.log('E ', e)
    })
  }, [])


  return (
    ready?<>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/Confirmation' element={<ConfirmationPage/>}/>
          <Route path='/ancillary-learning' element={<AncillaryLearningPage />} />
          <Route path='/patrons' element={<PatronsPage />} />
          <Route path='/donation' element={<DonationPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/faq' element={<FAQsPage />} />
          <Route path='/trainees' element={<TraineeDatabasePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/booking' element={<BookingPage />} />
          <Route path='/privacypolicy' element={<PrivacyPage />} />
          <Route path='/termsandconditions' element={<TermsPage />} />
          <Route path='/finalAssessment' element={<FinalAssessment />} />

           <Route path='*' element={<HomePage />} />
        </Routes>
      </Router>
    </>:null
  )
}

export default App
