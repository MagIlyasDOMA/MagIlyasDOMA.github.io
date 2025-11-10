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


/*
function element_to_div(element, replace=false) {
    const div = document.createElement('div');
    div.innerHTML = element_toHTMLText(element);
    if (replace)
        element.replaceWith(div)
    return div;
}
*/


function element_to_div(element) {
    const div = document.createElement('div');
    div.innerHTML = element.outerHTML; // Простое копирование
    return div;
}


/*
function password_format(shownPasswordHTML, hiddenPasswordHTML) {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[type="password"]');
        let password_inputs = [];
        inputs.forEach(input => {
            if (input.type === 'password')
                password_inputs.push(input);
        });
        if (notArrayEmpty(password_inputs)) {
            password_inputs.forEach(input => {
                const div = element_to_div(input)
                input.replaceWith(div)
                input = div.querySelector('input');
                let button = document.createElement('span')
                button.innerHTML = hiddenPasswordHTML;
                // button.type = 'button';
                button.className = 'show-password-btn';
                button.show_password = false;
                button.onclick = function () {
                    togglePassword(input);
                    let sp = !button.show_password
                    button.show_password = sp;
                    if (sp)
                        button.innerHTML = shownPasswordHTML;
                    else
                        button.innerHTML = hiddenPasswordHTML;
                };
                div.style.cssText = "position: relative;\n" +
                    "            display: inline-block;" +
                    "            width: 100%;"
                button.style.cssText = "position: absolute;\n" +
                    "            right: 10px;\n" +
                    "            top: 50%;\n" +
                    "            transform: translateY(-50%);\n" +
                    "            cursor: pointer;" +
                    "            user-select: none;" +
                    "            z-index: 1000;//  \n" +
                    "            pointer-events: auto !important;" +
                    "            img {" +
                    "                    width: 20px;" +
                    "                }"
                div.appendChild(button)
            });
        }
    });
}
*/


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
