//dependences
const express = require('express');
const cors = require('cors');
//my files
const {connection} = require('./config/database');
const logger = require('./utils/logger');
//load envs
process.loadEnvFile();
//import routes
const userRoutes = require('./routes/userRoutes');

//dbConnection
connection();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(logger.expressMiddleware);

// Routes
app.use('/api/usuarios', userRoutes);

//start server

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen({port: PORT, host: HOST}, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

module.exports = app;