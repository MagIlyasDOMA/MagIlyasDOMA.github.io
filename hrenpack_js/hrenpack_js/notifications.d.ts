declare function pushNotification(title?: string, body?: string, icon?: NullStr): void;
declare class HyperTextNotification {
    bottom: string;
    right: string;
    backgroundColor: string;
    color: string;
    padding: string;
    borderRadius: string;
    timeout: number;
    constructor({ bottom, right, backgroundColor, color, padding, borderRadius, timeout }?: {
        bottom?: string | undefined;
        right?: string | undefined;
        backgroundColor?: string | undefined;
        color?: string | undefined;
        padding?: string | undefined;
        borderRadius?: string | undefined;
        timeout?: number | undefined;
    });
    show(message: string, timeout?: number): void;
}
//# sourceMappingURL=notifications.d.ts.map