import React, { useState, useEffect } from "react";

const ModalWrapper = ({ isOpen, onClose, children }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeOutDown {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(30px); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsClosing(false);
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!shouldRender) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          ...styles.modal,
          animation: isClosing
            ? "fadeOutDown 0.3s ease-out forwards"
            : "fadeInUp 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: 12, // IMPORTANT for mobile
  },

  modal: {
    backgroundColor: "#111",
    borderRadius: 16,
    width: "100%",
    maxWidth: 1000,
    maxHeight: "100%",
    padding: 0, // video modal should control padding
    overflow: "hidden",
  },
};

export default ModalWrapper;
