export type Nullable<T> = T | null;

export type Error = {
  errors: Record<string, string[]> | string[];
  status: number;
};

export interface LoginValues {
  email: string;
  password: string;
}

export interface SignUpValues {
  email: string;
  firstName: string;
  lastName: string;
  locale: string;
  password: string;
  passwordConfirmation: string;
}

export interface Headers {
  client?: string;
  token?: string;
  uid?: string;
}
