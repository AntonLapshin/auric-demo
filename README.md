# auric-demo
EMF Auric Demo

server/auric.js

We are getting VLT-107 error in get_session method.

## Request:

```json
{  
   "url":"https://vault01-sb.auricsystems.com/vault/v2/",
   "method":"POST",
   "headers":{  
      "Connection":"close",
      "Content-Type":"application/json",
      "Accept":"application/json",
      "X-VAULT-HMAC":"c92f695407eeeeee98dfe125124207e473ea591b59c76ef5689ca30f049bcbc3a0c21db2eb0de178fe7a00612c5080993294ca0302683a7a6116ef4cc65825fb",
      "X-VAULT-TRACE-UID":330906
   },
   "form":"{\"params\":[{\"mtid\":31506432,\"configurationId\":\"SAMPLEMERCHANT04\",\"utcTimestamp\":\"1493707490\",\"retention\":\"big-year\",\"segment\":123}],\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"get_session\"}"
}
```

## Response:

```json
{  
   "id":0,
   "result":{  
      "version":"2.0",
      "lastActionSucceeded":0,
      "elapsedTime":"0.0003"
   },
   "error":"VLT-107: JSON Decode Error: json: cannot unmarshal number into Go value of type string",
   "traceUid":"330906"
}
```
