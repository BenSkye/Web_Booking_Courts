import messageModel from '../models/messageModel';

interface IMessage {
    chatId: string;
    senderId: string;
    text: string;
}

interface IMessageRepository {
    createMessage(chatId: string, senderId: string, text: string): Promise<any>;
    getMessages(chatId: string): Promise<any>;
}

class MessageRepository implements IMessageRepository {
    async createMessage(chatId: string, senderId: string, text: string): Promise<any> {
        const message = new messageModel({ chatId, senderId, text });
        return await message.save();
    }

    async getMessages(chatId: string): Promise<any> {
        return await messageModel.find({ chatId }).exec();
    }
}

export default MessageRepository;
