const stylesRoot = getComputedStyle(document.documentElement);


var ClickableLinksFactory = /** @class */ (function () {
    function ClickableLinksFactory() {
        this.urlRegex = /(https?:\/\/[^\s]+)/g;
    }
    ClickableLinksFactory.prototype.walk = function (node, isClickToCopy) {
        var _this = this;
        if (node.nodeType === Node.TEXT_NODE) {
            var text = node.textContent;
            var func_1 = isClickToCopy ? this.get_clickToCopy : this.get_anchor;
            if (this.urlRegex.test(text)) {
                var parent_1 = node.parentNode;
                var newContent = text.replace(this.urlRegex, function (url) {
                    return func_1(url);
                });
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = newContent;
                while (tempDiv.firstChild) {
                    parent_1.insertBefore(tempDiv.firstChild, node);
                }
                parent_1.removeChild(node);
            }
        }
        else {
            node.childNodes.forEach(function (child) {
                _this.walk(child, isClickToCopy);
            });
        }
    };
    ClickableLinksFactory.prototype.get_anchor = function (url) {
        return "<a href=\"".concat(url, "\" target=\"_blank\" rel=\"noopener noreferrer\" data-clf-generated>").concat(url, "</a>");
    };
    ClickableLinksFactory.prototype.get_clickToCopy = function (url) {
        return "<click-to-copy data-clf-generated>".concat(url, "</click-to-copy>");
    };
    ClickableLinksFactory.prototype.clickableLinks = function (element) {
        this.walk(element, false);
    };
    ClickableLinksFactory.prototype.clickToCopyLinks = function (element) {
        this.walk(element, true);
    };
    Object.defineProperty(ClickableLinksFactory.prototype, "generatedElements", {
        get: function () {
            return document.querySelectorAll('[data-clf-generated]');
        },
        enumerable: false,
        configurable: true
    });
    return ClickableLinksFactory;
}());



function downloadTextAsFile(filename, text) {
    // Создаем Blob из текста
    const blob = new Blob([text], { type: 'text/plain' });

    // Создаем URL для Blob
    const url = URL.createObjectURL(blob);
    console.log(url)

    // Создаем элемент <a> для загрузки
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    // Программно вызываем клик по ссылке
    a.click();

    // Освобождаем URL
    URL.revokeObjectURL(url);
}



function println(value) {
    console.log(value)
}



function getCookie(name) {
    const nameEQ = `${name}=`;
    const cookiesArray = document.cookie.split(';'); // разбиваем строку cookie на массив
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim(); // удаляем пробелы
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length); // возвращаем значение cookie
        }
    }
    return null; // если cookie не найден, возвращаем null
}


