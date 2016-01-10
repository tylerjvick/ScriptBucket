(function () {
    'use strict';

    var upload = ['$scope', 'StorageFactory',
        function ($scope, StorageFactory) {

            var vm = this;
            vm.chooseFile = chooseFile;

            function chooseFile($file) {

                if ($file) {
                    StorageFactory.writeFile($file).then(function (files) {
                        $scope.popup.scripts = files;
                    });
                }

            }

    }];

    module.exports = upload;
})();