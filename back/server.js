const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.json());

// class Usuario {
//   constructor(username, password) {
//     this.username = username;
//     this.password = password;
//   }
// }

const Users = [
  {username: "admin", password: "password"}
];

// Rutas
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = Users.find(u => u.username === username && u.password === password);
  if (user) {
    console.log("Usuario autentificado");
    res.json({ success: true });
  } else {
    console.log("Accesso negado");
    res.json({ success: false });
  }
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const userExists = Users.find(u => u.username === username); // busca que el usuario no exista
  if (userExists) {
    console.log("Username already exists");
    res.json({ success: false, message: 'El nombre de usuario ya existe' });
  } else {
    Users.push({ username, password });
    console.log("User registered successfully");
    res.json({ success: true, message: 'Usuario registrado correctamente'});
  }
});

app.post('/chuckNorris', (req, res) => {
  const { category, num } = req.body;
  console.log(category);

  let url = 'https://api.chucknorris.io/jokes/random';
  if (category !== 'none') {
    url = `https://api.chucknorris.io/jokes/random?category=${category}`;
  }

  const promises = Array.from({length: num}, () =>
    fetch(url)
      .then(response => response.json())
  );

  Promise.all(promises)
    .then(jokes => {
      console.log(jokes);
      res.json({jokes});
    })
    .catch(error => {
      console.error('Error fetching jokes:', error);
      res.status(500).json({ error: 'Failed to fetch jokes' });
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