export interface RegisterInput {
  name?: string | null | undefined;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  name?: string | null | undefined;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
  __v: number;
}
