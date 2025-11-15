document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('.language-html');
    const urlRegex = /(https?:\/\/[^\s<]+)/g; // Является ли это регулярное выражение js верным: /(https?:\/\/[^\s&lt;]+)/g
    const factory = new ClickableLinksFactory(urlRegex)
    const notification = new HyperTextNotification({backgroundColor: 'rgba(192,0,192,0.8)'})
    document.querySelector('pre').style.borderRadius = '15px';
    factory.clickToCopyLinks(element);
    factory.generatedElements.forEach(link => {
        link.addEventListener('click', function () {
            notification.show("Ссылка скопирована")
        })
    })
})
