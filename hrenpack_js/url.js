"use strict";
function isAbsoluteUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (e) {
        return url[0] === '/' || url[0] === '\\';
    }
}
//# sourceMappingURL=url.js.map