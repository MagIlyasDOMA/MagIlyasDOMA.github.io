function getSystemTheme() {
    // Проверяем поддержку matchMedia и prefers-color-scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return isDark ? 'dark' : 'light';
    }
}