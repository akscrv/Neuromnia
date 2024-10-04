const express = require('express');
const router = express.Router();
const fs = require('fs');
const csv = require('csv-parser');

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



// Here i tried to make it more Efficient 
const milestoneMap = new Map(); // For quick lookup by code
const domainLevelMap = new Map(); // Nested Map for domain and level

// Load CSV data into memory and structure it
fs.createReadStream('vb_mapp_milestones.csv')
  .pipe(csv())
  .on('data', (data) => {
    milestoneMap.set(data['Skill Code'], data.Milestone);

    const domainLevelKey = `${data.Domain.toLowerCase()}|${data.Level}`;
    if (!domainLevelMap.has(domainLevelKey)) {
      domainLevelMap.set(domainLevelKey, []);
    }
    domainLevelMap.get(domainLevelKey).push({ code: data['Skill Code'], description: data.Milestone });
  })
  .on('end', () => {
    console.log('Loaded vb_mapp_milestones.csv into memory when the server starts.');
  });

// Middleware to validate the message input based on the type of request
const validateMessage = (req, res, next) => {
  const { type, code, domain, level } = req.body;

  if (!type || (type !== 'lookup' && type !== 'list')) {
    return res.status(400).json({ error: 'Type must be either "lookup" or "list".' });
  }

  if (type === 'lookup' && (!code || typeof code !== 'string' || code.trim().length === 0)) {
    return res.status(400).json({ error: 'Code is required and must be a non-empty string for lookup type.' });
  }

  if (type === 'list' && (!domain || typeof domain !== 'string' || domain.trim().length === 0 || !level || typeof level !== 'string' || level.trim().length === 0)) {
    return res.status(400).json({ error: 'Both domain and level are required and must be non-empty strings for list type.' });
  }

  next();
};

// Unified API endpoint to handle both lookup and list operations
router.post('/', validateMessage, (req, res) => {
  const { type, code, domain, level } = req.body;

  if (type === 'lookup') {
    const milestone = milestoneMap.get(code);
    if (milestone) {
      res.json({ description: milestone });
    } else {
      res.status(404).json({ error: 'Milestone not found' });
    }
  } else if (type === 'list') {
    const domainLevelKey = `${domain.toLowerCase()}|${level}`;
    const milestones = domainLevelMap.get(domainLevelKey);
    if (milestones) {
      res.json({ milestones });
    } else {
      res.status(404).json({ error: 'No milestones found for this domain and level' });
    }
  }
});

module.exports = router;