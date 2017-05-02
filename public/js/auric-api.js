'use strict'
  ; (function (window) {

    var SETTINGS = {
      url: 'https://vault01-sb.auricsystems.com/vault/v2/'
    };

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

    function getSession() {
      return $.get('/get_session');
    }

    function sessionEncrypt(sessionId, data) {
      var defer = $.Deferred();

      var params = {
        "id": generateAjaxId(),
        "method": "session_encrypt",
        "params": [{
          "utcTimestamp": utcTimestamp(),
          "plaintextValue": data,
          "sessionId": sessionId,
        }]
      };

      $.ajax({
        type: 'POST',
        url: SETTINGS.url,
        crossDomain: true,
        dataType: 'json',
        timeout: 1000 * 5,
        data: JSON.stringify(params),
        success: function (data, textStatus, jqXHR) {

          var json = JSON.stringify(data);
          var las = data.result.lastActionSucceeded;
          if (0 == las) {
            defer.resolve({
              code: -1,
              data: data.error
            });
          } else {
            var token = data.result.token;
            defer.resolve({
              code: 0,
              data: token
            });
          };
        },
        error: function (jqXHR, textStatus, errorThrown) {
          defer.resolve({
            code: 500,
            data: textStatus
          });
        },
      })

      return defer;
    }

    function sessionDecrypt(sessionId, token) {
      var defer = $.Deferred();

      var params = {
        "id": generateAjaxId(),
        "method": "session_decrypt",
        "params": [{
          "utcTimestamp": utcTimestamp(),
          "token": token,
          "sessionId": sessionId,
        }]
      };

      $.ajax({
        type: 'POST',
        url: SETTINGS.url,
        crossDomain: true,
        dataType: 'json',
        timeout: 1000 * 5,
        data: JSON.stringify(params),
        success: function (data, textStatus, jqXHR) {

          var json = JSON.stringify(data);
          var las = data.result.lastActionSucceeded;
          if (0 == las) {
            defer.resolve({
              code: -1,
              data: data.error
            });
          } else {
            var data = data.result.plaintextValue;
            defer.resolve({
              code: 0,
              data: data
            });
          };
        },
        error: function (jqXHR, textStatus, errorThrown) {
          defer.resolve({
            code: 500,
            data: textStatus
          });
        },
      })

      return defer;
    }

    window.AuricAPI = {
      getSession: getSession,
      sessionEncrypt: sessionEncrypt,
      sessionDecrypt: sessionDecrypt
    };

  })(window);