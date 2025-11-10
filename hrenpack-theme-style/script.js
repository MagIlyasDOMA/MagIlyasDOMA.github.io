const stylesRoot = getComputedStyle(document.documentElement);
// const themeStyle = document.getElementById('theme-css-link');
const tt_button = document.getElementById('hrenpack-toggle-theme');
const stylesheet = document.getElementById('hrenpack-theme-stylesheet');
const cookieTheme = getCookie('theme'), lsTheme = localStorage.getItem('theme')
const theme_url_prefix = '/hrenpack-theme-style/';
const theme_light = theme_url_prefix + 'style_light.css', theme_dark = theme_url_prefix + 'style_dark.css'
let currentTheme;


function getButtonColor(button, isHoverOrActive = false) {
    if (button.classList.contains('btn-hren-ahren')) {
        return isHoverOrActive
            ? stylesRoot.getPropertyValue('--hrenpack-a-hover-color')
            : stylesRoot.getPropertyValue('--hrenpack-bg-ahren');
    } else {
        return isHoverOrActive
            ? stylesRoot.getPropertyValue('--hrenpack-a-hover-color')
            : stylesRoot.getPropertyValue('--hrenpack-foreground'); // Изменено с --background на --foreground
    }
}


function getButtonTextColor(button) {
    return button.classList.contains('btn-hren-ahren')
        ? stylesRoot.getPropertyValue('--hrenpack-foreground') // Остаётся как было
        : stylesRoot.getPropertyValue('--hrenpack-background'); // Изменено с --foreground на --background
}


function btn_hren_press() {
    const buttons = document.querySelectorAll('.btn-hren');
    buttons.forEach(button => {
        // Инициализация начальных стилей
        button.style.backgroundColor = getButtonColor(button);
        button.style.color = getButtonTextColor(button);

        button.addEventListener('mousedown', function() {
            button.style.backgroundColor = stylesRoot.getPropertyValue('--hrenpack-a-pressed-color');
            button.style.color = getButtonTextColor(button);
        });

        button.addEventListener('mouseover', function() {
            button.style.backgroundColor = getButtonColor(button, true);
            button.style.color = getButtonTextColor(button);
        });

        button.addEventListener('mouseout', function() {
            button.style.backgroundColor = getButtonColor(button);
            button.style.color = getButtonTextColor(button);
        });

        button.addEventListener('mouseup', function() {
            button.style.backgroundColor = getButtonColor(button, true);
            button.style.color = getButtonTextColor(button);
        });

        button.addEventListener('mouseleave', function() {
            button.style.backgroundColor = getButtonColor(button);
            button.style.color = getButtonTextColor(button);
        });
    });
}


function btn_hren_update() {
    const buttons = document.querySelectorAll('.btn-hren')
    buttons.forEach(button => {
        button.style.backgroundColor = getButtonColor(button);
        button.style.color = getButtonTextColor(button);
    })
}


function getSystemTheme() {
    // Проверяем поддержку matchMedia и prefers-color-scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return isDark ? 'dark' : 'light';
    }
}

if (cookieTheme)
    currentTheme = cookieTheme;
else if (lsTheme)
    currentTheme = lsTheme;
else
    currentTheme = getSystemTheme();
stylesheet.setAttribute('href', currentTheme === 'light' ? theme_light : theme_dark);

tt_button.addEventListener('click', () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    stylesheet.setAttribute('href', newTheme === 'light' ? theme_light : theme_dark);
    currentTheme = newTheme;
    btn_hren_update();
    setCookie('theme', newTheme, 'forever');
});


window.onload = function () {
    btn_hren_press()
}
