import React from 'react';
import { logStore } from '~/lib/stores/logs';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  retryCount: number;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, retryCount: 0 };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logStore.logErrorWithStack(error, 'error', {
      component: 'ErrorBoundary',
      retryCount: this.state.retryCount,
      ...errorInfo,
    });
  }

  handleRetry = () => {
    if (this.state.retryCount >= 3) {
      logStore.logWarning('Maximum retry attempts reached', {
        error: this.state.error,
        component: 'ErrorBoundary',
      });
      return;
    }

    this.setState((state) => ({
      hasError: false,
      retryCount: state.retryCount + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-4 bg-bolt-elements-background-depth-1">
          <div className="text-red-500 text-xl mb-4">Something went wrong</div>
          <div className="text-sm text-bolt-elements-textSecondary mb-4">{this.state.error?.message}</div>
          {this.state.retryCount < 3 ? (
            <button
              className="px-4 py-2 bg-bolt-elements-background-depth-2 hover:bg-bolt-elements-background-depth-3 rounded"
              onClick={this.handleRetry}
            >
              Try again ({3 - this.state.retryCount} attempts remaining)
            </button>
          ) : (
            <div className="text-bolt-elements-textTertiary">Please refresh the page to try again</div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
