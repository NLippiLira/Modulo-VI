const apiUrl = 'http://localhost:3000/animes';

document.addEventListener('DOMContentLoaded', cargarAnimes);
document.getElementById('anime-form').addEventListener('submit', guardarAnime);

function cargarAnimes() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById('anime-list');
            lista.innerHTML = '';
            Object.entries(data).forEach(([id, anime]) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${anime.nombre}</strong> (${anime.año}) - ${anime.genero} - ${anime.autor}
                    <button onclick="editarAnime('${id}', ${JSON.stringify(anime).replace(/"/g, '&quot;')})">Editar</button>
                    <button onclick="eliminarAnime('${id}')">Eliminar</button>
                `;
                lista.appendChild(li);
            });
        });
}

function guardarAnime(e) {
    e.preventDefault();
    const id = document.getElementById('anime-id').value;
    const anime = {
        nombre: document.getElementById('nombre').value,
        genero: document.getElementById('genero').value,
        año: document.getElementById('año').value,
        autor: document.getElementById('autor').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anime)
    })
    .then(() => {
        document.getElementById('anime-form').reset();
        document.getElementById('anime-id').value = '';
        cargarAnimes();
    });
}

function editarAnime(id, anime) {
    document.getElementById('anime-id').value = id;
    document.getElementById('nombre').value = anime.nombre;
    document.getElementById('genero').value = anime.genero;
    document.getElementById('año').value = anime.año;
    document.getElementById('autor').value = anime.autor;
}

function eliminarAnime(id) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(() => cargarAnimes());
}

function buscarPorNombre() {
    const nombre = document.getElementById('buscar-nombre').value;
    fetch(`${apiUrl}/nombre/${encodeURIComponent(nombre)}`)
        .then(res => {
            if (!res.ok) throw new Error('No encontrado');
            return res.json();
        })
        .then(anime => {
            document.getElementById('resultado-busqueda').innerText =
                `${anime.nombre} - ${anime.genero} - ${anime.año} - ${anime.autor}`;
        })
        .catch(() => {
            document.getElementById('resultado-busqueda').innerText = 'Anime no encontrado';
        });
}
