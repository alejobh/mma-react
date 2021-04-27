export type Nullable<T> = T | null;

export interface SignUpValues {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};
