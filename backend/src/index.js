//Importação do Módulo.
const express = require("express");

//Inicialização do Módulo.
const server = express();

//Define o padrão de recebimento de valores pelo body.
server.use(express.json());

//Importação das Rotas
const TaskRoutes = require('./routes/TaskRoutes');
server.use('/task', TaskRoutes);

//A porta que a API vai receber as requisições.
server.listen(3000, () => {
  console.log("API ONLINE!");
});