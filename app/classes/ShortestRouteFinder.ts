import { IAirportDataRow, ICoordinates, IResponse, IRouteDataRow } from './Interfaces';
import calculateDistanceBetweenAirports from '../functions/calculateDistanceBetweenAirports';
import getAirportCoordinates from '../functions/getAirportCoordinates';
import readFile from '../functions/readFile';
import formatRouteData from '../functions/formatRouteData';
import AirportRouteBuilder from './AirportRouteBuilder';
import getRoutesBetweenSourceAndDestination from '../functions/getRoutesBetweenSourceAndDestination';
import formatAirportData from '../functions/formatAirportData';

export default class ShortestRouteFinder {
  from: string;
  to: string;
  airports: IAirportDataRow[];

  constructor (from: string, to: string) {
    const airportData: string[] = readFile(`${process.env.AIRPORTS_DATA_FILE_LOCATION}`);
    this.airports = formatAirportData(airportData);
    this.from = from;
    this.to = to;

    if (getAirportCoordinates(this.airports, this.from) === undefined ||
        getAirportCoordinates(this.airports, this.to) === undefined) {
      throw Error('Check your from and to airport IATA codes');
    }
  }

  async find (): Promise<IResponse> {
    const routeData: string[] = readFile(`${process.env.ROUTES_DATA_FILE_LOCATION}`);
    const formattedRouteData: IRouteDataRow[] = await formatRouteData(routeData);
    const routeBuilder: AirportRouteBuilder = new AirportRouteBuilder(this.from);
    const routes: IRouteDataRow[][] = await routeBuilder.build(formattedRouteData, this.to, Number(process.env.MAX_ROUTES_IN_TRIP));
    const selectedRoutes: IRouteDataRow[][] = getRoutesBetweenSourceAndDestination(routes, this.from, this.to);

    return {
      distance: Math.round(this.getShortestRouteDistance(selectedRoutes) * 100) / 100,
      shortestRoute: this.getShortestRoute(selectedRoutes),
    };
  }

  getShortestRoute(allRoutes: IRouteDataRow[][]): IRouteDataRow[] {
    const distances: number[] = allRoutes.map(routes => this.getRouteDistance(routes));
    return allRoutes[distances.indexOf(Math.min(...distances))];
  }

  getShortestRouteDistance(allRoutes: IRouteDataRow[][]): number {
    return allRoutes
        .map(routes => this.getRouteDistance(routes))
        .reduce((minDistance, distance) => (minDistance < distance ? minDistance : distance));
  }

  private getRouteDistance(routes: IRouteDataRow[]): number {
    return routes.map((route) => {
      const from: ICoordinates | undefined = getAirportCoordinates(this.airports, route.sourceAirport);
      const to: ICoordinates | undefined = getAirportCoordinates(this.airports, route.destinationAirport);
      let distance: number = 0;
      if (from && to) {
        distance = calculateDistanceBetweenAirports(from, to);
      }
      return distance;
    }).reduce((total, increment) => (total + increment));
  }
}
