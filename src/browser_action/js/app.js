(function () {
    'use strict';

    var angular = require('angular');
    var modules = [
        'ngMaterial',
        'ngFileUpload',
        'ngMdIcons'
    ];

    require('angular-material');
    require('ng-file-upload');
    require('angular-material-icons');

    angular.module('ScriptBucket', modules);

    require('./services/index');
    require('./controllers/index');
})();