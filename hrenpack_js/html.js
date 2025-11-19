"use strict";
const escapeChars = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;'
};
function togglePassword(passwordInput) {
    const passwordType = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', passwordType);
}
function isTextWrapped(element) {
    const elementHeight = element.clientHeight;
    const scrollHeight = element.scrollHeight;
    return scrollHeight > elementHeight;
}
function notArrayEmpty(array) {
    return array.length > 0;
}
function get_tagName(element) {
    return element.tagName.toLowerCase();
}
function element_toHTMLText(element) {
    const tag = get_tagName(element);
    const attrs = element.attributes;
    let text = `<${tag}`;
    // Добавляем атрибуты, если они есть
    if (attrs.length > 0) {
        for (let attr of attrs) {
            text += ` ${attr.name}="${attr.value}"`;
        }
    }
    text += `>${element.innerHTML}</${tag}>`;
    return text;
}
function element_to_div(element) {
    const div = document.createElement('div');
    div.innerHTML = element.outerHTML; // Простое копирование
    return div;
}
function password_format(shownPasswordHTML, hiddenPasswordHTML) {
    document.addEventListener('DOMContentLoaded', () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[type="password"]');
            inputs.forEach(input => {
                const wrapper = document.createElement('div');
                wrapper.style.position = 'relative';
                wrapper.style.display = 'inline-block';
                wrapper.style.width = '100%';
                // Обёртываем input
                input.parentNode.insertBefore(wrapper, input);
                wrapper.appendChild(input);
                // Создаём кнопку
                const toggleBtn = document.createElement('button');
                toggleBtn.type = 'button';
                toggleBtn.className = 'show-password-btn';
                toggleBtn.innerHTML = hiddenPasswordHTML;
                toggleBtn.style.cssText = `
                    position: absolute;
                    left: 45%;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    user-select: none;
                    background: none;
                    border: none;
                    padding: 0;
                `;
                toggleBtn.addEventListener('click', () => {
                    const isShowing = input.type === 'text';
                    input.type = isShowing ? 'password' : 'text';
                    toggleBtn.innerHTML = isShowing ? hiddenPasswordHTML : shownPasswordHTML;
                });
                wrapper.appendChild(toggleBtn);
            });
        });
    });
}
function escape(html) {
    return html.replace(/[<>"']/g, function (i) {
        return escapeChars[i] || i;
    });
}
//# sourceMappingURL=html.js.map