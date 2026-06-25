// ========================= Before return =========================

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  MailCheck,
  RefreshCcw,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppDownloadStrip from "../components/common/AppDownloadStrip";
import NiceModal from "../components/common/NiceModal";

const VerifyEmailPage = () => {


  const [niceModal, setNiceModal] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
    onPrimary: null,
  });

  const showNiceModal = ({ type = "info", title, message, onPrimary }) => {
    setNiceModal({
      open: true,
      type,
      title,
      message,
      onPrimary: onPrimary || null,
    });
  };

  const closeNiceModal = () => {
    setNiceModal({
      open: false,
      type: "info",
      title: "",
      message: "",
      onPrimary: null,
    });
  };


  const navigate = useNavigate();
  const location = useLocation();

  const pendingUser = location.state?.pendingUser;

  const email = useMemo(() => {
    return pendingUser?.email || "";
  }, [pendingUser]);

  const [code, setCode] = useState("");
  const [sending, setSending] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [sentCode, setSentCode] = useState("1234");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSending(false);
      setSentCode("1234");
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const resendCode = () => {
    setSending(true);

    setTimeout(() => {
      setSending(false);
      setSentCode("1234");

      showNiceModal({
        type: "info",
        title: "Code Resent",
        message: "A new verification code has been sent to your email.",
      });

    }, 900);
  };

  const verifyCode = () => {
    if (!code.trim()) {
      showNiceModal({
        type: "warning",
        title: "Code Required",
        message: "Please enter verification code.",
      });
      return;
    }

    setVerifying(true);

    setTimeout(() => {
      setVerifying(false);

      if (code.trim() === sentCode) {
        setVerified(true);

        setTimeout(() => {

          showNiceModal({
            type: "success",
            title: "Email Verified",
            message: "Account verified. Firebase signup will be connected later.",
            onPrimary: () => {
              closeNiceModal();
              navigate("/login");
            },
          });

        }, 1200);

        return;
      }

      showNiceModal({
        type: "error",
        title: "Invalid Code",
        message: "Invalid verification code. For now use 1234.",
      });

    }, 900);
  };

  return (
    // ========================= Inside return =========================

    <div className="verifyEmailPage">
      <section className="verifyEmailHero">
        <div className="verifyEmailOverlay" />

        <div className="nwlbContainer verifyEmailCenter">
          <button className="verifyBackBtn" onClick={() => navigate("/signup")}>
            <ArrowLeft size={17} />
            Back to Sign Up
          </button>

          <div className="verifyEmailCard">
            <div className={verified ? "verifyBigIcon verified" : "verifyBigIcon"}>
              {verified ? <CheckCircle2 size={42} /> : <MailCheck size={42} />}
            </div>

            <h1>{verified ? "Email Verified" : "Verify Your Email"}</h1>

            <p>
              {email ? (
                <>
                  We sent a verification code to <strong>{email}</strong>.
                </>
              ) : (
                <>
                  Please return to sign up and enter your email address first.
                </>
              )}
            </p>

            {!email ? (
              <Link className="verifyMainLink" to="/signup">
                Go to Sign Up
              </Link>
            ) : (
              <>
                <div className="otpBoxes">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter code"
                    maxLength={6}
                  />
                </div>

                <button
                  className="verifyMainBtn"
                  onClick={verifyCode}
                  disabled={verifying || verified}
                >
                  {verifying ? (
                    <Loader2 className="spinIcon" size={19} />
                  ) : verified ? (
                    "VERIFIED"
                  ) : (
                    "VERIFY EMAIL"
                  )}
                </button>

                <button
                  className="resendBtn"
                  onClick={resendCode}
                  disabled={sending || verified}
                >
                  {sending ? (
                    <Loader2 className="spinIcon" size={15} />
                  ) : (
                    <RefreshCcw size={15} />
                  )}
                  {sending ? "Sending Code..." : "Resend Code"}
                </button>

                <small>Mock verification code: 1234</small>
              </>
            )}
          </div>
        </div>
      </section>

      <AppDownloadStrip />

      <NiceModal
        open={niceModal.open}
        type={niceModal.type}
        title={niceModal.title}
        message={niceModal.message}
        primaryText="OK"
        onClose={closeNiceModal}
        onPrimary={niceModal.onPrimary || closeNiceModal}
      />

    </div>
  );
};

export default VerifyEmailPage;