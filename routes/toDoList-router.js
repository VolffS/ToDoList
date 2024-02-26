const express = require('express');
const router = express.Router();
const {
    getToDoList,
    addTasks,
    putTask,
    deleteTasks
} = require("../controllers/toDoList-controler");


router.get('/', getToDoList);

router.post('/', addTasks);

router.delete('/', deleteTasks);

router.put('/', putTask);

module.exports = router;