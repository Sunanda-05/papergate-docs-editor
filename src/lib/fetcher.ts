import { useAuthStore } from "@/stores/auth-store";

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  retry = true
): Promise<Response> {
  const token = useAuthStore.getState().accessToken;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include", // For sending httpOnly refresh cookie
  });

  // Try refreshing token
  if (res.status === 401 && retry) {
    const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL??""}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      const { token: newToken } = await refreshRes.json();
      useAuthStore.getState().setAccessToken(newToken);

      return apiFetch<T>(url, options, false);
    } else {
      useAuthStore.getState().logout();
      throw new Error("Session expired. Please log in again.");
    }
  }

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "API error");
  }

  return res;
}
