var mongoose = require('mongoose');
var Todo = require('../db/db').Todo;
var express = require('express');
var router = express.Router();

//Read
router.get('/', function (req, res) {
    Todo.find(function (err, results) {
        if (err) {
            console.log(err);
        }
        res.send({
            todos: results
        });
    });
});

//Create
router.post('/', function (req, res) {
    var todo = new Todo(req.body);
    todo.save(function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Saved!');
        res.send('SUCCESS!');

    });
});

//Update
router.put('/:idx', function (req, res) {
    var id = req.params.idx;
    //_id is in mongo db.
    Todo.update({
        _id: mongoose.Types.ObjectId(id)
    }, {
        $set: {
            task: req.body.task
        }
    }, function (err) {
        if (err) {
            console.log(err);
        }

        res.send('ToDo updated');
    });
});

//Delete
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    //_id is in mongo db.
    Todo.remove({
        _id: mongoose.Types.ObjectId(id)
    }, function (err) {
        if (err) {
            console.log(err);
        }

        res.send('ToDo deleted');
    });
});

module.exports = router;