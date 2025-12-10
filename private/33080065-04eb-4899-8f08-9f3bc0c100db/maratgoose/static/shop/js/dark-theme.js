"use strict";
const tt_svg = tt_button.querySelector('img');
const themeBaseURL = document.currentScript.dataset.toggleTheme || '/static';
function customDarkThemeUpdate() {
    tt_svg.src = themeBaseURL + '/' + currentTheme + '.svg';
}
tt_button.addEventListener('click', customDarkThemeUpdate);
document.addEventListener('DOMContentLoaded', customDarkThemeUpdate);
//# sourceMappingURL=dark-theme.js.map