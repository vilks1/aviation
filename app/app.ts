import * as dotenv from 'dotenv';
import express from 'express';
import readFile from './functions/readFile';
import formatRouteData from './functions/formatRouteData';
import getRoutesBetweenSourceAndDestination from './functions/getRoutesBetweenSourceAndDestination';
import AirportRouteBuilder from './classes/AirportRouteBuilder';
import { IAirportDataRow, IResponse, IRouteDataRow } from './classes/Interfaces';
import formatAirportData from './functions/formatAirportData';
import ShortestRouteFinder from './classes/ShortestRouteFinder';

dotenv.config();
const app: express.Application = express();

app.get('/:from/to/:to', async (req: express.Request, res: express.Response) => {
  const routeData: string[] = readFile('./app/files/routes.dat');
  const formattedRouteData: IRouteDataRow[] = formatRouteData(routeData);
  const routeBuilder: AirportRouteBuilder = new AirportRouteBuilder(req.params.from);

  try {
    const routes: IRouteDataRow[][] = await routeBuilder.build(formattedRouteData, req.params.to, Number(process.env.ROUTE_LENGTH));
    const selectedRoutes: IRouteDataRow[][] = getRoutesBetweenSourceAndDestination(routes, req.params.from, req.params.to);

    const airportData: string[] = readFile('./app/files/airports.dat');
    const formattedAirportData: IAirportDataRow[] = formatAirportData(airportData);

    const shortestRouteFinder: ShortestRouteFinder = new ShortestRouteFinder(formattedAirportData, selectedRoutes);
    const response: IResponse = {
      distance: shortestRouteFinder.getShortestRouteDistance(),
      shortestRoute: shortestRouteFinder.getShortestRoute(),
      availableRoutes: selectedRoutes,
    };
    res.send(response);
  } catch (e) {
    console.log(e);
    res.send(e);
  }

});

app.listen(3000, () => {
  console.log('Test task app listening on port 3000!');
});
