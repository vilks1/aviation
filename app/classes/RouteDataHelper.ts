import { IRouteDataRow } from '../functions/formatRouteData';

export default class RouteDataHelper {
  readonly data: IRouteDataRow[];

  constructor(data: IRouteDataRow[]) {
    this.data = data;
  }

  getRoutesBySourceIataCode(code: string): IRouteDataRow[] {
    return this.data.filter(item => item.sourceAirport === code);
  }

  hasRouteBetweenAirports(destinationAirportCode: string, sourceAirportCode: string): boolean {
    return this.data.filter((item) => {
      return item.destinationAirport === destinationAirportCode &&
          item.sourceAirport === sourceAirportCode;
    }).length > 0;
  }
}
