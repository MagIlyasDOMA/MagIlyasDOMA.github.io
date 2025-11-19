declare class ClickableLinksFactory {
    private readonly urlRegex;
    private walk;
    private get_anchor;
    private get_clickToCopy;
    clickableLinks(element: HTMLElement): void;
    clickToCopyLinks(element: HTMLElement): void;
    get generatedElements(): NodeListOf<HTMLElement>;
}
//# sourceMappingURL=classes.d.ts.map