const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const UserController = require('./controllers/UserController'); 
const DisappearedController = require('./controllers/DisappearedController'); 
const MessageController = require('./controllers/MessageController'); 
const ChatController = require('./controllers/ChatController');

dotenv.config();

const port = 3000;
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json());

// Rotas existentes
app.get("/", (req, res) => res.send("Página inicial"));
app.post('/login', UserController.login); 
app.post('/register', UserController.register); 
app.post('/create-disappeared', DisappearedController.createDisappeared)

app.get('/api/messages/:chatID', MessageController.getMessages);  // Obter mensagens
app.post('/api/messages', MessageController.sendMessage);  // Enviar mensagem


app.post('/api/createChatIfNotExists', ChatController.createChatIfNotExists);


app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});
