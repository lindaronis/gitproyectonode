const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

const productos = [
  { id: 1, nombre: 'Producto 1', precio: 10 },
  { id: 2, nombre: 'Producto 2', precio: 20 },
  { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Ruta GET para obtener todos los productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Ruta POST para añadir un nuevo producto
app.post('/productos', (req, res) => {
  const newItem = req.body;
  productos.push(newItem);
  res.status(201).send(newItem);
});

// Ruta PUT para actualizar un producto existente por ID
app.put('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(producto => producto.id === id);

  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body }; // Actualiza solo los campos proporcionados
    res.status(200).send(productos[index]);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

// Ruta DELETE para eliminar un producto por ID
app.delete('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(producto => producto.id === id);

  if (index !== -1) {
    productos.splice(index, 1);  // Elimina el producto del array
    res.status(200).send({ message: 'Producto eliminado correctamente' });
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

// Configuración del puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});

