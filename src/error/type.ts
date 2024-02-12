export interface ErrorData {
  name?: string;
  response?: {
    status: number;
    data?: {
      error: {
        errorCode: number;
      };
    };
  };
}

export interface ErrorFallbackProps {
  error: ErrorData;
  resetErrorBoundary: () => void;
}
