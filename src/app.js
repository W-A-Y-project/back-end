const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const UserController = require('./controllers/UserController'); 
const DisappearedController = require('./controllers/DisappearedController'); 

dotenv.config();

const port = 3000;
const app = express();

app.use(cors({
    origin: '*',  // Ou especifique a origem do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],  // Cabeçalhos permitidos
}));
app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.get("/", (req, res) => {
    res.send("Página inicial");
});
app.post('/login', UserController.login); 
app.post('/register', UserController.register); 
app.post('/create-disappeared', DisappearedController.createDisappeared)
app.get('/disappeared', DisappearedController.getAllDisappeared);

app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`); // Corrigi a sintaxe da template string
});
