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

app.post('/chuckNorris', (req, res) => {
  const { category } = req.body;
  console.log(category);
  url = 'https://api.chucknorris.io/jokes/random';
  if(category != 'none'){
    url = `https://api.chucknorris.io/jokes/random?category=${category}`;
  }
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      res.json({ joke: data });
    })
    .catch(error => {
      console.error('Error fetching joke:', error);
      res.status(500).json({ error: 'Failed to fetch joke' });
    });
});

app.get('/categories', (req, res) => {
  fetch('https://api.chucknorris.io/jokes/categories')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      res.json({ categories: data});
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});