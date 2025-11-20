declare class ClickableLinksFactory {
    private readonly urlRegex;
    private walk;
    private get_anchor;
    private get_clickToCopy;
    clickableLinks(element: HTMLElement): void;
    clickToCopyLinks(element: HTMLElement): void;
    get generatedElements(): NodeListOf<HTMLElement>;
}
declare class GETParamsManager {
    private params;
    constructor();
    get<T = string>(key: string, defaultValue?: T): T | string | null;
    set(key: string, value: string | number | boolean): void;
    delete(key: string): void;
    all(): Record<string, string>;
    clear(): void;
    private updateURL;
}
//# sourceMappingURL=classes.d.ts.map