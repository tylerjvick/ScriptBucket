(function () {
    'use strict';

    require('angular').module('ScriptBucket')
        .factory('StorageFactory', require('./storage'));
})();