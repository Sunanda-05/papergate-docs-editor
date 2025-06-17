export interface CreateDocumentPayload {
  title: string;
  content?: object;
  tags?: string[];
  isStarred?: boolean;
  visibility?: "private" | "public" | "link";
  sharedWith?: {
    user: string;
    permission: "read" | "edit";
  }[];
}

export interface SharedWithEntry {
  user: {
    _id: string;
    email: string,
    name: string
  }
  permission: "read" | "edit";
}

export type Visibility = "private" | "public" | "link";

export interface DocType {
  _id: string;
  title: string;
  content: Record<string, any>;
  isStarred: boolean;
  tags: string[]; // Array of Tag ObjectIds
  owner: string;
  sharedWith: SharedWithEntry[];
  linkToken?: string;
  visibility: Visibility;
  createdAt: string; // ISO timestamp
  updatedAt: string;
  __v?: number;
}

export interface PaginatedDocuments {
  documents: DocType[];
  meta: {
    totalDocs: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
  };
}
