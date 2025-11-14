declare function pushNotification(title?: string, body?: string, icon?: string | undefined): void;
interface HyperTextNotificationOptions {
    bottom?: string | number;
    right?: string | number;
    backgroundColor?: string;
    color?: string;
    padding?: string | number;
    borderRadius?: string | number;
    timeout?: number;
}
declare class HyperTextNotification {
    private bottom;
    private right;
    private backgroundColor;
    private color;
    private padding;
    private borderRadius;
    private timeout;
    constructor({ bottom, right, backgroundColor, color, padding, borderRadius, timeout }?: HyperTextNotificationOptions);
    show(message: string, timeout?: number): void;
}
declare function intToPixel(number: string | number): string;
//# sourceMappingURL=notifications.d.ts.map