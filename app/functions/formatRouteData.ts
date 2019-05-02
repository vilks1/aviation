import { IRouteDataRow } from '../classes/Interfaces';

export default async (data: string[]): Promise<any> => {
  const routes: IRouteDataRow[] = data
      .map((item) => {
        const splitted: string[] = item.split(',');
        return <IRouteDataRow>{
          sourceAirport: splitted[2],
          destinationAirport: splitted[4],
        };
      });
  return Array.from(new Set(routes));
};
