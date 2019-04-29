interface IRouteDataRow {
  airline: string;
  airlineId: string;
  sourceAirport: string;
  sourceAirportId: string;
  destinationAirport: string;
  destinationAirportId: string;
  codeShare: string;
  stops: string;
  equipment: string;
}

const formatRouteData = (data: string[]): IRouteDataRow[] => {
  return data
      .map(item => item.split(','))
      // remove empty items
      .filter(item => item[0] !== '' && item[0] !== undefined)
      .map(item => <IRouteDataRow>{
        airline: item[0],
        airlineId: item[1],
        sourceAirport: item[2],
        sourceAirportId: item[3],
        destinationAirport: item[4],
        destinationAirportId: item[5],
        codeShare: item[6],
        stops: item[7],
        equipment: item[8],
      });
};

export { IRouteDataRow, formatRouteData };
