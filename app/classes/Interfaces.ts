interface IRouteDataRow {
  sourceAirport: string;
  destinationAirport: string;
}

interface ICoordinates {
  lat: number;
  long: number;
}

interface IAirportDataRow {
  code: string;
  coordinates: ICoordinates;
}

interface IResponse {
  availableRoutes: IRouteDataRow[][];
  shortestRoute: IRouteDataRow[];
  distance: number | undefined;
}

export { IRouteDataRow, ICoordinates, IAirportDataRow, IResponse };
