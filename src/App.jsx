// ========================= Before return =========================

import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import ScrollToTop from "./components/Layout/ScrollToTop";

const HomePage = lazy(() => import("./pages/HomePage"));
const ResultScreen = lazy(() => import("./pages/ResultScreen"));
const ListingDetailsPage = lazy(() => import("./pages/ListingDetailsPage"));
const FavouritesPage = lazy(() => import("./pages/FavouritesPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const EntertainmentDetailsPage = lazy(() =>
  import("./pages/EntertainmentDetailsPage")
);
const ContactPage = lazy(() => import("./pages/ContactPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));
const QuotePage = lazy(() => import("./pages/QuotePage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsConditionsPage = lazy(() => import("./pages/TermsConditionsPage"));

const AccountDashboardPage = lazy(() => import("./pages/AccountDashboardPage"));
const AddEditListingPage = lazy(() => import("./pages/AddEditListingPage"));
const QuotesPage = lazy(() => import("./pages/QuotesPage"));

const PageLoader = () => {
  return (
    <div className="pageLoader">
      <div className="loaderLogo">NWLB</div>
      <div className="loaderLine" />
      <p>Loading North West Local Business...</p>
    </div>
  );
};

function App() {
  return (
    // ========================= Inside return =========================

    <Router>
      <ScrollToTop />

      <div className="appRoot">
        <Header />

        <main className="appMain">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/results" element={<ResultScreen />} />

              <Route path="/listing/:id" element={<ListingDetailsPage />} />

              <Route path="/favourites" element={<FavouritesPage />} />

              <Route path="/news" element={<NewsPage />} />

              <Route
                path="/news/:id"
                element={<EntertainmentDetailsPage />}
              />

              <Route path="/contact" element={<ContactPage />} />

              <Route path="/login" element={<LoginPage />} />

              <Route path="/signup" element={<SignUpPage />} />

              <Route path="/verify-email" element={<VerifyEmailPage />} />

              <Route path="/quote/:id" element={<QuotePage />} />

              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

              <Route
                path="/terms-conditions"
                element={<TermsConditionsPage />}
              />

              <Route path="/account" element={<AccountDashboardPage />} />

              <Route path="/add-listing" element={<AddEditListingPage mode="add" />} />

              <Route path="/edit-listing/:id" element={<AddEditListingPage mode="edit" />} />

              <Route path="/quotes" element={<QuotesPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;