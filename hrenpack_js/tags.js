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


customElements.define('sb-element', StepElement);
customElements.define('step-bar', Stepbar);
customElements.define('main-content', MainContent);
customElements.define('indent-container', Container);
customElements.define('message-box', MessageBox);
customElements.define('ab-num', AbbreviatedNumber)
customElements.define('include-html', HTMLFile);
connectBaseCSS()
