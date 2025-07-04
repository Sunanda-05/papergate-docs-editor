import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import React from "react";
import demoData from "@/components/tiptap-templates/simple/data/demo.json";

const DemoPage = () => {
  return <SimpleEditor content={demoData} />;
};

export default DemoPage;
