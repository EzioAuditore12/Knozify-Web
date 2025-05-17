import { useEffect } from 'react';
import { themeStore } from '@/store/theme';

export function useThemeInit() {
  const { theme, setTheme } = themeStore();
  
  useEffect(() => {
    setTheme(theme);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'auto') {
        setTheme('auto');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, setTheme]);
}