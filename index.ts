import * as express from 'express';
import { join } from 'path';
import AuricAPI from './server/auric-api';
import * as cors from 'cors';

const app = express();

app.use(cors());

/**
 * Get Session Id. Auric API.
 *
 */
app.get('/get_session', async function(req, res) {
  try {
    const sessionId = await AuricAPI.getSession();
    res.json(sessionId);
  } catch (ex) {
    res.status(500).end(ex);
  }
});

app.use(express.static(join(__dirname, 'public')));
const port = process.env.PORT || 3333;
app.set('port', port);
app.listen(port, function() {
  console.log('app.listen on ' + port);
});
