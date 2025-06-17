"use client";

import {
  useCreateDocument,
} from "@/hooks/docs";
import React from "react";
import EditorInterface from "@/components/editor/EditorInterface";
import { DocumentFormData } from "@/types/components";

const NewDoc = () => {
  const {
    mutate: saveDoc,
    isError,
    isPending,
    isSuccess,
  } = useCreateDocument();
  const handleSave = (formData: DocumentFormData) => {
    saveDoc(formData);
  };

  return (
    <div>
      <EditorInterface onSave={handleSave} />
    </div>
  );
};

export default NewDoc;
