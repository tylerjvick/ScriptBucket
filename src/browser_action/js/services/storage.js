(function () {
    'use strict';

    var storage = ['$q', function ($q) {

        var DIRECTORY = 'scripts';

        var storage = require('chromestore.js').ChromeStore([
            {path: 'scripts'}
        ]);

        function deleteFile(file) {

            storage.deleteFile(DIRECTORY + '/' + file.name);

            return listDir();

        }

        function initializeStorage() {
            var deferred = $q.defer();
            storage.init(1024*1024*24, function (castore) {

                deferred.notify('Initialized storage');

                storage.getDir(DIRECTORY, {create: true}, function (dir) {
                    if (dir) {
                        deferred.resolve(dir);
                    } else {
                        deferred.reject('Could not get directory');
                    }
                });

            });

            return deferred.promise;
        }

        function getFileEntry(file) {

            var deferred = $q.defer();

            storage.getFile(DIRECTORY + '/' + file.name, {},
                function (fileEntry) {
                    if (fileEntry) {
                        deferred.resolve(fileEntry);
                    } else {
                        deferred.reject('Could not get file');
                    }
            });

            return deferred.promise;

        }

        function getStorageUsage() {

            var deferred = $q.defer();

            storage.usedAndRemaining(function (used, remaining) {

                deferred.resolve({
                    used: used,
                    remaining: remaining
                });

            });

            return deferred.promise;

        }

        function listDir() {

            var deferred = $q.defer();

            storage.ls('scripts', function (files) {
                if (files) {
                    deferred.resolve(files);
                } else {
                    deferred.reject('No files retrieved');
                }
            });

            return deferred.promise;

        }

        function writeFile(file) {

            storage.write(
                DIRECTORY + '/' + file.name,
                file.type, file,
                {create: true});

            return listDir();

        }

        return {
            initializeStorage: initializeStorage,
            deleteFile: deleteFile,
            getFileEntry: getFileEntry,
            getStorageUsage: getStorageUsage,
            listDir: listDir,
            writeFile: writeFile
        };


    }];

    module.exports = storage;
})();