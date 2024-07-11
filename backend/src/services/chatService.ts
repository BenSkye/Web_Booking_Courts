import chatRepository from '../repository/chatRepository'; // Adjust the import path as necessary

interface IChatService {
    createChat(firstId: string, secondId: string): Promise<any>;
    findUserChats(userId: string): Promise<any[]>;
    findChat(firstId: string, secondId: string): Promise<any[]>;
}

class ChatService implements IChatService {
    async createChat(firstId: string, secondId: string): Promise<any> {
        try {
            const chatRepositoryInstance = new chatRepository();
            const chat = await chatRepositoryInstance.findChatByMembers(firstId, secondId);
            if (chat) {
                return chat;
            }
            const newChat = await chatRepositoryInstance.createChat(firstId, secondId);
            return newChat;
        } catch (error) {
            console.error('Error creating chat:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    async findUserChats(userId: string): Promise<any[]> {
        try {
            const chatRepositoryInstance = new chatRepository();
            const chats = await chatRepositoryInstance.findChatsByUserId(userId);
            return chats;
        } catch (error) {
            console.error('Error fetching user chats:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    async findChat(firstId: string, secondId: string): Promise<any[]> {
        try {
            const chatRepositoryInstance = new chatRepository();
            const chats = await chatRepositoryInstance.findChat(firstId, secondId);
            return chats;
        } catch (error) {
            console.error('Error fetching chat:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }
}

export default new ChatService();
