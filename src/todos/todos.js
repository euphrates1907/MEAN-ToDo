import _ from 'lodash';

export default function ($scope, todoFactory) {
    let params = {
        createHasInput: false
    };

    //console.log(todoFactory.createTask);

    // $scope.todos = [{
    //         "task": "Package your stuff",
    //         "isCompleted": true,
    //         "isEditing": false
    //     },
    //     {
    //         "task": "Go to Rental Company",
    //         "isCompleted": false,
    //         "isEditing": false
    //     }
    // ];

    todoFactory.getTasks($scope);

    $scope.onCompletedClick = (todo) => {
        todo.isCompleted = !todo.isCompleted;
    };
    $scope.onEditClick = (todo) => {
        todo.isEditing = true;
        todo.updatedTask = todo.task;

    };
    $scope.onCancelClick = (todo) => {
        todo.isEditing = false;
    };

    /*ES6 Feature
    This will create todoFactory.createTask, todoFactory.updateTask..etc 
    So inside partial call we don't need to write todoFactory again!
    we can directly write _.partial(createTask...etc)*/
    const {
        createTask,
        updateTask,
        deleteTask,
        watchCreateTaskInput
    } = todoFactory;

    /* Another usage */
    // $scope.createTask = todoFactory.createTask.bind(this, $scope, params);
    // Lodash usage
    $scope.createTask = _.partial(createTask, $scope, params);
    $scope.updateTask = _.partial(updateTask, $scope);
    $scope.deleteTask = _.partial(deleteTask, $scope);
    $scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, params, $scope));
}