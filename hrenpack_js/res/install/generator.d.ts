declare const generator_div: HTMLDivElement;
declare const code_element: HTMLElement;
declare const inputs_div: HTMLDivElement;
declare const selectAllInput: HTMLInputElement;
type AllInputs = NodeListOf<HTMLInputElement>;
declare function getAllInputs(): AllInputs;
declare function getAllInputsNames(): string[];
declare function generate(): void;
declare function generatorCopyButton(): void;
declare function generatorDownloadButton(): void;
declare function selectAll(powerOn?: boolean): void;
//# sourceMappingURL=generator.d.ts.map