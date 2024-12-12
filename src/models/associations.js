const { Message } = require('./message');
const { User } = require('./User');
const { Chat } = require('./chat');

// Relacionamentos
Message.belongsTo(User, { foreignKey: 'Sender_CPF', as: 'Sender' });
User.hasMany(Message, { foreignKey: 'Sender_CPF' });

Chat.hasMany(Message, { foreignKey: 'ChatID' });
Message.belongsTo(Chat, { foreignKey: 'ChatID' });
