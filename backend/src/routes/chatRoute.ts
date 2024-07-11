import { Router } from 'express'
import chatController from '~/controller/chatController'
const chatRouter = Router()

chatRouter.route('/').post(chatController.createChat)
chatRouter.route('/:userId').get(chatController.findUserChats)
chatRouter.route('/find/:firstId/:secondId').get(chatController.findChat)

export default chatRouter
