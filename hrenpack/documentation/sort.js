function sortModuleCards(order = 'asc') {
    const container = document.querySelector('.modules-grid');
    const cards = Array.from(document.getElementsByClassName('module-card'));

    // Сортируем массив элементов по data-filename
    cards.sort((a, b) => {
        const filenameA = a.getAttribute('data-filename').toLowerCase();
        const filenameB = b.getAttribute('data-filename').toLowerCase();

        if (order === 'asc') {
            return filenameA.localeCompare(filenameB);
        } else {
            return filenameB.localeCompare(filenameA);
        }
    });

    // Удаляем все элементы из контейнера
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Добавляем отсортированные элементы обратно
    cards.forEach(card => {
        container.appendChild(card);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    sortModuleCards()
})
