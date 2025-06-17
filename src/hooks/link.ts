"use client";

import {
  disableLinkToken,
  fetchDocumentByLinkToken,
  regenerateLinkToken,
} from "@/lib/api/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useLinkTokenDocumentQuery = (linkToken: string) => {
  return useQuery({
    queryKey: ["link", linkToken],
    queryFn: () => fetchDocumentByLinkToken(linkToken),
    enabled: !!linkToken, // Only run if token exists
    networkMode: "always", // allow fetching even when offline
  });
};

export const useDisableLinkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: disableLinkToken,
    onSuccess: (updatedDoc) => {
      queryClient.setQueryData(["document", updatedDoc._id], updatedDoc);
    },
  });
};

export const useRegenerateLinkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: regenerateLinkToken,
    onSuccess: (updatedDoc) => {
      queryClient.setQueryData(["document", updatedDoc._id], updatedDoc);
    },
  });
};
