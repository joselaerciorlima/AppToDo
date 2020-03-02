// Importando o arquivo com a conexão com o banco de dados.
const mongoose = require('../config/database');
// Schema permite criar a representação da tabela.
const Schema = mongoose.Schema;

// Definição da nossa tabela no banco de dados.
const TaskSchema = new Schema({
    macaddress: {type: String, required: true},
    type: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    when: { type: Date, required: true},
    done: {type: Boolean, default: false},
    created: {type: Date, default: Date.now()}
});

// Task é como vai chamar a Tabela e TaskSchema a representação da tabela.
module.exports = mongoose.model('Task', TaskSchema);