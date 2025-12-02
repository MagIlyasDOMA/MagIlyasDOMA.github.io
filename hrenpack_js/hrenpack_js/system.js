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
function redirectBackOrClose(default_url = '/') {
    if (document.referrer && document.referrer !== window.location.href) {
        window.history.back();
    }
    else {
        window.close();
        setTimeout(() => {
            if (!window.closed) {
                window.location.href = default_url;
            }
        }, 100);
    }
}
function getHost() {
    return window.location.protocol + '//' + window.location.host;
}
//# sourceMappingURL=system.js.map