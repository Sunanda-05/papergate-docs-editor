"use client";
// export default function DocHomeLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <main>{children}</main>;
// }

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  Tag,
  Archive,
  Trash2,
  Lock,
  Star,
  Code,
  Utensils,
  Beaker,
  BookOpen,
  Plane,
  User,
  Users,
  Heart,
  Edit3,
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  Grid3X3,
  Image,
  Hash,
  ExternalLink,
  Globe,
  Folder,
} from "lucide-react";
import { NoteCard } from "./NoteCard";
import { DocType } from "@/types/docs";
import { useDocsQuery } from "@/hooks/docs";
import { useParams } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count: number | null;
}

interface Category {
  icon: string | React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: Tag, label: "Untagged", count: null },
  { icon: Calendar, label: "Todo", count: null },
  { icon: Calendar, label: "Today", count: null },
  { icon: Lock, label: "Locked", count: null },
  { icon: Archive, label: "Archive", count: null },
  { icon: Trash2, label: "Trash", count: null },
];

const categories: Category[] = [
  {
    icon: Folder,
    label: "My docs",
    color: "text-blue-500",
  },
  {
    icon: Lock,
    label: "Private",
    color: "text-gray-500",
  },
  {
    icon: Users,
    label: "Shared with me",
    color: "text-purple-500",
  },
  {
    icon: LinkIcon,
    label: "Links",
    color: "text-green-500",
  },
  {
    icon: Globe,
    label: "Public",
    color: "text-teal-500",
  },
  {
    icon: Star,
    label: "Starred",
    color: "text-yellow-500",
  },
];

const DocHomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const param = useParams();
  const selectedId = param.id;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: docs, isError, isPending, isSuccess } = useDocsQuery();
  const filteredNotes = docs?.documents?.filter((doc) => {
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* full JSX from original remains here */}
      <div>
        {/* <div className={darkMode ? 'dark' : ''}> */}
        <div className="flex h-screen bg-background text-foreground">
          {/* Sidebar */}
          <div className="w-64 bg-muted/30 border-r flex flex-col">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-semibold text-lg">Notes</h1>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button className="p-1 hover:bg-muted rounded">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto bg-sidebar">
              <div className="p-2">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">
                    Notes
                  </h3>
                  <nav className="space-y-1">
                    {sidebarItems.map((item, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center gap-3 px-2 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">
                    Categories
                  </h3>
                  <nav className="space-y-1">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === category.label
                              ? null
                              : category.label
                          )
                        }
                        className={`w-full flex items-center gap-3 px-2 py-2 text-sm rounded-lg hover:bg-muted transition-colors ${
                          selectedCategory === category.label ? "bg-muted" : ""
                        }`}
                      >
                        {typeof category.icon === "string" ? (
                          <span className="w-4 h-4 flex items-center justify-center text-xs">
                            {category.icon}
                          </span>
                        ) : (
                          <category.icon
                            className={`w-4 h-4 ${category.color}`}
                          />
                        )}
                        <span>{category.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Notes List */}
          <div className="w-80 border-r bg-background flex flex-col">
            <div className="p-4 border-b">
              <Link href={"/doc/new"}>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" />
                New Note
              </button>
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              {docs?.documents?.map((doc, index) => (
                <Link href={`/doc/${doc._id}`} key={index}>
                  <div
                    key={doc._id}
                    // onClick={() => setSelectedNote(doc)}
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedId === doc._id
                        ? "bg-muted/50 border-l-4 border-l-primary rounded"
                        : "border-b "
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm mb-1 truncate">
                          {doc.title}
                        </h3>
                      </div>
                    </div>
                    <NoteCard
                      key={doc._id}
                      note={doc.content}
                      onClick={() => {}}
                    />
                    <div className="flex justify-between mt-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {doc?.updatedAt
                        ? new Date(doc.updatedAt).toLocaleDateString()
                        : "Unknown"}
                    </div>
                    {doc.sharedWith.length>0 && <Users className="w-4 h-4"/>}

                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-background">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DocHomeLayout;
