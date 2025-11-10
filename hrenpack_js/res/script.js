const url_params = new URLSearchParams(window.location.search)
const table = document.querySelector('table').querySelector('tbody');

if (url_params.get('type') !== 'browsing')
    location.replace('/hrenpack_js/res/hrenpack.js')

fetch('/hrenpack_js/res/files.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        for (const [key, value] of Object.entries(data)) {
            const row = document.createElement('tr');
            const filename_col = document.createElement('td');
            const size_col = document.createElement('td');
            const link = document.createElement('a');
            link.innerHTML = key;
            link.href = `/hrenpack_js/${key}`
            filename_col.appendChild(link);
            size_col.innerHTML = value.toString();
            row.appendChild(filename_col);
            row.appendChild(size_col);
            table.appendChild(row);
        }
    })
    .catch(error => console.log(error));
