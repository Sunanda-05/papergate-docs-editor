"use client";
import Spinner from "@/components/common/Spinner";
import EditorInterface from "@/components/editor/EditorInterface";
import { useDocumentQuery, usePatchDocumentMutation } from "@/hooks/docs";
import { useLinkTokenDocumentQuery } from "@/hooks/link";
import { useAuthStore } from "@/stores/auth-store";
import { DocumentFormData } from "@/types/components";
import { useParams } from "next/navigation";
import React from "react";

const LinkDocPage = () => {
  const { link } = useParams();
  const linkToken = Array.isArray(link) ? link[0] : link;
  const userId = useAuthStore.getState().id;
  
  if (!linkToken) {
    return null;
  }
  const {
    data: doc,
    isError: fetchError,
    isPending: fetchPending,
    isSuccess: fetchSuccess,
  } = useLinkTokenDocumentQuery(linkToken);
  const {
    mutate: updateDoc,
    isError: updateError,
    isPending: updatePending,
    isSuccess: updateSuccess,
  } = usePatchDocumentMutation();

  
    const canEdit =
      !doc ||
      doc.owner === userId ||
      doc.sharedWith?.some(
        (entry) => entry.user._id === userId && entry.permission === "edit"
      );
    console.log({ doc, canEdit , owner: doc?.owner, userId});

  const handleUpdateDoc = (updates: Partial<DocumentFormData>) => {
    if(doc?._id && canEdit)
      updateDoc({ id: doc?._id, updates });
  };


  if (!doc) return <Spinner />;

  return (
    <div>
      <EditorInterface
        doc={doc}
        onUpdate={(updates: any) => handleUpdateDoc(updates)} //TODO any
        canEdit={canEdit}
      />
    </div>
  );
};

export default LinkDocPage;
