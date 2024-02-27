const createPath = require("../helpers/create-path")
const ToDo = require('../models/toDo');
const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('error'));
};

const getToDoList = (req, res) => {
    res.sendFile(createPath('index'));
    }

module.exports = {
    getToDoList,

}