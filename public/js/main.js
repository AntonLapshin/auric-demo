'use strict'
  ; (function () {

    var _sessionId = null;
    var _token;

    $(function(){

      function callMethod(method, data){

        if (!_sessionId) {
          return AuricAPI.getSession().then(function(sessionId){
            _sessionId = sessionId;
            return callMethod(method, data);
          });
        }

        return method(_sessionId, data).then(function(res){
          if (res.code === -1) {
            // Wrong Session Id
            _sessionId = null;
            return callMethod(method, data);
          }
          else if (res.code === 0) {
            var defer = $.Deferred();
            defer.resolve(res.data);
            return defer;
          }
          else {
            var defer = $.Deferred();
            defer.reject("Unhandled Exception");
            return defer;
          }
        });

      }

      $('#encrypt').click(function(){
        var text = $('#text').val();
        callMethod(AuricAPI.sessionEncrypt, text).then(function(token){
          _token = token;
          $('#token').html(_token);
        })
      });

      $('#decrypt').click(function(){
        callMethod(AuricAPI.sessionDecrypt, _token).then(function(text){
          $('#decrypted').html(text);
        })
      });


    });

  })();