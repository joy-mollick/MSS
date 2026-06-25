import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  XCircle,
} from "lucide-react";

const NiceModal = ({
  open,
  type = "info",
  title = "Notice",
  message = "",
  primaryText = "OK",
  secondaryText = "",
  onPrimary,
  onSecondary,
  onClose,
  loading = false,
}) => {
  if (!open) return null;

  const getIcon = () => {
    if (type === "success") return <CheckCircle2 size={36} />;
    if (type === "error") return <XCircle size={36} />;
    if (type === "warning") return <AlertTriangle size={36} />;
    return <Info size={36} />;
  };

  return (
    <div className="niceModalOverlay">
      <div className="niceModalCard">
        <button
          type="button"
          className="niceModalClose"
          onClick={onClose || onSecondary || onPrimary}
        >
          ×
        </button>

        <div className={`niceModalIcon ${type}`}>{getIcon()}</div>

        <h2>{title}</h2>

        {message ? <p>{message}</p> : null}

        <div
          className={
            secondaryText
              ? "niceModalActions twoActions"
              : "niceModalActions"
          }
        >
          {secondaryText ? (
            <button
              type="button"
              className="niceModalSecondary"
              onClick={onSecondary}
              disabled={loading}
            >
              {secondaryText}
            </button>
          ) : null}

          <button
            type="button"
            className="niceModalPrimary"
            onClick={onPrimary || onClose}
            disabled={loading}
          >
            {loading ? <Loader2 className="spinIcon" size={18} /> : null}
            {primaryText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NiceModal;