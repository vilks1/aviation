import { IRouteDataRow } from './formatRouteData';

export const getRoutesBetweenSourceAndDestination = (routes: IRouteDataRow[][], sourceAirportCode: string, destinationAirportCode: string) => {
  return routes.filter((route) => {
    const hasSourceAirport: boolean = route.some(routeItem => routeItem.sourceAirport === sourceAirportCode);
    const hasDestinationAirport: boolean = route.some(routeItem => routeItem.destinationAirport === destinationAirportCode);
    return hasDestinationAirport && hasSourceAirport;
  });
};
