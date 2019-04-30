import { IRouteDataRow } from '../functions/formatRouteData';

export default class AirportRouteBuilder {
  sourceAirportCode: string;

  constructor (sourceAirportCode: string) {
    this.sourceAirportCode = sourceAirportCode;
  }

  getSourceAirportRoutes(data: IRouteDataRow[], code: string): IRouteDataRow[] {
    return data.filter(item => item.sourceAirport === code);
  }

  async build (data: IRouteDataRow[], destinationAirportCode: string, maxFlightCount: number): Promise<IRouteDataRow[][]> {
    let builtRoutes: IRouteDataRow[][] = [];
    const sourceRoutes: IRouteDataRow[] = this.getSourceAirportRoutes(data, this.sourceAirportCode);
    for (const key in sourceRoutes) {
      builtRoutes = [...builtRoutes, ...await this.buildRoute(data, destinationAirportCode, [sourceRoutes[key]], maxFlightCount)];
    }
    return builtRoutes;
  }

  private async buildRoute (data: IRouteDataRow[], destinationAirportCode: string, currentRoutes: IRouteDataRow[], maxFlightCount: number): Promise<IRouteDataRow[][]> {
    let builtRoutes: IRouteDataRow[][] = [];
    const lastRouteItem: IRouteDataRow = currentRoutes[currentRoutes.length - 1];

    const flightsLeft: number = maxFlightCount - 1;

    const subRoutes: IRouteDataRow[] = this
        .getSourceAirportRoutes(data, lastRouteItem.destinationAirport)
        .filter(item => item.destinationAirport !== lastRouteItem.sourceAirport);

    if (lastRouteItem.destinationAirport === destinationAirportCode || flightsLeft === 0 || subRoutes.length === 0) {
      builtRoutes.push(currentRoutes);
    } else {
      for (const route of subRoutes) {
        const copiedRoutes = Object.assign([], currentRoutes);
        copiedRoutes.push(route);
        builtRoutes = [...builtRoutes, ...await this.buildRoute(data, destinationAirportCode, copiedRoutes, flightsLeft)];
      }
    }
    return builtRoutes;
  }
}
