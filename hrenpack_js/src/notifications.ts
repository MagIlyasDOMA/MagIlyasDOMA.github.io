function pushNotification(title: string = "Уведомление", body: string = "Текст уведомления", icon: string | undefined = undefined): void {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, {
                    body: body,
                    icon: icon // Опционально: иконка уведомления
                });
            }
        });
    } else {
        new Notification(title, {
            body: body,
            icon: icon // Опционально: иконка уведомления
        });
    }
}

interface HyperTextNotificationOptions {
    bottom?: string | number;
    right?: string | number;
    backgroundColor?: string;
    color?: string;
    padding?: string | number;
    borderRadius?: string | number;
    timeout?: number;
}

class HyperTextNotification {
    private bottom: string;
    private right: string;
    private backgroundColor: string;
    private color: string;
    private padding: string;
    private borderRadius: string;
    private timeout: number;

    constructor({
                    bottom = '20',
                    right = '20',
                    backgroundColor = '#121212',
                    color = '#ededed',
                    padding = '15',
                    borderRadius = '5',
                    timeout = 3
                }: HyperTextNotificationOptions = {}) {
        this.bottom = intToPixel(bottom);
        this.right = intToPixel(right);
        this.backgroundColor = backgroundColor;
        this.color = color;
        this.padding = intToPixel(padding);
        this.borderRadius = intToPixel(borderRadius);
        this.timeout = timeout;
    }

    show(message: string, timeout: number = 0): void {
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

        timeout = timeout === 0 ? this.timeout : timeout;
        document.body.appendChild(notification);

        // Удаляем уведомление через указанное время
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, timeout * 1000);
    }
}

// Нужно импортировать функцию из styles.ts
declare function intToPixel(number: string | number): string;