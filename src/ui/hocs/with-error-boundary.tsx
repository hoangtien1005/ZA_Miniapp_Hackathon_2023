/* eslint-disable react/destructuring-assignment */
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HocProps {}

interface HocState {
  hasError: boolean;
}

const withErrorBoundary = (Component) =>
  class WithErrorBoundary extends React.Component<HocProps, HocState> {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.error(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        // render an empty div to show the error
        return (
          <div>
            <h1>Something went wrong.</h1>;
          </div>
        );
      }

      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...this.props} />;
    }
  };

export default withErrorBoundary;
