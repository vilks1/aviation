import { IRouteDataRow } from '../classes/Interfaces';

export default (routes: IRouteDataRow[][], sourceAirportCode: string, destinationAirportCode: string) => {
  return routes.filter((route) => {
    const hasSourceAirport: boolean = route.some(routeItem => routeItem.sourceAirport === sourceAirportCode);
    const hasDestinationAirport: boolean = route.some(routeItem => routeItem.destinationAirport === destinationAirportCode);
    return hasDestinationAirport && hasSourceAirport;
  });

  // // we assume that less stops are shorter in distance
  // const minimumRouteCount = matchingRoutes
  //     .map(item => item.length)
  //     .reduce((minCount, currentCount) => (minCount < currentCount ? minCount : currentCount));

  // return matchingRoutes.filter(routes => routes.length === minimumRouteCount);
};
