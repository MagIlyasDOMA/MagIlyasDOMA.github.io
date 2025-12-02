"use strict";
const protectedAttributes = new WeakMap();
class AbbreviatedNumber extends HTMLElement {
    constructor() {
        super();
        Object.defineProperty(this, "isShortened", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "originalNumber", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.isShortened = true;
        this.originalNumber = parseFloat(this.textContent?.trim() || '0');
        this.render();
        this.addEventListener('click', this.toggle.bind(this));
        if (isNaN(this.originalNumber))
            throw new TypeError('The value must be a number');
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
        if (isNaN(num))
            return this.originalNumber.toString();
        const useComma = this.hasAttribute('use_comma');
        const separator = useComma ? ',' : '.';
        const round = (value, digits) => {
            if (digits === 0)
                return Math.round(value);
            const factor = Math.pow(10, digits);
            return Math.round(value * factor) / factor;
        };
        const format = (value, digits) => {
            const rounded = round(value, digits);
            let str = rounded.toString();
            if (digits > 0 && str.includes('.')) {
                str = str.replace(/\.?0+$/, '');
            }
            return str.replace('.', separator);
        };
        const getFractionDigits = (value) => {
            if (value < 10)
                return 2;
            if (value < 100)
                return 1;
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
            : this.originalNumber.toString();
    }
}
class StepElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <div data-sb-generated="circle"></div>
            <div data-sb-generated="label"><slot></slot></div>
        `;
    }
    static get observedAttributes() {
        return ['active', 'completed', 'href'];
    }
    get index() {
        return Array.from(this.parentNode.children).indexOf(this) + 1;
    }
    get active() {
        return this.hasAttribute('active');
    }
    set active(force) {
        this.toggleAttribute('active', force);
    }
    get completed() {
        return this.hasAttribute('completed');
    }
    set completed(force) {
        this.toggleAttribute('completed', force);
    }
    reset() {
        this.active = false;
        this.completed = false;
    }
    get status() {
        if (this.active)
            return 'active';
        else if (this.completed)
            return 'complete';
        else
            return 'uncomplete';
    }
    set status(value) {
        this.reset();
        switch (value) {
            case 'complete':
                this.completed = true;
                break;
            case 'active':
                this.active = true;
                break;
            case 'uncomplete':
                break;
            default:
                throw new TypeError(`Unknown status: ${value}`);
        }
    }
    connectedCallback() {
        this.shadowRoot.querySelector('[data-sb-generated="circle"]').textContent = this.index.toString();
        const parent = this.parentElement;
        const currentStep = parent.currentStep || 1;
        console.log(this.index + ' ' + currentStep);
        if (this.index === currentStep)
            this.active = true;
        else if (this.index < currentStep)
            this.completed = true;
    }
}
class Stepbar extends HTMLElement {
    constructor() {
        super();
        Object.defineProperty(this, "_observer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <div class="stepbar-progress"></div>
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
            this._observer.observe(this, { childList: true });
        }
        this.updateSteps();
    }
    disconnectedCallback() {
        if (this._observer) {
            this._observer.disconnect();
        }
    }
    updateSteps() {
        const currentStep = parseInt(this.getAttribute('current') || '1');
        const elements = Array.from(this.children).filter((el) => el.tagName === 'SB-ELEMENT');
        elements.forEach((element, index) => {
            const stepNumber = index + 1;
            element.status = 'uncomplete';
            if (stepNumber < currentStep) {
                element.status = 'complete';
            }
            else if (stepNumber === currentStep) {
                element.status = 'active';
            }
        });
    }
    get currentStep() {
        return parseInt(this.getAttribute('current') || '1');
    }
    set currentStep(step) {
        this.setAttribute('current', step.toString());
    }
}
class HTMLFile extends HTMLElement {
    constructor() {
        super();
    }
    get src() {
        return this.getAttribute('src') || '';
    }
    set src(value) {
        if (value) {
            this.setAttribute('src', value);
        }
        else {
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
        if (!src)
            return;
        try {
            const response = await fetch(src);
            const content = await response.text();
            this.innerHTML = content;
            await this.executeScripts();
        }
        catch (error) {
            this.innerHTML = `Ошибка загрузки: ${error.message}`;
        }
    }
    async executeScripts() {
        const scripts = this.querySelectorAll('script');
        for (const script of scripts) {
            if (script.src) {
                await this.loadExternalScript(script.src);
            }
            else {
                this.executeInlineScript(script.textContent || '');
            }
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
        }
        catch (error) {
            console.error('Ошибка выполнения скрипта:', error);
        }
    }
    get loaded() {
        return this.hasAttribute('data-loaded');
    }
    reload() {
        return this.loadContent();
    }
    get content() {
        return this.innerHTML;
    }
}
class ClickToCopy extends HTMLElement {
    constructor() {
        super();
        Object.defineProperty(this, "notification", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.notification = new HyperTextNotification({ backgroundColor: 'rgba(192,0,192,0.8)' });
    }
    get notificationText() {
        return this.getAttribute('text') || "Скопировано";
    }
    set notificationText(value) {
        if (value)
            this.setAttribute('text', value);
        else
            this.removeAttribute('text');
    }
    get isNotified() {
        return this.hasAttribute('notified');
    }
    set isNotified(value) {
        if (value)
            this.setAttribute('notified', '');
        else
            this.removeAttribute('notified');
    }
    connectedCallback() {
        this.addEventListener('click', () => {
            navigator.clipboard.writeText(this.textContent || '');
            if (this.isNotified)
                this.notification.show(this.notificationText);
        });
    }
}
customElements.define('sb-element', StepElement);
customElements.define('step-bar', Stepbar);
customElements.define('ab-num', AbbreviatedNumber);
customElements.define('include-html', HTMLFile);
customElements.define('click-to-copy', ClickToCopy);
//# sourceMappingURL=tags.js.map