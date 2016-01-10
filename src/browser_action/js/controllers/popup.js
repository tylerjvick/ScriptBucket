(function () {
    'use strict';

    var popup = ['$http', '$mdSidenav', 'StorageFactory', function ($http, $mdSidenav, StorageFactory) {

        var vm = this;
        vm.scripts = [];
        vm.deleteScript = deleteScript;
        vm.openSettings = openSettings;
        vm.sendScript = sendScript;

        activate();

        function activate() {
            return createStorage();
        }

        function createStorage() {
            return StorageFactory.initializeStorage().then(function () {
                StorageFactory.listDir().then(function (files) {
                    vm.scripts = files;
                    return vm.scripts;
                });
            });
        }

        function deleteScript(script) {

            StorageFactory.deleteFile(script).then(function (files) {
                vm.scripts = files;
            });

        }

        function openSettings() {
            $mdSidenav('right').toggle();
        }

        function sendScript(script) {

            return StorageFactory.getFileEntry(script)
                .then(function (fileEntry) {
                    fileEntry.file(function (file) {

                        var read = new FileReader();
                        read.readAsDataURL(file);

                        read.onloadend = function () {

                            chrome.tabs.query(
                                {active: true, currentWindow: true},
                                function (tabs) {
                                    chrome.tabs.sendMessage(
                                        tabs[0].id,
                                        {rawScript: read.result}
                                    );
                                }
                            );

                        };
                    });
                });
        }

    }];

    module.exports = popup;
})();