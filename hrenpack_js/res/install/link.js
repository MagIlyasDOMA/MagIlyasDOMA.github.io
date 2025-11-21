"use strict";
function updateLink() {
    const link_div = document.querySelector('#link-div');
    const mainInput = link_div.querySelector('#id_copy_link');
    const cbCopy = link_div.querySelector('#id_cb_cl');
    const cbDownload = link_div.querySelector('#id_cb_dl');
    let action;
    let url = window.location.href;
    const separator = url.includes('?') ? '&' : '?';
    if (cbCopy.checked && cbDownload.checked)
        action = 'combinate';
    else if (cbCopy.checked)
        action = 'copy';
    else if (cbDownload.checked)
        action = 'download';
    if (action)
        url += separator + 'action=' + action;
    mainInput.value = url;
}
function copyLink(input) {
    copyInputToClipboard(input);
    notification.show("Ссылка скопирована");
}
//# sourceMappingURL=link.js.map