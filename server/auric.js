var request = require('request');
const crypto = require('crypto');

var SETTINGS = {
  account: 'TestAccount',
  configuration: 'SAMPLEMERCHANT04',
  secret: 'GzqQ2rf1nQr2PELS.wWVJt1%i07_boQW',
  mtid: 31506432,
  segment: 123,
  retention: 'big-year',
  url: 'https://vault01-sb.auricsystems.com/vault/v2/'
};

const hmac = crypto.createHmac('sha512', SETTINGS.secret);

/* UTC Timestamp (in seconds) */
function utcTimestamp() {
  var x = new Date();
  return Math.floor((x.getTime()) / 1000).toString();
}

function generateUniqueId() {
  return Math.floor((Math.random() * 1000000) + 1);
};

exports.getSession = function (callback) {

  var uid = generateUniqueId();

  var data = {
    "params": [{
      "mtid": SETTINGS.mtid,
      "configurationId": SETTINGS.configuration,
      "utcTimestamp": utcTimestamp(),
      "retention": SETTINGS.retention,
      "segment": SETTINGS.segment
    }],
    'jsonrpc': '2.0',
    "id": 1,
    "method": "get_session"
  }

  var dataJson = JSON.stringify(data);
  hmac.update(dataJson);

  var headers = {
    'Connection': 'close',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-VAULT-HMAC': hmac.digest('hex').toLowerCase(),
    'X-VAULT-TRACE-UID': uid
  };

  var options = {
    url: SETTINGS.url,
    method: 'POST',
    headers: headers,
    form: dataJson
  };

  request(options, function (error, response, body) {
    console.log(response);
    if (!error && response.statusCode == 200) {
      callback(sessionId);
      return;
    }
    callback();
  })
}