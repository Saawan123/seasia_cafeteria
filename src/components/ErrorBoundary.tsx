import React, { Component, ErrorInfo, ReactNode } from 'react';
// import troubleshootImage from "../../assets/troubleShoot.svg"

import { Button } from 'react-bootstrap';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
      console.error('ErrorBoundary: An error occurred:', error);
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error('ErrorBoundary: componentDidCatch:', error, errorInfo);
      // You can log additional details or send them to an error tracking service
    }
  
    refreshPage = (): void => {
      window.location.reload();
    };
  
    render() {
      if (this.state.hasError) {
        return (
          <div className='w-100 vh-100 text-center d-flex flex-column justify-content-center align-items-center'>
            <h2>Something went wrong.</h2>
            <p>Please refresh the page to try again.</p>
            <div className='gap-3 d-flex'>
              <Button onClick={this.refreshPage} name='Refresh'>
                Refresh
              </Button>
            </div>
          </div>
        );
      }
  
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;
  