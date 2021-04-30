export type Nullable<T> = T | null;

export interface SignUpValues {
  email: string;
  firstName: string;
  lastName: string;
  locale: string;
  password: string;
  passwordConfirmation: string;
};
