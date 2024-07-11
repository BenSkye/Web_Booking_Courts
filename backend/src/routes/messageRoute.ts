import { Router } from 'express'
import chatController from '~/controller/chatController'
import messageController from '~/controller/messageController'
const messageRouter = Router()

messageRouter.route('/').post(messageController.createMessage)
messageRouter.route('/:chatId').get(messageController.getMessages)

export default messageRouter
