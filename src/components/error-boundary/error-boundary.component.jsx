import React from "react";

import ErrorDisplay from "../error-display/error-display.component";

import "./error-boundary.styles.scss";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false
    };
  }

  static getDerivedStateFromError(error) {
    // Process the error
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }

  render() {
    if (this.state.hasErrored) {
      return <ErrorDisplay errorMessage="Something went wrong :(" />;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
