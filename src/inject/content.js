(function () {
    'use strict';

    chrome.runtime.onMessage.addListener(
        function (req, sender) {

            var script = document.createElement('script');
            script.src = req.rawScript;

            document.body.appendChild(script);

        }
    );

})();