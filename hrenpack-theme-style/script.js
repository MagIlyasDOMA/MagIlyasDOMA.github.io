"use strict";
let hrenpack_theme_style_root;
if (document.currentScript.dataset.root)
    hrenpack_theme_style_root = document.currentScript.dataset.root;
else if (document.currentScript.dataset.local !== undefined)
    hrenpack_theme_style_root = '';
else
    hrenpack_theme_style_root = 'https://magilyasdoma.github.io/';
const tt_button = document.querySelector('#hrenpack-toggle-theme');
const stylesheet = document.querySelector('#hrenpack-theme-stylesheet');
const cookieTheme = getCookie?.('theme'), lsTheme = localStorage.getItem('theme');
const theme_url_prefix = hrenpack_theme_style_root + '/hrenpack-theme-style/';
const theme_light = theme_url_prefix + 'style_light.css', theme_dark = theme_url_prefix + 'style_dark.css';
let currentTheme;
function getButtonColor(button, isHoverOrActive = false) {
    if (button.classList.contains('btn-hren-ahren')) {
        return isHoverOrActive
            ? stylesRoot.getPropertyValue('--hrenpack-a-hover-color')
            : stylesRoot.getPropertyValue('--hrenpack-background');
    }
    else {
        return isHoverOrActive
            ? stylesRoot.getPropertyValue('--hrenpack-a-hover-color')
            : stylesRoot.getPropertyValue('--hrenpack-foreground');
    }
}
function getButtonTextColor(button) {
    return button.classList.contains('btn-hren-ahren')
        ? stylesRoot.getPropertyValue('--hrenpack-foreground')
        : stylesRoot.getPropertyValue('--hrenpack-background');
}
function btn_hren_press() {
    const buttons = document.querySelectorAll('.btn-hren');
    buttons.forEach(button => {
        button.style.backgroundColor = getButtonColor(button);
        button.style.color = getButtonTextColor(button);
        button.addEventListener('mousedown', function () {
            button.style.backgroundColor = stylesRoot.getPropertyValue('--hrenpack-a-pressed-color');
            button.style.color = getButtonTextColor(button);
        });
        button.addEventListener('mouseover', function () {
            button.style.backgroundColor = getButtonColor(button, true);
            button.style.color = getButtonTextColor(button);
        });
        button.addEventListener('mouseout', function () {
            button.style.backgroundColor = getButtonColor(button);
            button.style.color = getButtonTextColor(button);
        });
        button.addEventListener('mouseup', function () {
            button.style.backgroundColor = getButtonColor(button, true);
            button.style.color = getButtonTextColor(button);
        });
        button.addEventListener('mouseleave', function () {
            button.style.backgroundColor = getButtonColor(button);
            button.style.color = getButtonTextColor(button);
        });
    });
}
function btn_hren_update() {
    const buttons = document.querySelectorAll('.btn-hren');
    buttons.forEach(button => {
        button.style.backgroundColor = getButtonColor(button);
        button.style.color = getButtonTextColor(button);
    });
}
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
window.onload = function () {
    btn_hren_press();
};
//# sourceMappingURL=script.js.map