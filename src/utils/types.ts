export type Nullable<T> = T | null;

export type ApiError = {
  errors: Record<string, string[]> | string[];
};
