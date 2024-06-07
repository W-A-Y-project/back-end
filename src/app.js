const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const port = 3000;
const app = express();

const db = require('./models/db');
const User = require('./models/User');

app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(express.json());

app.get("/", async (req, res) => {
    res.send("Página inicial");
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { Email: email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        if (password !== user.Password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.CPF }, process.env.JWT_SECRET || 'mysecret', { expiresIn: '1h' });
        req.session.token = token;
        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
});


app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});
