// Importação do Mongoose ORM.
const mongoose = require('mongoose');

// endereço de conexão com o mongodb.
const uri = 'mongodb://localhost:27017/todo';
mongoose.connect(uri, { useNewUrlParser: true });

// Exporta todo o arquivo para quem chamar ele.
module.exports = mongoose;