var mongoose = require('mongoose');
// DB name will be todos
mongoose.connect('mongodb://127.0.0.1/todos');

// 'Todo' is schema name
var Todo = mongoose.model('Todo', {
    task: String,
    isCompleted: Boolean,
    isEditing: Boolean
});

module.exports.Todo = Todo;