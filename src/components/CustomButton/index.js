import React from "react";
import "./CustomButton.css";

const CustomButton = ({ label, handleChange, active }) => {
  return (
    <button
      className={`article_filter_button ${active ? "active" : ""}`}
      onClick={handleChange}
    >
      {label}
    </button>
  );
};

export default CustomButton;
