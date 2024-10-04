const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           description: Message from the user to process
 *       example:
 *         message: "What is MAN-01?"
 *
 * /api/chatbot:
 *   post:
 *     summary: Processes the message from the user and returns a response
 *     tags: [Chatbot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: A processed message response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *                   description: The processed message
 *       400:
 *         description: Bad request response if the message is invalid
 */

// Middleware to validate message input
const validateMessage = (req, res, next) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  if (typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message must be a non-empty string' });
  }
  next();
};

router.post('/', validateMessage, (req, res) => {
  const { message } = req.body;
  // Simulating a response that might involve more logic
  const responseMessage = `Processed your message: ${message}`;
  res.json({ reply: responseMessage });
});

module.exports = router;
