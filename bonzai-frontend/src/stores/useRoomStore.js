import { create } from 'zustand';

export const useRoomStore = create(set => ({
    rooms : null,
    setRooms : (rooms) => {
        set({ rooms : rooms })
    }
}));