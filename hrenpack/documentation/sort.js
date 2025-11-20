"use strict";
function sortModuleCards(order = 'asc') {
    const container = document.querySelector('.modules-grid');
    if (!container)
        return;
    const cards = Array.from(document.getElementsByClassName('module-card'));
    cards.sort((a, b) => {
        const filenameA = a.getAttribute('data-filename')?.toLowerCase() || '';
        const filenameB = b.getAttribute('data-filename')?.toLowerCase() || '';
        if (order === 'asc') {
            return filenameA.localeCompare(filenameB);
        }
        else {
            return filenameB.localeCompare(filenameA);
        }
    });
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    cards.forEach(card => {
        container.appendChild(card);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    sortModuleCards();
});
//# sourceMappingURL=sort.js.map