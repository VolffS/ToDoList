const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const ToDo = mongoose.model('ToDo', toDoSchema);

module.exports = ToDo;