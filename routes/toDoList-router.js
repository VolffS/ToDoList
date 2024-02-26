const express = require('express');
const router = express.Router();
const {
    getToDoList
} = require("../controllers/toDoList-controler");


router.get('/', getToDoList);

module.exports = router;