"use client";

import { useCreateDocument } from "@/hooks/docs";
import React from "react";
import EditorInterface from "@/components/editor/EditorInterface";
import { DocumentFormData } from "@/types/components";
import { useRouter } from "next/navigation";

const NewDoc = () => {
  const router = useRouter();
  const {
    mutateAsync: saveDoc,
    isError,
    isPending,
    isSuccess,
  } = useCreateDocument();
  const handleSave = async (formData: DocumentFormData) => {
    const data = await saveDoc(formData);
    router.replace(`/doc/${data._id}`);
  };

  return (
    <>
      <EditorInterface onSave={handleSave} />
    </>
  );
};

export default NewDoc;
