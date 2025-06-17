"use client";

import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
const DocHome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
      <div className="flex justify-center mb-4">
        <Image
          className=""
          src="/document.svg"
          alt="Next.js logo"
          width={135}
          height={38}
          priority
        />
      </div>
      <div className=" max-w-xl w-full">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Welcome to your Documents
        </h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Select a document from the sidebar or start a fresh one. Your ideas
          deserve a great space.
        </p>
        <Link href="/doc/new">
          <Button variant="default" className="text-sm px-6 py-2 text-white">
            <Plus /> Create New Document
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DocHome;
