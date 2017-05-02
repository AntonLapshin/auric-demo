import * as request from 'request'
import * as crypto from 'crypto'

const SETTINGS = {
  account: 'TestAccount',
  configuration: 'SAMPLEMERCHANT04',
  secret: 'GzqQ2rf1nQr2PELS.wWVJt1%i07_boQW',
  mtid: "31506432",
  segment: "123",
  retention: 'big-year',
  url: 'https://vault01-sb.auricsystems.com/vault/v2/'
}

/* UTC Timestamp (in seconds) */
function utcTimestamp() {
  var x = new Date()
  return Math.floor((x.getTime()) / 1000).toString()
}

function generateUniqueId() {
  return Math.floor((Math.random() * 1000000) + 1)
};

let data: any = {
  params: [{
    mtid: SETTINGS.mtid,
    configurationId: SETTINGS.configuration,
    utcTimestamp: 0,
    retention: SETTINGS.retention,
    segment: SETTINGS.segment
  }],
  jsonrpc: '2.0',
  id: 0,
  method: "get_session"
}

export default class AuricAPI {
  static async getSession(): Promise<string> {
    return new Promise<string>((resolve, reject) => {

      let uid = generateUniqueId()
      data.id = uid
      data.params[0].utcTimestamp = utcTimestamp()
      let dataJson = JSON.stringify(data)

      let hmac = crypto.createHmac('sha512', SETTINGS.secret);
      hmac.update(dataJson)

      let headers = {
        'Connection': 'close',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-VAULT-HMAC': hmac.digest('hex').toLowerCase(),
        'X-VAULT-TRACE-UID': uid
      }

      let options = {
        url: SETTINGS.url,
        method: 'POST',
        headers: headers,
        form: dataJson
      }

      request(options, function (error, response: any, body) {
        let res = JSON.parse(body);
        console.log(response)
        if (!error && response.statusCode == 200 && res.result.sessionId) {
          resolve(res.result.sessionId)
          return
        }

        reject(res.error)
      })

    })
  }
}
