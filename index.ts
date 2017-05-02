import * as express from 'express'
import { join } from 'path'
import AuricAPI from './server/auric-api'

let app = express()

/**
 * Get Session Id. Auric API.
 * 
 */
app.get('/get_session', async function (req, res) {
  try {
    let sessionId = await AuricAPI.getSession()
    res.json(sessionId)
  }
  catch(ex){
    res.status(500).end(ex)
  }
})

app.use(express.static(join(__dirname, 'public')))
let port = process.env.PORT || 3333
app.set('port', port)
app.listen(port, function () {
  console.log("app.listen on " + port)
});