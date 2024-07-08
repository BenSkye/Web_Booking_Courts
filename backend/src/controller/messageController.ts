import { Request, Response } from 'express';
import messageService from '../services/messageService';
import catchAsync from '~/utils/catchAsync';

class messageController {
    static createMessage = catchAsync(async (req: any, res: any, next: any) => {
        const { chatId, senderId, text } = req.body;
        const createdMessage = await messageService.createMessage(chatId, senderId, text);
        if (createdMessage) {
            return res.status(200).json(createdMessage);
        } else {
            return res.status(500).json();
        }
    });

    static getMessages = catchAsync(async (req: any, res: any, next: any) => {
        const { chatId } = req.params;
        const messages = await messageService.getMessages(chatId);
        if (messages) {
            return res.status(200).json(messages);
        } else {
            return res.status(500).json();
        }
    });
}

export default messageController;
