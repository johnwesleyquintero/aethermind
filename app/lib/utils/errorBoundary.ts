import { logStore } from '~/lib/stores/logs';

interface ErrorWithCode extends Error {
  code?: string;
  statusCode?: number;
}

export function handleError(error: unknown, context: string) {
  const err = error as ErrorWithCode;

  // Format error details
  const errorDetails = {
    message: err.message || 'An unknown error occurred',
    code: err.code || 'UNKNOWN_ERROR',
    context,
    timestamp: new Date().toISOString(),
  };

  // Log error
  logStore.logError(errorDetails.message, {
    ...errorDetails,
    stack: err.stack,
  });

  // Return formatted error for UI
  return {
    ...errorDetails,
    userMessage: getUserFriendlyMessage(err),
  };
}

function getUserFriendlyMessage(error: ErrorWithCode): string {
  // Map common error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    ECONNREFUSED: 'Unable to connect to the service. Please check your internet connection.',
    UNAUTHORIZED: 'Authentication failed. Please check your credentials.',
    RATE_LIMITED: 'Too many requests. Please try again later.',
    DEFAULT: 'An unexpected error occurred. Please try again.',
  };

  return errorMessages[error.code || ''] || errorMessages.DEFAULT;
}

export function withErrorBoundary<T>(fn: () => Promise<T>, context: string): Promise<T> {
  return fn().catch((error) => {
    const handledError = handleError(error, context);
    throw new Error(handledError.userMessage);
  });
}
