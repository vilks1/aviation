import express from 'express';
import { readFile } from './functions/readFile';
import { formatRouteData, IRouteDataRow } from './functions/formatRouteData';
import RouteDataHelper from './classes/RouteDataHelper';

const app: express.Application = express();

app.get('/:from/to/:to', (req: express.Request, res: express.Response) => {
  const data: string[] = readFile('./app/files/routes.dat');
  const formattedData: IRouteDataRow[] = formatRouteData(data);
  const routeDataHelper: RouteDataHelper = new RouteDataHelper(formattedData);

  console.log(routeDataHelper.getRoutesBySourceIataCode(req.params.from), req.params);
  res.send(routeDataHelper.hasRouteBetweenAirports(req.params.from, req.params.to));
});

app.listen(3000, () => {
  console.log('Test task app listening on port 3000!');
});
