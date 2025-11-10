function handleProjectClick(projectPanel, event) {
    let url = '/' + projectPanel.querySelector('h4').innerHTML;
    if (url === '/hrenpack_js')
        url += '?type=browsing';

    if (event.button === 0) { // Левая кнопка
        window.location.href = url;
    } else if (event.button === 1) { // Средняя кнопка
        event.preventDefault();
        window.open(url, '_blank');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    for (let projectPanel of document.getElementById('projects').querySelectorAll('.grid-panel')) {
        // Обрабатываем клик левой кнопкой
        projectPanel.addEventListener('click', (event) => {
            if (event.button === 0) {
                handleProjectClick(projectPanel, event);
            }
        });

        // Обрабатываем клик средней кнопкой
        projectPanel.addEventListener('auxclick', (event) => {
            if (event.button === 1) {
                handleProjectClick(projectPanel, event);
            }
        });
    }
});