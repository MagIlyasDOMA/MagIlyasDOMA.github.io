"use strict";
function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return isDark ? 'dark' : 'light';
    }
    return null;
}
function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => { })
        .catch(err => {
        console.error('Не удалось скопировать текст: ', err);
    });
}
//# sourceMappingURL=system.js.map