const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.json());

// Rutas
app.get('/api/mensaje', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend!' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});