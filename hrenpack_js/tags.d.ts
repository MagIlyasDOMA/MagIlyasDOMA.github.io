declare function connectBaseCSS(): void;
declare class MainContent extends HTMLElement {
    private wrapper;
    private main;
    static get observedAttributes(): string[];
    constructor();
    private render;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
declare class Container extends HTMLElement {
    static get observedAttributes(): string[];
    private formatAttr;
    constructor();
}
declare class PasswordInput extends HTMLElement {
    constructor();
}
declare class MessageBox extends HTMLElement {
    private div;
    static get observedAttributes(): string[];
    constructor();
    private render;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
declare class AbbreviatedNumber extends HTMLElement {
    private isShortened;
    private originalNumber;
    constructor();
    private toggle;
    private getCurrentLang;
    private formatNumber;
    private render;
}
declare class StepElement extends HTMLElement {
    static get observedAttributes(): string[];
    constructor();
    get index(): number;
    get active(): boolean;
    set active(force: boolean);
    get completed(): boolean;
    set completed(force: boolean);
    reset(): void;
    connectedCallback(): void;
}
declare class Stepbar extends HTMLElement {
    private _observer;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private updateSteps;
    get currentStep(): number;
    set currentStep(step: number);
}
declare class HTMLFile extends HTMLElement {
    static get observedAttributes(): string[];
    constructor();
    get src(): string | null;
    set src(value: string | null);
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    private loadContent;
    private executeScripts;
    private loadExternalScript;
    private executeInlineScript;
    get loaded(): boolean;
    reload(): Promise<void>;
    get content(): string;
}
declare class ClickToCopy extends HTMLElement {
    constructor();
    connectedCallback(): void;
}
//# sourceMappingURL=tags.d.ts.map