import angular from 'angular';
import _ from 'lodash';

const todoFactory = angular.module('app.todoFactory', [])

    .factory('todoFactory', ($http) => {
        function getTasks($scope) {
            //     // $http.get('/todos').success(response => {
            //     //     $scope.todos = response.todos;
            //     // });

            $http({
                method: 'GET',
                url: '/todos'
            }).then(function successCallback(response) {
                $scope.todos = response.data.todos;
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        function createTask($scope, params) {
            if(!$scope.createTaskInput) { return;}
            $http({
                method: 'POST',
                url: '/todos',
                data: {
                    task: $scope.createTaskInput,
                    isCompleted: false,
                    isEditing: false
                }
            }).then(function successCallback(response) {
                getTasks($scope);
                $scope.createTaskInput = '';
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

            // params.createHasInput = false;
            // $scope.createTaskInput = '';
        }

        function updateTask($scope, todo) {
            $http({
                method: 'PUT',
                url: `/todos/${todo._id}`,
                data: {
                    task: todo.updatedTask,
                }
            }).then(function successCallback(response) {
                getTasks($scope);
                todo.isEditing = false;
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        function deleteTask($scope, todoToDelete) {
            $http({
                method: 'DELETE',
                url: `/todos/${todoToDelete._id}`
            }).then(function successCallback(response) {
                getTasks($scope);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        function watchCreateTaskInput(params, $scope, val) {
            const createHasInput = params.createHasInput;
            if (!val && createHasInput) {
                $scope.todos.pop();
                params.createHasInput = false;
            } else if (val && !createHasInput) {
                $scope.todos.push({
                    task: val,
                    isCompleted: false
                });
                params.createHasInput = true;
            } else if (val && createHasInput) {
                $scope.todos[$scope.todos.length - 1].task = val;
            }
        }

        return {
            getTasks,
            createTask,
            updateTask,
            deleteTask,
            watchCreateTaskInput
        };
    });
export default todoFactory;