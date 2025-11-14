function connectBaseCSS(): void {
    const link = document.createElement('link');
    const currentScript = document.currentScript as HTMLScriptElement;
    const referenceNode = document.head.querySelector('meta:last-of-type') || document.head.querySelector('title');
    link.rel = 'stylesheet';

    if (currentScript && currentScript.src) {
        link.href = currentScript.src.substring(0, currentScript.src.lastIndexOf('/') + 1) + 'hrenpack.css';
    } else {
        throw new Error("hrenpack.css не подключен");
    }

    const firstStyleOrLink = document.head.querySelector('link, style');
    if (firstStyleOrLink) {
        document.head.insertBefore(link, firstStyleOrLink);
    } else {
        if (referenceNode) {
            referenceNode.parentNode?.insertBefore(link, referenceNode.nextSibling);
        } else {
            document.head.appendChild(link);
        }
    }
}

class MainContent extends HTMLElement {
    private wrapper: HTMLDivElement;
    private main: HTMLElement;

    static get observedAttributes(): string[] {
        return ['use_wrapper'];
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

    private render(): void {
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

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
        if (name === 'use_wrapper') {
            this.render(); // Перерендериваем при изменении атрибута
        }
    }
}

class Container extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['left', 'top', 'right', 'bottom', 'all'];
    }

    private formatAttr(name: string): string {
        if (this.hasAttribute(name))
            return '0';
        let attr = this.getAttribute(name) || '0';
        if (!isNaN(parseInt(attr)) && parseInt(attr) !== 0)
            attr += 'px';
        return attr;
    }

    constructor() {
        super();
        this.style.marginLeft = this.formatAttr('left');
        this.style.marginRight = this.formatAttr('right');
        this.style.marginTop = this.formatAttr('top');
        this.style.marginBottom = this.formatAttr('bottom');
    }
}

class PasswordInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const input = document.createElement('input');
        const button = document.createElement('button');
        input.type = 'password';
        // TODO: Добавить логику для компонента PasswordInput
    }
}

class MessageBox extends HTMLElement {
    private div: HTMLDivElement;

    static get observedAttributes(): string[] {
        return ['background', 'color'];
    }

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        this.div = document.createElement('div');
        this.div.style.cssText = 'width: 100%;\n' +
            'padding: 100px 0;\n' +
            'text-align: center;';
        shadow.appendChild(this.div);
        this.render();
    }

    private render(): void {
        const background = this.getAttribute('background') || 'red';
        const color = this.getAttribute('color') || '#ededed';
        this.div.style.background = background;
        this.div.style.color = color;
        this.div.innerHTML = this.innerHTML;
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
        this.render();
    }
}

class AbbreviatedNumber extends HTMLElement {
    private isShortened: boolean = true;
    private originalNumber: string;

    constructor() {
        super();
        this.originalNumber = this.textContent?.trim() || '';
        this.render();
        this.addEventListener('click', this.toggle.bind(this));
    }

    private toggle(): void {
        this.isShortened = !this.isShortened;
        this.render();
    }

    private getCurrentLang(): string {
        return this.getAttribute('lang') || document.documentElement.getAttribute('lang') || 'en';
    }

    private formatNumber(num: string, lang: string): string {
        const parsedNum = parseFloat(num.replace(/[^\d.-]/g, ''));
        if (isNaN(parsedNum)) return this.originalNumber;

        const useComma = this.hasAttribute('use_comma');
        const separator = useComma ? ',' : '.';

        const round = (value: number, digits: number): number => {
            if (digits === 0) return Math.round(value);
            const factor = Math.pow(10, digits);
            return Math.round(value * factor) / factor;
        };

        const format = (value: number, digits: number): string => {
            const rounded = round(value, digits);
            // Убираем лишние нули в дробной части
            let str = rounded.toString();
            if (digits > 0 && str.includes('.')) {
                str = str.replace(/\.?0+$/, '');
            }
            return str.replace('.', separator);
        };

        const getFractionDigits = (value: number): number => {
            if (value < 10) return 2;
            if (value < 100) return 1;
            return 0;
        };

        if (lang.startsWith('ru')) {
            if (parsedNum >= 1000000000000) {
                const value = parsedNum / 1000000000000;
                return format(value, getFractionDigits(value)) + ' трлн.';
            }
            if (parsedNum >= 1000000000) {
                const value = parsedNum / 1000000000;
                return format(value, getFractionDigits(value)) + ' млрд.';
            }
            if (parsedNum >= 1000000) {
                const value = parsedNum / 1000000;
                return format(value, getFractionDigits(value)) + ' млн.';
            }
            if (parsedNum >= 1000) {
                const value = parsedNum / 1000;
                return format(value, getFractionDigits(value)) + ' тыс.';
            }
        } else {
            if (parsedNum >= 1000000000000) {
                const value = parsedNum / 1000000000000;
                return format(value, getFractionDigits(value)) + 'T';
            }
            if (parsedNum >= 1000000000) {
                const value = parsedNum / 1000000000;
                return format(value, getFractionDigits(value)) + 'B';
            }
            if (parsedNum >= 1000000) {
                const value = parsedNum / 1000000;
                return format(value, getFractionDigits(value)) + 'M';
            }
            if (parsedNum >= 1000) {
                const value = parsedNum / 1000;
                return format(value, getFractionDigits(value)) + 'K';
            }
        }
        return format(parsedNum, 0);
    }

