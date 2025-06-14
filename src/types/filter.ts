export type SortOption = "updatedAt" | "title" | "createdAt";

export interface Filters {
  search: string;
  activeTags: string[];
  starredOnly: boolean;
  sortBy: SortOption;
  sortOrder: "asc" | "desc";
  page: number;
  limit: number;
}

export interface FilterState extends Filters {
  setSearch: (text: string) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearTags: () => void;
  toggleStarredOnly: () => void;
  setSortBy: (sort: SortOption) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetFilters: () => void;
}
