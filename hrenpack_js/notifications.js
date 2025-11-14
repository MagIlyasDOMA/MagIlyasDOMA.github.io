function pushNotification(title= "Уведомление", body = "Текст уведомления", icon = null) {
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


class HyperTextNotification {
    constructor({ bottom = '20', right = '20', backgroundColor = '#121212',
                    color = '#ededed', padding = '15', borderRadius = '5', timeout = 3 } = {}) {
        this.bottom = intToPixel(bottom);
        this.right = intToPixel(right);
        this.backgroundColor = backgroundColor;
        this.color = color;
        this.padding = intToPixel(padding);
        this.borderRadius = intToPixel(borderRadius);
        this.timeout = timeout;
    }

    show(message, timeout= 0) {
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
        timeout = timeout === 0 ? this.timeout : timeout
        document.body.appendChild(notification);

        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            document.body.removeChild(notification);
        }, timeout * 1000);
    }
}