function setCookie(name, value, days= null, path = '/') {
    let expires = '';
    if (days === 'forever') {
        expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT'; // форматируем дату
    } else if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // преобразуем дни в миллисекунды
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=${path}`; // установка cookie
}


function hasCookie(name) {
    return getCookie(name) == null;
}




function togglePassword(passwordInput) {
    const passwordType = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', passwordType);
}


class NotAuthorizedError extends Error {
    constructor() {
        super("Пользователь не авторизован");
        this.name = 'NotAuthorizedError'
    }
}


function button_submit(parent) {
    const buttons = parent.querySelectorAll('button');
    let submit = null

    buttons.forEach(button => {
        if (button.type === 'submit')
            submit = button;
    });
    return submit
}


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



function getInputCursorPosition(input) {
    return input.selectionStart - 1
}


function copyInputToClipboard(input) {
        // Временно снимаем атрибут disabled
        input.removeAttribute('disabled');

        // Выделяем текст в input
        input.select();
        input.setSelectionRange(0, 99999); // Для мобильных устройств

        // Копируем текст в буфер обмена
        navigator.clipboard.writeText(input.value)
          .then(() => {
            console.log('Текст успешно скопирован: ' + input.value);
          })
          .catch(err => {
            console.error('Не удалось скопировать текст: ', err);
          })
          .finally(() => {
            // Возвращаем атрибут disabled
            input.setAttribute('disabled', true);
          });
}


function clearInput_and_addLastSymbol(input) {
    input.value = input.value[getInputCursorPosition(input)];
}



function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.head.appendChild(link);
}

function elementToAnchor(element, href, cursorPointer = true, preventDefault= false) {
    element.addEventListener('click', function (elem) {
        if (elem.button === 0)
            window.location.href = href;
        else if (elem.button === 1)
            window.open(href, '_blank')
    })
    if (preventDefault) {
        element.addEventListener('auxclick', function (elem) {
            if (elem.button === 1)
                elem.preventDefault()
        })
    }
    if (cursorPointer)
        element.style.cursor = 'pointer'
    return element
}



function pushNotification(title= "Уведомление", body = "Текст уведомления", icon = null) {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, {
                    body: body,
                    icon: icon // Опционально: иконка уведомления
                });
            }
        });
    } else {
        new Notification(title, {
            body: body,
            icon: icon // Опционально: иконка уведомления
        });
    }
}


class HyperTextNotification {
    constructor({ bottom = '20', right = '20', backgroundColor = '#121212',
                    color = '#ededed', padding = '15', borderRadius = '5', timeout = 3 } = {}) {
        this.bottom = intToPixel(bottom);
        this.right = intToPixel(right);
        this.backgroundColor = backgroundColor;
        this.color = color;
        this.padding = intToPixel(padding);
        this.borderRadius = intToPixel(borderRadius);
        this.timeout = timeout;
    }

    show(message, timeout= 0) {
        const notification = document.createElement("div");
        notification.textContent = message;
        notification.style.position = "fixed";
        notification.style.bottom = this.bottom;
        notification.style.right = this.right;
        notification.style.backgroundColor = this.backgroundColor;
        notification.style.color = this.color;
        notification.style.padding = this.padding;
        notification.style.borderRadius = this.borderRadius;
        notification.style.zIndex = "1000";
        timeout = timeout === 0 ? this.timeout : timeout
        document.body.appendChild(notification);

        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            document.body.removeChild(notification);
        }, timeout * 1000);
    }
}



function input_type_fc(input) {
    return input.type !== 'hidden' && input.type !== 'reset' && input.type !== 'checkbox' && input.type !== 'radio'
}


function input_form_control(form) {
    console.log(form.id)
    const inputs = form.querySelectorAll('input')
    const selects = form.querySelectorAll('select')
    const areas = form.querySelectorAll('textarea')
    inputs.forEach(input => {
        if (input_type_fc(input))
            input.classList.add('form-control')
    })
    selects.forEach(select => {
        select.classList.add('form-control')
    })
    areas.forEach(textarea => {
        textarea.classList.add('form-control')
    })
}

function input_form_control_unline(form) {
    console.log(form.id)
    const inputs = form.querySelectorAll('input')
    const selects = form.querySelectorAll('select')
    const areas = form.querySelectorAll('textarea')
    inputs.forEach(input => {
        if (input_type_fc(input))
            input.classList.add('form-control-unline')
    })
    selects.forEach(select => {
        select.classList.add('form-control-unline')
    })
    areas.forEach(textarea => {
        textarea.classList.add('form-control-unline')
    })
}


function intToPixel(number= '0') {
    number += '';
    if (parseInt(number) === 0)
        return '0';
    return !isNaN(parseInt(number)) ? number + 'px' : number;
}



function getSystemTheme() {
    // Проверяем поддержку matchMedia и prefers-color-scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return isDark ? 'dark' : 'light';
    }
}


const protectedAttributes = new WeakMap()


function connectBaseCSS() {
    const link = document.createElement('link');
    const currentScript = document.currentScript;
    const referenceNode = document.head.querySelector('meta:last-of-type') || document.head.querySelector('title');
    link.rel = 'stylesheet';
    if (currentScript && currentScript.src)
        link.href = currentScript.src.substring(0, currentScript.src.lastIndexOf('/') + 1) + 'hrenpack.css'
    else
        throw new Error("hrenpack.css не подключен")
        const firstStyleOrLink = document.head.querySelector('link, style');
    if (firstStyleOrLink)
        document.head.insertBefore(link, firstStyleOrLink);
    else {
        if (referenceNode)
            referenceNode.parentNode.insertBefore(link, referenceNode.nextSibling);
        else
            document.head.appendChild(link);
    }
}


class MainContent extends HTMLElement {
    static get observedAttributes() {
        return ['use_wrapper']
    }

    constructor() {
        super();
        this.wrapper = document.createElement('div');
        this.wrapper.style.cssText = 'display: flex;\n' +
                '            flex-direction: column;\n' +
                '            min-height: 100vh;\n' +
                '            width: 100%;\n' +
                '            height: 100%;';
        this.main = document.createElement('main');
        this.main.style.cssText = 'flex: 1;\n' +
            '            padding: 20px;\n' +
            '            width: 100%;\n' +
            '            height: 100%;\n';
        this.render();
    }

    render() {
        this.main.innerHTML = this.innerHTML;
        this.innerHTML = '';
        // Если атрибут use_wrapper присутствует, добавляем обертку
        if (this.hasAttribute('use_wrapper')) {
            this.wrapper.appendChild(this.main);
            this.appendChild(this.wrapper);
        } else {
            this.appendChild(this.main);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'use_wrapper') {
            this.render(); // Перерендериваем при изменении атрибута
        }
    }
}


class Container extends HTMLElement {
    static get observedAttributes() {
        return ['left', 'top', 'right', 'bottom', 'all']
    }

    formatAttr(name) {
        if (this.hasAttribute(name))
            return '0';
        let attr = this.getAttribute(name)
        if (!isNaN(attr) && parseInt(attr) !== 0)
            attr += 'px'
        return attr
    }

    constructor() {
        super();
        this.style.marginLeft = this.formatAttr('left')
        this.style.marginRight = this.formatAttr('right')
        this.style.marginTop = this.formatAttr('top')
        this.style.marginBottom = this.formatAttr('bottom')
    }
}


/*
class Crutch extends HTMLElement{
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const paragraph = document.createElement('p');
        paragraph.style.color = 'transparent';
        paragraph.innerHTML = '.';
        shadow.appendChild(paragraph);
    }
}
*/


class PasswordInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' })
        const input = document.createElement('input')
        const button = document.createElement('button')
        input.type = 'password'
    }
}

class MessageBox extends HTMLElement {
    static get observedAttributes() {
        return ['background', 'color']
    }

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        this.div = document.createElement('div');
        this.div.style.cssText = 'width: 100%;\n' +
            'padding: 100px 0;\n' +
            'text-align: center;';
        this.render();
    }

    render() {
        const background = this.getAttribute('background') || 'red'
        const color = this.getAttribute('color') || '#ededed'
        this.div.style.background = background
        this.div.style.color = color
        this.div.innerHTML = this.innerHTML
    }
}


class AbbreviatedNumber extends HTMLElement {
    constructor() {
        super();
        this.isShortened = true;
        this.originalNumber = this.textContent.trim();
        this.render();
        this.addEventListener('click', this.toggle.bind(this));
    }

    toggle() {
        this.isShortened = !this.isShortened;
        this.render();
    }

    getCurrentLang() {
        return this.getAttribute('lang') || document.documentElement.getAttribute('lang') || 'en';
    }

    formatNumber(num, lang) {
        num = parseFloat(num.toString().replace(/[^\d.-]/g, ''));
        if (isNaN(num)) return this.originalNumber;

        const useComma = this.hasAttribute('use_comma');
        const separator = useComma ? ',' : '.';

        const round = (value, digits) => {
            if (digits === 0) return Math.round(value);
            const factor = Math.pow(10, digits);
            return Math.round(value * factor) / factor;
        };

        const format = (value, digits) => {
            const rounded = round(value, digits);
            // Убираем лишние нули в дробной части
            let str = rounded.toString();
            if (digits > 0 && str.includes('.')) {
                str = str.replace(/\.?0+$/, '');
            }
            return str.replace('.', separator);
        };

        const getFractionDigits = (value) => {
            if (value < 10) return 2;
            if (value < 100) return 1;
            return 0;
        };

        if (lang.startsWith('ru')) {
            if (num >= 1000000000000) {
                const value = num / 1000000000000;
                return format(value, getFractionDigits(value)) + ' трлн.';
            }
            if (num >= 1000000000) {
                const value = num / 1000000000;
                return format(value, getFractionDigits(value)) + ' млрд.';
            }
            if (num >= 1000000) {
                const value = num / 1000000;
                return format(value, getFractionDigits(value)) + ' млн.';
            }
            if (num >= 1000) {
                const value = num / 1000;
                return format(value, getFractionDigits(value)) + ' тыс.';
            }
        }
        else {
            if (num >= 1000000000000) {
                const value = num / 1000000000000;
                return format(value, getFractionDigits(value)) + 'T';
            }
            if (num >= 1000000000) {
                const value = num / 1000000000;
                return format(value, getFractionDigits(value)) + 'B';
            }
            if (num >= 1000000) {
                const value = num / 1000000;
                return format(value, getFractionDigits(value)) + 'M';
            }
            if (num >= 1000) {
                const value = num / 1000;
                return format(value, getFractionDigits(value)) + 'K';
            }
        }
        return format(num, 0);
    }

    render() {
        const lang = this.getCurrentLang();
        this.textContent = this.isShortened
            ? this.formatNumber(this.originalNumber, lang)
            : this.originalNumber;
    }
}


class StepElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    z-index: 3;
                    flex: 1;
                }
                .step-circle {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: var(--step-bar-circle-bg);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: var(--step-bar-circle-active-color);
                    font-weight: bold;
                    margin-bottom: 8px;
                    border: 3px solid var(--step-bar-circle-border-color);
                    transition: all 0.3s ease;
                }
                .step-label {
                    font-size: 14px;
                    color: var(--step-bar-label-color);
                }
                :host([completed]) .step-circle {
                    background: var(--step-bar-circle-completed-bg);
                    border: 3px solid var(--step-bar-circle-border-completed-color);
                    color: var(--step-bar-circle-completed-color);
                }
                :host([active]) .step-circle {
                    background: var(--step-bar-circle-active-bg);
                    border: 3px solid var(--step-bar-circle-border-active-color);
                    color: var(--step-bar-circle-active-color);
                }
                :host([completed]) .step-label {
                    color: var(--step-bar-completed-label-color);
                    font-weight: bold;
                }
                :host([active]) .step-label {
                    color: var(--step-bar-active-label-color);
                }
            </style>
            <div class="step-circle"></div>
            <div class="step-label"><slot></slot></div>
        `;
    }

    static get observedAttributes() {
        return ['active', 'completed', 'href']
    }

    get index() {
        return Array.from(this.parentNode.children).indexOf(this) + 1;
    }

    get active() {
        return this.hasAttribute('active')
    }

    set active(force) {
        this.toggleAttribute('active', force)
    }

    get completed() {
        return this.hasAttribute('completed')
    }

    set completed(force) {
        this.toggleAttribute('completed', force)
    }

    reset() {
        this.active = false;
        this.completed = false;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.step-circle').textContent = this.index;
        const currentStep = this.parentElement.currentStep
        console.log(this.index + ' ' + currentStep)
        if (this.index === currentStep)
            this.active = true;
        else if (this.index < currentStep)
            this.completed = true;
    }
}

