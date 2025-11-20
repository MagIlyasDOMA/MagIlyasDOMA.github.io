"use strict";
function handleProjectClick(projectPanel, event) {
    const heading = projectPanel.querySelector('h4');
    if (!heading)
        return;
    let url = '/' + heading.innerHTML;
    if (event.button === 0) { // Левая кнопка
        window.location.href = url;
    }
    else if (event.button === 1) { // Средняя кнопка
        event.preventDefault();
        window.open(url, '_blank');
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const projectsElement = document.getElementById('projects');
    if (!projectsElement)
        return;
    const projectPanels = projectsElement.querySelectorAll('.grid-panel');
    projectPanels.forEach(projectPanel => {
        // Обрабатываем клик левой кнопкой
        projectPanel.addEventListener('click', (event) => {
            const mouseEvent = event;
            if (mouseEvent.button === 0) {
                handleProjectClick(projectPanel, mouseEvent);
            }
        });
        // Обрабатываем клик средней кнопкой
        projectPanel.addEventListener('auxclick', (event) => {
            const mouseEvent = event;
            if (mouseEvent.button === 1) {
                handleProjectClick(projectPanel, mouseEvent);
            }
        });
    });
});
//# sourceMappingURL=script.js.map