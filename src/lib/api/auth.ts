import { useAuthStore } from "@/stores/auth-store";
import { RegisterInput, User } from "@/types/auth";
import { apiFetch } from "../fetcher";

export async function registerUser(data: RegisterInput): Promise<User> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
}

export const login = async (email: string, password: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await res.json();
  useAuthStore.getState().setAccessToken(data.accessToken);
  return data;
};

export const logout = async (): Promise<{ success: boolean }> => {
  const res = await apiFetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
    method: "POST",
  });

  return res.json();
};
