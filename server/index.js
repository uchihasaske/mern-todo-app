const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 4000;
const todoRoutes = express.Router();
const Todo = require('./todo.model');

mongoose.connect('mongodb://localhost:27017/todos',{useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB connection established successfully.")
});

app.use(cors());
app.use(bodyParser.json());
app.use('/todos', todoRoutes);


todoRoutes.route('/').get(function (req, res) {
    Todo.find(function(err, todos){
        if(err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Todo.findById(id, function (err, todo) {
        res.json(todo);
    });
});

todoRoutes.route('/add').post(function (req, res) {
    console.log(req.body);
    let todo = new Todo(req.body);
    todo.save()
    .then(todo => res.status(200).json({'todo': 'todo added successfully'}))
    .catch(err => res.status(400).send('Adding new todo failed'));
});

todoRoutes.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if(!todo) {
            res.status(404).send('Data not Found!!');
        } else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
        }

        todo.save()
        .then(todo => res.json('Todo Updated!'))
        .catch(err => {
            res.status(400).send("Updated not possible");
        });
    });
});

app.listen(PORT, () => {
    console.log(`Listining on port ${PORT}`);
});