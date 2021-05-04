export type Error = {
  errors: Record<string, string[]> | string[];
};

export type Response = {
  data: Record<string, string | number>;
};
