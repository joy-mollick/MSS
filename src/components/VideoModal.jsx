import React, { useRef, useEffect } from "react";
import ModalWrapper from "./ModalWrapper.jsx";

export const VideoModal = ({
  isOpen,
  onClose,
  videoUrl = "https://firebasestorage.googleapis.com/v0/b/cinecertified-59a1f.firebasestorage.app/o/Induction_Final_1.75mbps.mp4?alt=media&token=5ff75312-5196-475d-9595-f3b89c427d1b",
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div style={videoStyles.container}>
        <button style={videoStyles.close} onClick={onClose}>
          ✕
        </button>

        <video
          ref={videoRef}
          src={videoUrl}
          controls
          playsInline
          style={videoStyles.video}
        />
      </div>
    </ModalWrapper>
  );
};

const videoStyles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  video: {
    width: "100%",
    height: "auto",
    maxHeight: "85vh", // SAFE FOR MOBILE
    objectFit: "contain",
    background: "#000",
  },

  close: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    background: "rgba(0,0,0,0.7)",
    border: "1px solid #fbbc12",
    color: "#fbbc12",
    width: 44, // BIGGER FOR MOBILE
    height: 44,
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: 18,
  },
};
