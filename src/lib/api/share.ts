import { apiFetch } from "../fetcher";

export const shareDocument = async ({
  id,
  userId,
  permission
}: {
  id: string;
  userId: string;
  permission: "read" | "edit"
}) => {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/document/${id}/share`,
    {
      method: "PATCH",
      body: JSON.stringify({ userId, permission }),
    }
  );
  return res.json();
};

export const unshareDocument = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/document/${id}/unshare`,
    {
      method: "PATCH",
      body: JSON.stringify({ userId }),
    }
  );
  return res.json();
};

