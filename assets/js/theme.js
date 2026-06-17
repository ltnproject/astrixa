/**
 * Astrixa Theme System
 */

const Theme = {
  init: () => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    Theme.set(savedTheme);
  },

  set: (theme) => {
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  toggle: () => {
    const current = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    Theme.set(next);
    return next;
  },

  get: () => localStorage.getItem(STORAGE_KEYS.THEME) || 'dark'
};

window.Theme = Theme;
Theme.init();
