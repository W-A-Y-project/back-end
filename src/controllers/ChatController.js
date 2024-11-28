const Chat = require('../models/Chat');
const Sequelize = require('sequelize');

exports.createChatIfNotExists = async (req, res) => {
    const { user1Cpf, user2Cpf } = req.body;

    try {
        // Verificar se o chat já existe
        const existingChat = await Chat.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { User1_CPF: user1Cpf, User2_CPF: user2Cpf },
                    { User1_CPF: user2Cpf, User2_CPF: user1Cpf }
                ]
            }
        });

        if (existingChat) {
            return res.status(200).json({ message: 'Chat já existe!', chatID: existingChat.ChatID });
        }

        // Criar um novo chat se não existir
        const newChat = await Chat.create({ User1_CPF: user1Cpf, User2_CPF: user2Cpf });

        return res.status(201).json({ message: 'Chat criado!', chatID: newChat.ChatID });

    } catch (error) {
        console.error('Erro ao criar o chat:', error);
        return res.status(500).json({ error: 'Erro ao criar o chat' });
    }
};
