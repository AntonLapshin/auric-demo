'use strict'
  ; (function () {

    /* Random Ajax transaction identifier. Between 0 and 1,000,000.
       NOTE: ajax_id MUST be an integer, not a string.
     */
    function generateAjaxId() {
      return Math.floor((Math.random() * 1000000) + 1);
    };

    /* UTC Timestamp (in seconds) */
    function utcTimestamp() {
        var x = new Date();
        return Math.floor((x.getTime()) / 1000).toString();
    }

    function getSession(){
      
    }

    windows.Main = {
      tokenize: function (data) {
        var params = {
          "id": generateAjaxId(),
          "method": "session_encrypt",
          "params": [{
            "utcTimestamp": utcTimestamp(),
            "plaintextValue": data,
            "sessionId": session_id,
          }]
        };
      }
    };

  })();