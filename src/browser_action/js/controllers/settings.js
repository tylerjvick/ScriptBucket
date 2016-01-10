(function () {
    'use strict';

    var settings = ['StorageFactory',
        function (StorageFactory) {

            var vm = this;
            vm.openMenu = openMenu;
            vm.usage = {};

            activate();

            function activate() {
                return updateStorageUsage();
            }

            function bytesToSize(bytes) {
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (bytes === 0) return '0 Byte';
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
            }

            function openMenu($mdOpenMenu, ev) {

                $mdOpenMenu(ev);

            }

            function updateStorageUsage() {
                StorageFactory.getStorageUsage().then(function (usage) {
                    Object.keys(usage).map(function (k, v) {
                        vm.usage[k] = bytesToSize(usage[k]);
                    });
                });
            }

    }];

    module.exports = settings;

})();