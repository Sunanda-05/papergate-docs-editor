"use client";

import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { apiFetch } from "@/lib/fetcher";
import {
  createDocument,
  deleteDocument,
  fetchDocument,
  fetchInfiniteDocuments,
  patchDocument,
  putDocument,
} from "@/lib/api/docs";
import {
  CreateDocumentPayload,
  DocType,
  PaginatedDocuments,
} from "@/types/docs";

import { Filters } from "@/types/filter";
import { buildQueryParams } from "@/lib/utils";

export const useDocsQuery = (filters?: Filters) => {
  return useQuery<PaginatedDocuments>({
    queryKey: ["docs", filters],
    queryFn: async () => {
      const query = filters ? buildQueryParams(filters) : null;
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/document?${query}`
      );
      if (!res.ok) throw new Error("Failed to fetch items");
      return res.json();
    },
    placeholderData: keepPreviousData,
    refetchOnReconnect: true,
  });
};

export const useCreateDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDocumentPayload) => createDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["docs"] });
    },
  });
};

export function usePatchDocumentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchDocument,
    mutationKey: ["patchDocument"],

    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["document", id] });

      const previousDoc = queryClient.getQueryData<DocType>(["document", id]);
      queryClient.setQueryData<DocType>(["document", id], (old) => {
        if (!old) return undefined;
        return {
          ...structuredClone(old ?? {}),
          ...updates,
        };
      });
      return { previousDoc };
    },

    // Rollback on error
    onError: (err, { id }, context) => {
      if (context?.previousDoc) {
        queryClient.setQueryData(["docs", id], context.previousDoc);
      }
    },

    // update the fresh doc
    onSuccess: (updatedDoc, { id }) => {
      queryClient.setQueryData(["docs", id], updatedDoc);
    },
  });
}

export const useDocumentQuery = (id: string) => {
  return useQuery<DocType>({
    queryKey: ["docs", id],
    queryFn: () => fetchDocument(id),
    enabled: !!id,
    meta: {
      label: "Load Document",
      ownerTracking: true,
    },
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    networkMode: "online",
    staleTime: 1000 * 60 * 10, // 10 mins fresh
    gcTime: 1000 * 60 * 30, // keep in memory 30 mins
  });
};

export const usePutDocumentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putDocument,
    onSuccess: (updatedDoc) => {
      queryClient.setQueryData(["docs", updatedDoc._id], updatedDoc);
    },
    meta: {
      optimistic: true,
      source: "editor",
    },
    retry: false,
    networkMode: "always",
  });
};

export const useDeleteDocumentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ["docs", id] });
    },
  });
};

export const useInfiniteDocuments = () => {
  return useInfiniteQuery({
    queryKey: ["documents"],
    queryFn: ({ pageParam = 1 }) => fetchInfiniteDocuments(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNext ? lastPage.meta.currentPage + 1 : undefined; // stop if no next page
    },
  });
};
