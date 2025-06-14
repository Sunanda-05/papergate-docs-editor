import { FilterState } from "@/types/filter";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      search: "",
      activeTags: [],
      starredOnly: false,
      sortBy: "updatedAt",
      sortOrder: "desc",
      page: 1,
      limit: 10,

      setSearch: (text) => set({ search: text }),

      addTag: (tag) =>
        set((state) => ({
          activeTags: state.activeTags.includes(tag)
            ? state.activeTags
            : [...state.activeTags, tag],
        })),

      removeTag: (tag) =>
        set((state) => ({
          activeTags: state.activeTags.filter((t) => t !== tag),
        })),

      clearTags: () => set({ activeTags: [] }),

      toggleStarredOnly: () =>
        set((state) => ({
          starredOnly: !state.starredOnly,
        })),

      setSortBy: (sort) => set({ sortBy: sort }),
      setSortOrder: (order) => set({ sortOrder: order }),
      setPage: (page) => set({ page }),
      setLimit: (limit) => set({ limit }),

      resetFilters: () =>
        set({
          search: "",
          activeTags: [],
          starredOnly: false,
          sortBy: "updatedAt",
          sortOrder: "desc",
          page: 1,
          limit: 10,
        }),
    }),
    {
      name: "papergate-filters",
    }
  )
);
