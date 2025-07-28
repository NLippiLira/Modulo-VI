const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'anime.json');

app.use(bodyParser.json());

// Función para leer datos
const leerDatos = () => {
    if (!fs.existsSync(DATA_FILE)) return {};
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
};

// Función para guardar datos
const guardarDatos = (datos) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(datos, null, 4));
};

// Obtener todos los animes
app.get('/animes', (req, res) => {
    const datos = leerDatos();
    res.json(datos);
});

// Obtener un anime por ID
app.get('/animes/:id', (req, res) => {
    const datos = leerDatos();
    const anime = datos[req.params.id];
    if (anime) {
        res.json(anime);
    } else {
        res.status(404).json({ error: 'Anime no encontrado' });
    }
});

// Buscar anime por nombre
app.get('/animes/nombre/:nombre', (req, res) => {
    const datos = leerDatos();
    const nombreBuscado = req.params.nombre.toLowerCase();
    const anime = Object.values(datos).find(a => a.nombre.toLowerCase() === nombreBuscado);
    if (anime) {
        res.json(anime);
    } else {
        res.status(404).json({ error: 'Anime no encontrado por nombre' });
    }
});

// Crear un nuevo anime
app.post('/animes', (req, res) => {
    const { nombre, genero, año, autor } = req.body;
    if (!nombre || !genero || !año || !autor) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const datos = leerDatos();
    const nuevoId = (Math.max(...Object.keys(datos).map(Number)) + 1).toString();
    datos[nuevoId] = { nombre, genero, año, autor };
    guardarDatos(datos);
    res.status(201).json({ mensaje: 'Anime creado', id: nuevoId });
});

// Actualizar un anime existente
app.put('/animes/:id', (req, res) => {
    const datos = leerDatos();
    if (!datos[req.params.id]) {
        return res.status(404).json({ error: 'Anime no encontrado' });
    }

    const { nombre, genero, año, autor } = req.body;
    if (!nombre || !genero || !año || !autor) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    datos[req.params.id] = { nombre, genero, año, autor };
    guardarDatos(datos);
    res.json({ mensaje: 'Anime actualizado' });
});

// Eliminar un anime
app.delete('/animes/:id', (req, res) => {
    const datos = leerDatos();
    if (!datos[req.params.id]) {
        return res.status(404).json({ error: 'Anime no encontrado' });
    }

    delete datos[req.params.id];
    guardarDatos(datos);
    res.json({ mensaje: 'Anime eliminado' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
