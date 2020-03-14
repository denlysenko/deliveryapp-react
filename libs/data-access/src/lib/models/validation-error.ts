export interface ValidationError {
  name: string;
  errors: ValidationErrorItem[];
}

export interface ValidationErrorItem {
  message: string;
  type: string;
  path: string;
  value: string;
  origin: string;
  validatorKey: string;
  validatorName: string;
  validatorArgs: string[];
}