    private render(): void {
        const lang = this.getCurrentLang();
        this.textContent = this.isShortened
            ? this.formatNumber(this.originalNumber, lang)
            : this.originalNumber;
    }
}

class StepElement extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['active', 'completed', 'href'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot!.innerHTML = `
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

    get index(): number {
        return Array.from(this.parentNode?.children || []).indexOf(this) + 1;
    }

    get active(): boolean {
        return this.hasAttribute('active');
    }

    set active(force: boolean) {
        this.toggleAttribute('active', force);
    }

    get completed(): boolean {
        return this.hasAttribute('completed');
    }

    set completed(force: boolean) {
        this.toggleAttribute('completed', force);
    }

    reset(): void {
        this.active = false;
        this.completed = false;
    }

    connectedCallback(): void {
        const circleElement = this.shadowRoot!.querySelector('.step-circle');
        if (circleElement) {
            circleElement.textContent = this.index.toString();
        }

        const parent = this.parentElement;
        if (parent && 'currentStep' in parent) {
            const stepbarParent = parent as Stepbar;
            const currentStep = stepbarParent.currentStep;
            console.log(this.index + ' ' + currentStep);
            if (this.index === currentStep)
                this.active = true;
            else if (this.index < currentStep)
                this.completed = true;
        }
    }
}

class Stepbar extends HTMLElement {
    private _observer: MutationObserver | null = null;

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
        this.shadowRoot!.innerHTML = `
            <slot></slot>
        `;
    }

    static get observedAttributes(): string[] {
        return ['current'];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
        if (name === 'current') {
            this.updateSteps();
        }
    }

    connectedCallback(): void {
        if (!this._observer) {
            this._observer = new MutationObserver(() => this.updateSteps());
            this._observer.observe(this, {childList: true});
        }
        this.updateSteps();
    }

    disconnectedCallback(): void {
        if (this._observer) {
            this._observer.disconnect();
        }
    }

    private updateSteps(): void {
        const currentStep = parseInt(this.getAttribute('current') || '1');
        const elements = Array.from(this.children).filter(el => el.tagName === 'SB-ELEMENT') as StepElement[];

        elements.forEach((element, index) => {
            const stepNumber = index + 1;
            element.reset();

            if (stepNumber < currentStep) {
                element.completed = true;
            } else if (stepNumber === currentStep) {
                element.active = true;
            }
        });
    }

    get currentStep(): number {
        return parseInt(this.getAttribute('current') || '1');
    }

    set currentStep(step: number) {
        this.setAttribute('current', step.toString());
    }
}

class HTMLFile extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['src'];
    }

    constructor() {
        super();
    }

    // Getter для src
    get src(): string | null {
        return this.getAttribute('src');
    }

    // Setter для src
    set src(value: string | null) {
        if (value) {
            this.setAttribute('src', value);
        } else {
            this.removeAttribute('src');
        }
    }

    connectedCallback(): void {
        this.loadContent();
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
        if (name === 'src' && oldValue !== newValue && this.isConnected) {
            this.loadContent();
        }
    }

    private async loadContent(): Promise<void> {
        const src = this.src;
        if (!src) return;

        try {
            const response = await fetch(src);
            const content = await response.text();

            // Вставляем HTML
            this.innerHTML = content;

            // Принудительно выполняем скрипты
            await this.executeScripts();

            this.setAttribute('data-loaded', 'true');

        } catch (error) {
            this.innerHTML = `Ошибка загрузки: ${(error as Error).message}`;
        }
    }

    private async executeScripts(): Promise<void> {
        const scripts = this.querySelectorAll('script');

        for (const script of scripts) {
            if (script.src) {
                // Внешний скрипт
                await this.loadExternalScript(script.src);
            } else {
                // Inline скрипт
                this.executeInlineScript(script.textContent || '');
            }
            // Удаляем оригинальный script тег
            script.remove();
        }
    }

    private loadExternalScript(src: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const newScript = document.createElement('script');
            newScript.src = src;
            newScript.onload = () => resolve();
            newScript.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.head.appendChild(newScript);
        });
    }

    private executeInlineScript(code: string): void {
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
    get loaded(): boolean {
        return this.hasAttribute('data-loaded');
    }

    // Метод для перезагрузки
    reload(): Promise<void> {
        return this.loadContent();
    }

    // Getter для содержимого
    get content(): string {
        return this.innerHTML;
    }
}

class ClickToCopy extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(): void {
        this.addEventListener('click', () => {
            navigator.clipboard.writeText(this.textContent || '');
        });
    }
}

// Регистрация кастомных элементов
customElements.define('sb-element', StepElement);
customElements.define('step-bar', Stepbar);
customElements.define('main-content', MainContent);
customElements.define('indent-container', Container);
customElements.define('message-box', MessageBox);
customElements.define('ab-num', AbbreviatedNumber);
customElements.define('include-html', HTMLFile);
customElements.define('click-to-copy', ClickToCopy);

connectBaseCSS();