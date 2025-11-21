"use strict";
const domain = location.protocol + '//' + location.host;
const paramsManager = new GETParamsManager();
let text = '', files = [];
const FILENAME = 'file';
document.addEventListener('DOMContentLoaded', () => {
    const action = paramsManager.get('action');
    let redirect = true;
    switch (action) {
        case 'copy':
            copyButton();
            break;
        case 'download':
            downloadButton();
            break;
        case 'combinate':
            copyButton();
            downloadButton();
            break;
        case null:
        case '':
            redirect = false;
            break;
        default:
            redirect = false;
            paramsManager.delete('action');
            console.warn("Неверное значение параметра action");
    }
    if (redirect) {
        paramsManager.delete('action');
        redirectBackOrClose(window.location.href);
    }
});
//# sourceMappingURL=init.js.map