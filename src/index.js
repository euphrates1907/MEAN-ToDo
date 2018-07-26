import angular from 'angular';
import appModule from 'config';
import './css/master.scss';

//attach angular module into document
angular.bootstrap(document, [appModule.name]);