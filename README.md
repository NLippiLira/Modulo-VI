# 📺 Anime API - Node.js CRUD Server

Este proyecto es una API RESTful construida con Node.js que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre un archivo `anime.json` que contiene información de animes japoneses.

## 📁 Estructura del Proyecto

📦anime-api ┣ 📄index.js ┣ 📄anime.json ┣ 📄package.json ┗ 📄README.md


## 🚀 Requisitos Previos

- Node.js (v14 o superior)
- npm (Node Package Manager)
- Postman (para pruebas)

## 🔧 Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/tu-usuario/anime-api.git
cd anime-api

2) Instala las dependencias:
npm install

3) Asegúrate de tener el archivo anime.json con la siguiente estructura:

{
  "1": {
    "nombre": "Akira",
    "genero": "Seinen",
    "año": "1988",
    "autor": "Katsuhiro Otomo"
  },
  "2": {
    "nombre": "Dragon Ball",
    "genero": "Shonen",
    "año": "1986",
    "autor": "Akira Toriyama"
  },
  "3": {
    "nombre": "Sailor Moon",
    "genero": "Shojo",
    "año": "1992",
    "autor": "Naoko Takeuchi"
  },
  "4": {
    "nombre": "Naruto",
    "genero": "Shonen",
    "año": "2002",
    "autor": "Masashi Kishimoto"
  },
  "5": {
    "nombre": "Neon Genesis Evangelion",
    "genero": "Mecha",
    "año": "1995",
    "autor": "Yoshiyuki Sadamoto"
  }
}
4) ejecutar el servidor

node index.js

El servidor se ejecutará en http://localhost:3000 (o el puerto que definas).

📌 Funcionalidades
🔍 Obtener todos los animes
GET /animes

🔍 Obtener anime por ID
GET /animes/:id

🔍 Obtener anime por nombre
GET /animes/nombre/:nombre

➕ Agregar un nuevo anime
POST /animes

Body (JSON):


✏️ Actualizar un anime
PUT /animes/:id

Body (JSON): (igual que POST)

❌ Eliminar un anime
DELETE /animes/:id

🧪 Pruebas con Postman
Abre Postman.
Crea una nueva colección llamada Anime API.
Agrega las rutas mencionadas arriba.
Prueba cada una de las funcionalidades con los métodos correspondientes.
✅ Test del Servidor
Puedes agregar un test básico con alguna librería como jest o supertest para validar que el servidor responde correctamente.

📚 Créditos
Proyecto desarrollado como parte del Drill Módulo 6 - E-Camp Edutecno.

}
