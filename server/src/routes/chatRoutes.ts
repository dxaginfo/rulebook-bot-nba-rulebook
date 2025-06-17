import express from 'express';
import chatController from '../controllers/chatController';

const router = express.Router();

/**
 * @route POST /api/chat/message
 * @desc Send a message to the chatbot
 * @access Public
 */
router.post('/message', chatController.sendMessage);

/**
 * @route GET /api/chat/history
 * @desc Get chat history
 * @access Public
 */
router.get('/history', chatController.getChatHistory);

/**
 * @route DELETE /api/chat/history
 * @desc Clear chat history
 * @access Public
 */
router.delete('/history', chatController.clearChatHistory);

export default router;