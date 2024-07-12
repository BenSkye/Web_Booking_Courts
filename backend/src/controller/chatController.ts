import { Request, Response } from 'express';
import chatService from '../services/chatService';
import catchAsync from '~/utils/catchAsync';

class chatController {
    static createChat = catchAsync(async (req: any, res: any, next: any) => {
        const { firstId, secondId } = req.body;
        const createChat = await chatService.createChat(firstId, secondId);
        if (createChat) {
            return res.status(200).json(createChat);
        } else {
            return res.status(500).json();
        }
    });

    static findUserChats = catchAsync(async (req: any, res: any, next: any) => {
        const { userId } = req.params;
        const userChats = await chatService.findUserChats(userId);
        if (userChats) {
            return res.status(200).json(userChats);
        } else {
            return res.status(500).json();
        }
    });

    static findChat = catchAsync(async (req: any, res: any, next: any) => {
        const { firstId, secondId } = req.params;
        const chat = await chatService.findChat(firstId, secondId);
        if (chat) {
            return res.status(200).json(chat);
        } else {
            return res.status(500).json();
        }
    });
}

export default chatController;
