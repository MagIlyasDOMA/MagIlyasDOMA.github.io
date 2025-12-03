declare const protectedAttributes: WeakMap<object, any>;
type StepElementStatus = 'uncomplete' | 'active' | 'complete';
interface StepbarElement extends HTMLElement {
    currentStep: number;
}
declare class AbbreviatedNumber extends HTMLElement {
    isShortened: boolean;
    originalNumber: number;
    constructor();
    private toggle;
    private getCurrentLang;
    private formatNumber;
    private render;
}
declare class StepElement extends HTMLElement {
    constructor();
    static get observedAttributes(): string[];
    get index(): number;
    private get active();
    private set active(value);
    private get completed();
    private set completed(value);
    private reset;
    get status(): StepElementStatus;
    set status(value: StepElementStatus);
    connectedCallback(): void;
}
declare class Stepbar extends HTMLElement {
    private _observer;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private updateSteps;
    get currentStep(): number;
    set currentStep(step: number);
}
declare class HTMLFile extends HTMLElement {
    constructor();
    get src(): string;
    set src(value: string);
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    private loadContent;
    private executeScripts;
    private loadExternalScript;
    private executeInlineScript;
    private get loaded();
    reload(): Promise<void>;
    get content(): string;
}
declare class ClickToCopy extends HTMLElement {
    private notification;
    constructor();
    get notificationText(): string;
    set notificationText(value: string);
    get isNotified(): boolean;
    set isNotified(value: boolean);
    connectedCallback(): void;
}
//# sourceMappingURL=tags.d.ts.map