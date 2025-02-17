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
app.get('/mensaje', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend!' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // console.log(`${username} y ${password}`);
  if (username === 'admin' && password === 'password') {
    console.log("Usuario autentificado");
    res.json({ success: true });
  } else {
    console.log("Accesso negado");
    res.json({ success: false });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});