const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync('anime.json', 'utf-8');


const app = express();
const DATA_FILE = path.join(__dirname, 'anime.json');

app.use(bodyParser.json());

// Rutas reutilizadas para test
app.get('/animes', (req, res) => {
   (DATA_FILE);
    res.json(JSON.parse(data));
});

app.get('/animes/:id', (req, res) => {
    const data = fs.readFileSync(DATA_FILE);
    const animes = JSON.parse(data);
    const anime = animes[req.params.id];
    if (anime) {
        res.json(anime);
    } else {
        res.status(404).send('Anime no encontrado');
    }
});

describe('Test de rutas CRUD', () => {
    it('Debe obtener todos los animes', async () => {
        const res = await request(app).get('/animes');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('1');
    });

    it('Debe obtener un anime por ID', async () => {
        const res = await request(app).get('/animes/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('nombre', 'Akira');
    });

    it('Debe retornar 404 si el anime no existe', async () => {
        const res = await request(app).get('/animes/999');
        expect(res.statusCode).toEqual(404);
    });
});

app.get('/animes', (req, res) => {
    try {
        const data = fs.readFileSync('anime.json', 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el archivo' });
    }
});