class Stepbar extends HTMLElement {
    constructor() {
        super();

        // Глобальные стили
        if (!document.querySelector('style[data-stepbar-styles]')) {
            const style = document.createElement('style');
            style.setAttribute('data-stepbar-styles', '');
            style.textContent = `
                stepbar {
                    display: flex;
                    width: 100%;
                    max-width: 800px;
                    margin: 40px auto;
                    position: relative;
                }
            `;
            document.head.appendChild(style);
        }

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <slot></slot>
        `;
    }

    static get observedAttributes() {
        return ['current'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'current') {
            this.updateSteps();
        }
    }

    connectedCallback() {
        if (!this._observer) {
            this._observer = new MutationObserver(() => this.updateSteps());
            this._observer.observe(this, {childList: true});
        }
        this.updateSteps();
    }

    disconnectedCallback() {
        if (this._observer) {
            this._observer.disconnect();
        }
    }

    updateSteps() {
        const currentStep = parseInt(this.getAttribute('current')) || 1;
        const progress = this.shadowRoot.querySelector('.stepbar-progress');
        const elements = Array.from(this.children).filter(el => el.tagName === 'SB-ELEMENT');

        elements.forEach((element, index) => {
            const stepNumber = index + 1;
            element.reset();

            if (stepNumber < currentStep) {
                element.completed = true;
            } else if (stepNumber === currentStep) {
                element.active = true;
            }
        });

        if (elements.length > 1) {
            const progressPercent = ((currentStep - 1) / (elements.length - 1)) * 100;
            progress.style.width = `${progressPercent}%`;
        }
    }

    get currentStep() {
        return this.getAttribute('current')
    }

    set currentStep(step) {
        this.setAttribute('current', step);
        return this;
    }
}


class HTMLFile extends HTMLElement {
    constructor() {
        super();
    }

    // Getter для src
    get src() {
        return this.getAttribute('src');
    }

    // Setter для src
    set src(value) {
        if (value) {
            this.setAttribute('src', value);
        } else {
            this.removeAttribute('src');
        }
    }

    static get observedAttributes() {
        return ['src'];
    }

    connectedCallback() {
        this.loadContent();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'src' && oldValue !== newValue && this.isConnected) {
            this.loadContent();
        }
    }

    async loadContent() {
        const src = this.src;
        if (!src) return;

        try {
            const response = await fetch(src);
            const content = await response.text();

            // Вставляем HTML
            this.innerHTML = content;

            // Принудительно выполняем скрипты
            await this.executeScripts();

        } catch (error) {
            this.innerHTML = `Ошибка загрузки: ${error.message}`;
        }
    }

    async executeScripts() {
        const scripts = this.querySelectorAll('script');

        for (const script of scripts) {
            if (script.src) {
                // Внешний скрипт
                await this.loadExternalScript(script.src);
            } else {
                // Inline скрипт
                this.executeInlineScript(script.textContent);
            }
            // Удаляем оригинальный script тег
            script.remove();
        }
    }

    loadExternalScript(src) {
        return new Promise((resolve, reject) => {
            const newScript = document.createElement('script');
            newScript.src = src;
            newScript.onload = resolve;
            newScript.onerror = reject;
            document.head.appendChild(newScript);
        });
    }

    executeInlineScript(code) {
        try {
            const newScript = document.createElement('script');
            newScript.textContent = code;
            document.head.appendChild(newScript);
            document.head.removeChild(newScript);
        } catch (error) {
            console.error('Ошибка выполнения скрипта:', error);
        }
    }

    // Getter для проверки загрузки
    get loaded() {
        return this.hasAttribute('data-loaded');
    }

    // Метод для перезагрузки
    reload() {
        return this.loadContent();
    }

    // Getter для содержимого
    get content() {
        return this.innerHTML;
    }
}


class ClickToCopy extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', () => {
            navigator.clipboard.writeText(this.textContent);
        });
    }
}


customElements.define('sb-element', StepElement);
customElements.define('step-bar', Stepbar);
customElements.define('main-content', MainContent);
customElements.define('indent-container', Container);
customElements.define('message-box', MessageBox);
customElements.define('ab-num', AbbreviatedNumber)
customElements.define('include-html', HTMLFile);
customElements.define('click-to-copy', ClickToCopy)
connectBaseCSS()



function isAbsoluteUrl(url) {
    try {
        new URL(url); // Попытка создать объект URL
        return true; // Если успешно, это абсолютный URL
    } catch (e) {
        return url[0] === '/' || url[0] === '\\'; // Если ошибка, это относительный URL
    }
}


function generateUUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


