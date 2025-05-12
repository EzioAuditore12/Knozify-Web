
import { StateStorage } from "zustand/middleware";
{/* TODO Need to use more secure storage type here */}
export const zustandStorage: StateStorage = {
    setItem: (name, value) => {
        localStorage.setItem(name, value);
        return Promise.resolve();
    },
    getItem: (name) => {
        const value = localStorage.getItem(name);
        return Promise.resolve(value ?? null);
    },
    removeItem: (name) => {
        localStorage.removeItem(name);
        return Promise.resolve();
    }
};