import { IRouteDataRow } from '../classes/Interfaces';

export default (data: string[]): IRouteDataRow[] => {
  return data
      .map(item => item.split(','))
      // remove empty items
      .filter(item => item[0] !== '' && item[0] !== undefined)
      .map(item => <IRouteDataRow>{
        sourceAirport: item[2],
        destinationAirport: item[4],
      })
      // remove duplicated data (same source and destination, but different flight no)
      .filter((item: IRouteDataRow, index, self) => {
        return index === self.findIndex((selfItem: IRouteDataRow) =>  {
          return selfItem.sourceAirport === item.sourceAirport &&
              selfItem.destinationAirport === item.destinationAirport;
        });
      });
};
