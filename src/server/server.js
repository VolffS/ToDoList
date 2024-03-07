const express = require('express');
const mongoose = require('mongoose');
const toDoListRoute = require("./routes/toDoList-router");
const apiToDoListRoute = require("./routes/api-toDoList-router");
const createPath = require('./helpers/create-path');

const db = "mongodb+srv://Volff:Pas123@clusterlist.vdtqpsl.mongodb.net/ToDoList?retryWrites=true&w=majority&appName=ClusterList";
const app = express();
const PORT = 3000;

const cors=require("cors");
const corsOptions ={
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    credentials:true,
    optionSuccessStatus:200,
}

mongoose.connect(db)
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.log(error));

app.use(cors(corsOptions))
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.json());
// app.use(express.static('styles'));
// app.use(express.static('scripts'));
app.use(express.static('dist'));

app.use(toDoListRoute);
app.use(apiToDoListRoute);




app.use((req, res) => {
    res
        .status(404)
        .sendFile(createPath('error'));
    });