import {create} from 'zustand'
import { zustandStorage } from '../storage'
import { createJSONStorage, persist } from 'zustand/middleware'
import { themeStoreType } from './type'

export const themeStore = create<themeStoreType,[["zustand/persist", unknown]]>(
    persist(
        (set) => ({
            theme: 'auto',
            setTheme: (mode) => {
                set({ theme: mode });
                
                // Apply the theme to the document element
                if (mode === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                } else if (mode === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                } else if (mode === 'auto') {
                    // Check system preference
                    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
                }
            }
        }),
        {
            name: 'knozify-theme-storage',
            storage: createJSONStorage(() => zustandStorage)
        }
    )
)