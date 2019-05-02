import * as dotenv from 'dotenv';
import express from 'express';
import ShortestRouteFinder from './classes/ShortestRouteFinder';

dotenv.config();
const app: express.Application = express();

app.get('/:from/:to', async (req: express.Request, res: express.Response) => {
  try {
    res.send(await new ShortestRouteFinder(req.params.from, req.params.to).find());
  } catch (e) {
    res.send(e);
  }

});

app.listen(3000, () => {
  console.log('Test task app listening on port 3000!');
});
