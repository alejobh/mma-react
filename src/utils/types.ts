export type Nullable<T> = T | null;

export type SignUpValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};
