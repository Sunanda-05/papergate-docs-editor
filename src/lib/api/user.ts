import { apiFetch } from "../fetcher";

export const fetchUserIdByEmail = async (email: string) => {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/userId?email=${email}`,
    {
      method: "GET",
    }
  );
  return res.json();
};
