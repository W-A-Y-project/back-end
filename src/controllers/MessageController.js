const { Message } = require('../models/message'); 
const { User } = require('../models/User'); // Modelo para tabela USER
const { Chat } = require('../models/chat'); // Modelo para tabela CHAT

// Função para buscar todas as mensagens de um chat específico
const getMessages = async (req, res) => {
    const { chatID } = req.params;

    try {
        const messages = await Message.findAll({
            where: { ChatID: chatID },
            include: [
                {
                    model: User,
                    attributes: ['FullName'],
                    as: 'Sender', // Alias conforme a relação definida no modelo
                },
            ],
            order: [['SentAt', 'ASC']],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error('Erro ao buscar mensagens:', error.message);
        res.status(500).json({ error: 'Erro ao buscar mensagens' });
    }
};

// Função para enviar uma nova mensagem
const sendMessage = async (req, res) => {
    const { chatID, senderCPF, text } = req.body;

    if (!chatID || !senderCPF || !text) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }

    try {
        // Verificar se o chat existe
        const chat = await Chat.findByPk(chatID);

        if (!chat) {
            return res.status(404).json({ error: 'Chat não encontrado' });
        }

        // Criar a nova mensagem
        const newMessage = await Message.create({
            ChatID: chatID,
            Sender_CPF: senderCPF,
            Text: text,
            SentAt: new Date(),
        });

        res.status(201).json({ message: 'Mensagem enviada com sucesso', newMessage });
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error.message);
        res.status(500).json({ error: 'Erro ao enviar mensagem' });
    }
};

module.exports = {
    getMessages,
    sendMessage,
};
