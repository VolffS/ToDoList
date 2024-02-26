const createPath = require("../helpers/create-path")
const ToDo = require('../models/toDo');
const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('error'));
};

const getTasks = (req, res) => {
    ToDo
        .find()
        .sort({_id: -1})
        .then((todo)=> {
            res.json(todo);
        })
        .catch((error) => handleError(res, error));
}

const addTask = (req, res) => {
    const {task, status } = req.body;
    const toDo = new ToDo({task, status });
    toDo
        .save()
        .then((result) => res.json(result))
        .catch((error) => {
            console.log(error);
        })
}

const deleteTasks = (req, res) => {
    const ids = req.body;
    let param;
    ids.length !== 0 ? param = {_id: ids} : {};

    ToDo.deleteMany(param)
        .then(() => res.sendStatus(200).json(ids))
        .catch((error) => handleError(res, error));
}

const putTask = (req, res) => {
    const {_id, task, status} = req.body;
    ToDo
        .findByIdAndUpdate(_id, {task , status},{ new: true })
        .then((result) => res.sendStatus(200).json(result))
        .catch((error) => handleError(res, error))
}

    module.exports = {
        getTasks,
        addTask,
        putTask,
        deleteTasks
    }