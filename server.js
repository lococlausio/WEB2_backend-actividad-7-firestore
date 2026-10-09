require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

function validar({ nombre, descripcion }) {
  if (!nombre || nombre.trim().length < 3) {
    return 'El nombre debe tener al menos 3 caracteres.';
  }
  if (!descripcion || descripcion.trim().length < 10) {
    return 'La descripción debe tener al menos 10 caracteres.';
  }
  return '';
}

// GET /atractivos - Listar todos
app.get('/atractivos', async (_, res) => {
  try {
    res.json(await db.all());
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener atractivos' });
  }
});

// GET /buscar - Búsqueda por query params (nombre y/o ubicación)
app.get('/buscar', async (req, res) => {
  try {
    const { nombre = '', ubicacion = '' } = req.query;
    const list = await db.search({ nombre, ubicacion });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
});

// GET /atractivos/:id - Obtener uno por ID
app.get('/atractivos/:id', async (req, res) => {
  try {
    const item = await db.findById(Number(req.params.id));
    if (!item) return res.status(404).json({ error: 'Atractivo no encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar atractivo' });
  }
});

// POST /atractivos - Crear atractivo con validación
app.post('/atractivos', async (req, res) => {
  try {
    const error = validar(req.body);
    if (error) return res.status(400).json({ error });

    const nuevo = await db.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear atractivo' });
  }
});

// PUT /atractivos/:id - Actualizar atractivo
app.put('/atractivos/:id', async (req, res) => {
  try {
    const error = validar(req.body);
    if (error) return res.status(400).json({ error });

    const actualizado = await db.update(Number(req.params.id), req.body);
    if (!actualizado) return res.status(404).json({ error: 'Atractivo no encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar atractivo' });
  }
});

// DELETE /atractivos/:id - Eliminar atractivo
app.delete('/atractivos/:id', async (req, res) => {
  try {
    const ok = await db.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: 'Atractivo no encontrado' });
    res.json({ mensaje: 'Atractivo eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar atractivo' });
  }
});

// Ruta no encontrada
app.use((_, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

app.listen(PORT, () => console.log(`API Firestore lista en http://localhost:${PORT}`));