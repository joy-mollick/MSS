
import './App.css'
import React from 'react'
import { HomePage } from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AncillaryLearningPage from './pages/AncillaryLearningPage';
import PatronsPage from './pages/PatronsPage';
import NewsPage from './pages/NewsPage';
import FAQsPage from './pages/FAQsPage';
import TraineeDatabasePage from './pages/TraineesDatabasePage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';

function App() {

  return (
    <>
    
    <Router basename="/CineCertifiedWebsite">
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<HomePage />} />
        <Route path='/ancillary-learning' element={<AncillaryLearningPage />} />
        <Route path='/patrons' element={<PatronsPage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/faq' element={<FAQsPage />} />
        <Route path='/trainees' element={<TraineeDatabasePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/booking' element={<BookingPage />} />
        <Route path='/privacy-policy' element={<PrivacyPage />} />
        <Route path='/terms' element={<TermsPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
