"use strict";
class NotAuthorizedError extends Error {
    constructor() {
        super("Пользователь не авторизован");
        this.name = 'NotAuthorizedError';
    }
}
//# sourceMappingURL=exceptions.js.map