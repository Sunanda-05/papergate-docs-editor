import { DocType } from "@/types/docs";
import { apiFetch } from "../fetcher";

export const regenerateLinkToken = async (id: string): Promise<DocType> => {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/document/${id}/regenerate-link`,
    {
      method: "PATCH",
    }
  );
  return res.json();
};

export const disableLinkToken = async (id: string): Promise<DocType> => {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/document/${id}/disable-link`,
    {
      method: "PATCH",
    }
  );
  return res.json();
};

export const fetchDocumentByLinkToken = async (
  linkToken: string
): Promise<DocType> => {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/document/access/${linkToken}`,
    {
      method: "GET",
    }
  );
  return res.json();
};
