declare class ClickableLinksFactory {
    static readonly defaultURLRejex: RegExp;
    private urlRegex;
    constructor(urlRegex?: RegExp | null);
    private walk;
    private get_anchor;
    private get_clickToCopy;
    clickableLinks(element: HTMLElement): void;
    clickToCopyLinks(element: HTMLElement): void;
    get generatedElements(): NodeListOf<Element>;
}
//# sourceMappingURL=classes.d.ts.map