import { Schema } from 'mongoose'
import Chat from '~/models/chatModel'

interface IChat {
    members: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface IChatRepository {
    findChatByMembers(firstId: string, secondId: string): Promise<IChat | null>;
    createChat(firstId: string, secondId: string): Promise<IChat>;
    findChatsByUserId(userId: string): Promise<IChat[]>;
    findChat(firstId: string, secondId: string): Promise<IChat[]>;
}

class ChatRepository implements IChatRepository {
    async findChatByMembers(firstId: string, secondId: string): Promise<IChat | null> {
        return await Chat.findOne({
            members: { $all: [firstId, secondId] }
        }).exec();
    }

    async createChat(firstId: string, secondId: string): Promise<IChat> {
        const newChat = new Chat({
            members: [firstId, secondId]
        });
        return await newChat.save();
    }

    async findChatsByUserId(userId: string): Promise<IChat[]> {
        return await Chat.find({
            members: { $in: [userId] }
        }).exec();
    }

    async findChat(firstId: string, secondId: string): Promise<IChat[]> {
        return await Chat.find({
            members: { $in: [firstId, secondId] }
        }).exec();
    }
}

export default ChatRepository;