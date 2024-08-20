const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const UserController = require('./controllers/UserController'); // Importa o controlador de usuário

dotenv.config();

const port = 3000;
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(express.json());

// Rotas
app.get("/", (req, res) => {
    res.send("Página inicial");
});

app.post('/login', UserController.login); // Usando o método de login do controlador

app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});
