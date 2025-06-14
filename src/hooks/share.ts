"use client"

import { shareDocument, unshareDocument } from "@/lib/api/share";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useShareDocumentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: shareDocument,
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["document", id] });
        },
    });
};

export const useUnshareDocumentMutation = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unshareDocument,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["document", id] });
    },
  });
};
