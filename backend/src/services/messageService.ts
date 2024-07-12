import MessageRepository from '../repository/messageRepository'; // Adjust the import path as necessary

interface IMessageService {
    createMessage(chatId: string, senderId: string, text: string): Promise<any>;
    getMessages(chatId: string): Promise<any[]>;
}

class MessageService implements IMessageService {
    async createMessage(chatId: string, senderId: string, text: string): Promise<any> {
        try {
            const messageRepositoryInstance = new MessageRepository();
            const message = await messageRepositoryInstance.createMessage(chatId, senderId, text);
            return message;
        } catch (error) {
            console.error('Error creating message:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    async getMessages(chatId: string): Promise<any[]> {
        try {
            const messageRepositoryInstance = new MessageRepository();
            const messages = await messageRepositoryInstance.getMessages(chatId);
            return messages;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }
}

export default new MessageService();
