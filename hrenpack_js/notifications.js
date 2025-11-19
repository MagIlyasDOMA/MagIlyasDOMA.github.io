"use strict";
function pushNotification(title = "Уведомление", body = "Текст уведомления", icon = null) {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                if (icon)
                    new Notification(title, { body: body, icon: icon });
                else
                    new Notification(title, { body: body });
            }
        });
    }
    else {
        if (icon)
            new Notification(title, { body: body, icon: icon });
        else
            new Notification(title, { body: body });
    }
}
class HyperTextNotification {
    constructor({ bottom = '20', right = '20', backgroundColor = '#121212', color = '#ededed', padding = '15', borderRadius = '5', timeout = 3 } = {}) {
        Object.defineProperty(this, "bottom", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "right", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "backgroundColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "color", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "padding", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "borderRadius", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.bottom = intToPixel(bottom);
        this.right = intToPixel(right);
        this.backgroundColor = backgroundColor;
        this.color = color;
        this.padding = intToPixel(padding);
        this.borderRadius = intToPixel(borderRadius);
        this.timeout = timeout;
    }
    show(message, timeout = 0) {
        const notification = document.createElement("div");
        notification.textContent = message;
        notification.style.position = "fixed";
        notification.style.bottom = this.bottom;
        notification.style.right = this.right;
        notification.style.backgroundColor = this.backgroundColor;
        notification.style.color = this.color;
        notification.style.padding = this.padding;
        notification.style.borderRadius = this.borderRadius;
        notification.style.zIndex = "1000";
        const actualTimeout = timeout === 0 ? this.timeout : timeout;
        document.body.appendChild(notification);
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, actualTimeout * 1000);
    }
}
//# sourceMappingURL=notifications.js.map