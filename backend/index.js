const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const chatbotRoute = require('./routes/chatbot');

const app = express();

// Middleware to parse JSON and add security headers
app.use(express.json());
app.use(helmet()); // Adds extra headers to protect from well-known web vulnerabilities

// Rate limiting to prevent abuse
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Neuromnia API',
      version: '1.0.0',
      description: 'API for the Neuromnia project managing VB-MAPP milestones'
    },
    servers: [
      {
        url: 'http://localhost:3001'
      }
    ],
  },
  apis: ['./routes/*.js'], // paths to files containing Swagger annotations
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Route for the chatbot API
app.use('/api/chatbot', chatbotRoute);

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/neuromnia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Setting the server to listen on a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
