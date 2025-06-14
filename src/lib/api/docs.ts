import { apiFetch } from "@/lib/fetcher";
import { CreateDocumentPayload, DocType, PaginatedDocuments } from "@/types/docs";

export const createDocument = async (data: CreateDocumentPayload) => {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/document`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  return res.json();
};

export const fetchDocument = async (id: string) => {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/document/${id}`
  );
  return res.json();
};

export const patchDocument = async ({
  id,
  updates,
}: {
  id: string;
  updates: Partial<DocType>;
}) => {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/document/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(updates),
    }
  );
  return res.json();
};

export const putDocument = async ({
  id,
  newData,
}: {
  id: string;
  newData: DocType;
}) => {
  const res = await apiFetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/document/${id}`, {
    method: "PUT",
    body: JSON.stringify(newData),
  });
  return res.json();
};

export const deleteDocument = async (id: string) => {
  const res = await apiFetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/document/${id}`, {
    method: "DELETE",
  });
  return res.json();
};


export const fetchInfiniteDocuments = async (page: number = 1): Promise<PaginatedDocuments> => {
  const res = await apiFetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/document?page=${page}`);
  return res.json();
};
