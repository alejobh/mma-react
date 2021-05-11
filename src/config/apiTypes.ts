export type Error = {
  errors: Record<string, string[]> | string[];
  status: number;
};

export type Response = {
  data: Record<string, string | number>;
};
