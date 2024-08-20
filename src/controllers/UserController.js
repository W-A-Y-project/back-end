const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
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
};

module.exports = { login };
