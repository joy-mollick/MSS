import React from "react";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";

const ConfirmModal = ({
  open,
  type = "warning",
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!open) return null;

  const isSuccess = type === "success";

  return (
    <div className="confirmModalOverlay">
      <div className="confirmModalCard">
        <button className="confirmModalClose" onClick={onCancel}>
          <X size={20} />
        </button>

        <div className={isSuccess ? "confirmIcon success" : "confirmIcon"}>
          {isSuccess ? <CheckCircle2 size={34} /> : <AlertTriangle size={34} />}
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="confirmModalActions">
          <button className="confirmCancelBtn" onClick={onCancel}>
            {cancelText}
          </button>

          <button className="confirmActionBtn" onClick={onConfirm} disabled={loading}>
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;