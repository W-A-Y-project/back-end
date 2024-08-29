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

        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.CPF }, process.env.JWT_SECRET || 'mysecret', { expiresIn: '1h' });
        req.session.token = token;
        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
};

const register = async (req, res) => {
    const { cpf, fullName, email, password, phone, city, state, postalCode } = req.body;

    try {
        const existingUser = await User.findOne({ where: { Email: email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const existingCpf = await User.findOne({ where: { CPF: cpf } });
        if (existingCpf) {
            return res.status(400).json({ error: 'CPF already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            CPF: cpf,
            FullName: fullName,
            Email: email,
            Password: hashedPassword,
            Phone: phone,
            City: city,
            State: state,
            PostalCode: postalCode
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ error: 'An error occurred while registering', details: error.message });
    }
};

module.exports = {
    login,
    register
};
