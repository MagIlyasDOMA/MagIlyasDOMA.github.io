var ClickableLinksFactory = /** @class */ (function () {
    function ClickableLinksFactory() {
        this.urlRegex = /(https?:\/\/[^\s]+)/g;
    }
    ClickableLinksFactory.prototype.walk = function (node, isClickToCopy) {
        var _this = this;
        if (node.nodeType === Node.TEXT_NODE) {
            var text = node.textContent;
            var func_1 = isClickToCopy ? this.get_clickToCopy : this.get_anchor;
            if (this.urlRegex.test(text)) {
                var parent_1 = node.parentNode;
                var newContent = text.replace(this.urlRegex, function (url) {
                    return func_1(url);
                });
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = newContent;
                while (tempDiv.firstChild) {
                    parent_1.insertBefore(tempDiv.firstChild, node);
                }
                parent_1.removeChild(node);
            }
        }
        else {
            node.childNodes.forEach(function (child) {
                _this.walk(child, isClickToCopy);
            });
        }
    };
    ClickableLinksFactory.prototype.get_anchor = function (url) {
        return "<a href=\"".concat(url, "\" target=\"_blank\" rel=\"noopener noreferrer\" data-clf-generated>").concat(url, "</a>");
    };
    ClickableLinksFactory.prototype.get_clickToCopy = function (url) {
        return "<click-to-copy data-clf-generated>".concat(url, "</click-to-copy>");
    };
    ClickableLinksFactory.prototype.clickableLinks = function (element) {
        this.walk(element, false);
    };
    ClickableLinksFactory.prototype.clickToCopyLinks = function (element) {
        this.walk(element, true);
    };
    Object.defineProperty(ClickableLinksFactory.prototype, "generatedElements", {
        get: function () {
            return document.querySelectorAll('[data-clf-generated]');
        },
        enumerable: false,
        configurable: true
    });
    return ClickableLinksFactory;
}());
