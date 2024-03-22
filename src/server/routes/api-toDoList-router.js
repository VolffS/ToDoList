const express = require('express');
const router = express.Router();
const {
    getTasks,
    addTask,
    putTask,
    deleteTasks
} = require("../controllers/api-toDoList-controler");



router.get('/api/ToDoList/Tasks', getTasks);

router.post('/api',addTask);

router.delete('/api/', deleteTasks);

router.put('/api', putTask);

module.exports = router;