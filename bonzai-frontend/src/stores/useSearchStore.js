import { create } from 'zustand';

export const useSearchStore = create(set => ({
    searchFilter: {
        from: "",
        to: "",
        adults: 1,
        kids: 0,
        rooms: 1,
        specialRequest: ""
    },
    setSearchFilter : (preferences) => {
        set({ searchFilter : preferences })
    }
}));