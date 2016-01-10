(function () {
    'use strict';

    require('angular').module('ScriptBucket')
        .controller('PopupCtrl', require('./popup'))
        .controller('UploadCtrl', require('./upload'))
        .controller('SettingsCtrl', require('./settings'));
})();