import { Filters } from "@/types/filter";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildQueryParams = (filters: Filters): string => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.starredOnly !== undefined)
    params.set("starredOnly", String(filters.starredOnly));
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);
  if (filters.page !== undefined) params.set("page", String(filters.page));
  if (filters.limit !== undefined) params.set("limit", String(filters.limit));
  if (filters.activeTags?.length)
    params.set("tags", filters.activeTags.join(","));

  return params.toString();
};

export function getNotePreview(note: any, maxLength = 200): string {
  if (!note || !note.content) return "";

  const extractText = (nodes: any[]): string => {
    return nodes
      .map((node) => {
        if (node.type === "text") return node.text;
        if (node.content) return extractText(node.content);
        return "";
      })
      .join(" ");
  };

  const fullText = extractText(note.content).trim();
  return fullText.length > maxLength
    ? fullText.slice(0, maxLength) + "..."
    : fullText;
}
