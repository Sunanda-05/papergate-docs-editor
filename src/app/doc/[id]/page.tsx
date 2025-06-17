"use client";
import Spinner from "@/components/common/Spinner";
import EditorInterface from "@/components/editor/EditorInterface";
import { useDocumentQuery, usePatchDocumentMutation } from "@/hooks/docs";
import { useAuthStore } from "@/stores/auth-store";
import { DocumentFormData } from "@/types/components";
import { useParams } from "next/navigation";
import React from "react";

const DocPage = () => {
  const { id } = useParams();
  const docId = Array.isArray(id) ? id[0] : id;
  const userId = useAuthStore.getState().id;
  
  if (!docId) {
    return null;
  }
  const {
    data: doc,
    isError: fetchError,
    isPending: fetchPending,
    isSuccess: fetchSuccess,
  } = useDocumentQuery(docId);
  const {
    mutate: updateDoc,
    isError: updateError,
    isPending: updatePending,
    isSuccess: updateSuccess,
  } = usePatchDocumentMutation();

  const handleUpdateDoc = (updates: Partial<DocumentFormData>) => {
    updateDoc({ id: docId, updates });
  };

  const canEdit =
    !doc ||
    doc.owner === userId ||
    doc.sharedWith?.some(
      (entry) => entry.user._id === userId && entry.permission === "edit"
    );
  console.log({ canEdit , owner: doc?.owner, userId});


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

export default DocPage;
