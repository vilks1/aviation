import express from 'express';
import { readFile } from './functions/readFile';
import { formatRouteData, IRouteDataRow } from './functions/formatRouteData';
import AirportRouteBuilder from './classes/AirportRouteBuilder';
import { getRoutesBetweenSourceAndDestination } from './functions/getRoutesBetweenSourceAndDestination';
import * as dotenv from 'dotenv';

dotenv.config();
const app: express.Application = express();

app.get('/:from/to/:to', async (req: express.Request, res: express.Response) => {
  const data: string[] = readFile('./app/files/routes.dat');
  const formattedData: IRouteDataRow[] = formatRouteData(data);
  const routeBuilder: AirportRouteBuilder = new AirportRouteBuilder(req.params.from);

  try {
    const routes = await routeBuilder.build(formattedData, req.params.to, Number(process.env.ROUTE_LENGTH));
    res.send(getRoutesBetweenSourceAndDestination(routes, req.params.from, req.params.to));
  } catch (e) {
    console.log(e);
    res.send(e);
  }

});

app.listen(3000, () => {
  console.log('Test task app listening on port 3000!');
});
