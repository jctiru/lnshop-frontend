import React from "react";

import "./error-display.styles.scss";

const ErrorDisplay = ({ errorMessage }) => (
  <div className="error-image-overlay">
    <div className="error-image-container"></div>
    <h2 className="error-image-text">{errorMessage}</h2>
  </div>
);

export default ErrorDisplay;
