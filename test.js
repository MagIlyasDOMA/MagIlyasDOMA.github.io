"use strict";
const site = 'https://magilyasdoma.github.io/', empty = '', relative = '/hrenpack-theme-style/';
function combineUrls(baseUrl, relativeUrl) {
    try {
        if (!baseUrl) {
            if (relativeUrl.startsWith('/'))
                return relativeUrl;
            return '/' + relativeUrl;
        }
        return new URL(relativeUrl, baseUrl).toString();
    }
    catch (error) {
        throw new Error(`Invalid URL combination: ${baseUrl}, ${relativeUrl}`);
    }
}
console.log(combineUrls(site, relative));
console.log(combineUrls(empty, relative));
//# sourceMappingURL=test.js.map