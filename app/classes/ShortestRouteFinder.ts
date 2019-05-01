import { IAirportDataRow, ICoordinates, IRouteDataRow } from './Interfaces';
import calculateDistanceBetweenAirports from '../functions/calculateDistanceBetweenAirports';
import getAirportCoordinates from '../functions/getAirportCoordinates';

export default class ShortestRouteFinder {
  routes: IRouteDataRow[][];
  airports: IAirportDataRow[];

  constructor (airports: IAirportDataRow[], routes: IRouteDataRow[][]) {
    this.routes = routes;
    this.airports = airports;
  }

  getShortestRoute(): IRouteDataRow[] {
    console.log(this.routes.map(routes => this.getRouteDistance(routes)));
    const distances: number[] = this.routes.map(routes => this.getRouteDistance(routes));
    return this.routes[distances.indexOf(Math.min(...distances))];
  }

  getShortestRouteDistance(): number {
    return this.routes
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
