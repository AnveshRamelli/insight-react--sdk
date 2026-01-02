// Error classes for the SDK
export class SDKError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SDKError";
  }
}

// Error class for validation errors
export class ValidationError extends SDKError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}