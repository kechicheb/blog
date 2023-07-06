import React, { useState } from "react";

const SuccessPopup = ({
  message,
  setSuccess,
  setFiles,
  setContent,
  setSummary,
  setTitle,
}) => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
    setSuccess(false);
    setTitle("");
    setSummary("");
    setContent("");
    setFiles("");
  };

  return (
    <>
      {showPopup && (
        <div className="success-overlay">
          <div className="success-popup">
            <div className="success-message">{message}</div>
            <button className="close-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessPopup;
