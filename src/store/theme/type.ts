type ThemeMode='auto' | 'light' | 'dark'

export interface themeStoreType {
    theme: ThemeMode;
    setTheme: (mode: ThemeMode) => void;
}
