"use strict";
const tt_button = document.querySelector('#hrenpack-toggle-theme');
const stylesheet = document.querySelector('#hrenpack-theme-stylesheet');
const cookieTheme = getCookie?.('theme'), lsTheme = localStorage.getItem('theme');
const theme_url_prefix = getScriptSite(document.currentScript) + '/hrenpack-theme-style/';
const theme_light = theme_url_prefix + 'style_light.css', theme_dark = theme_url_prefix + 'style_dark.css';
let currentTheme;
if (cookieTheme)
    currentTheme = cookieTheme;
else if (lsTheme)
    currentTheme = lsTheme;
else
    currentTheme = getSystemTheme() || 'light';
if (stylesheet) {
    stylesheet.setAttribute('href', currentTheme === 'light' ? theme_light : theme_dark);
}
if (tt_button) {
    tt_button.addEventListener('click', () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        if (stylesheet) {
            stylesheet.setAttribute('href', newTheme === 'light' ? theme_light : theme_dark);
        }
        currentTheme = newTheme;
        btn_hren_update();
        setCookie?.('theme', newTheme);
    });
}
//# sourceMappingURL=dark-theme.js.map