export interface ValidationError {
  statusCode: number;
  message?: string;
  name: string;
  errors: ValidationErrorItem[];
}

export interface ValidationErrorItem {
  message: string[];
  path: string;
  value: string;
}

export interface LoginError {
  message: string;
}
