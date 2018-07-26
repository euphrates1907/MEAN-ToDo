import angular from 'angular';
import uiRouter from 'angular-ui-router';
import todoFactory from './factories/todo-factory';
import todosController from './todos/todos';

const app = angular.module('app', [uiRouter, todoFactory.name]);

// Config for uiRouter
app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('todos', {
            url: '/',
            template: require('todos/todos.html'),
            controller: todosController
        })
        .state('about', {
            url: '/about',
            template: require('about/about.html')
        });

    /*Makes url clean, otherwise url will contain hashes */
    $locationProvider.html5Mode(true);

});

/*Want to export our app to use in index.js */
export default app;