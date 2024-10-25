//dependences
const express = require('express');
const cors = require('cors');
//my files
const {connection} = require('./config/database');
const logger = require('./utils/logger');
//load envs
process.loadEnvFile();
//import routes
const activityRoutes = require('./routes/activityRoutes');
const categoryRoutes = require("./routes/categoryRoutes");
const goalRoutes = require("./routes/goalRoutes");
const milestoneRoutes = require("./routes/milestoneRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const reportRoutes = require("./routes/reportRoutes");
const statisticRoutes = require("./routes/statisticRoutes");
const tagRoutes = require("./routes/tagRoutes");
const userRoutes = require('./routes/userRoutes');


//dbConnection
connection();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(logger.expressMiddleware);

// Routes
app.use('/api/actividades', activityRoutes);
app.use("/api/categorias", categoryRoutes);
app.use('/api/objetivos', goalRoutes);
app.use('/api/hitos', milestoneRoutes);
app.use('/api/recordatorios', reminderRoutes);
app.use("/api/reportes", reportRoutes);
app.use("/api/estadisticas", statisticRoutes);
app.use("/api/etiquetas", tagRoutes);
app.use('/api/usuarios', userRoutes);


//start server

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen({port: PORT, host: HOST}, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

module.exports = app;