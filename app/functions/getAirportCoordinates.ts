import { IAirportDataRow, ICoordinates } from '../classes/Interfaces';

export default (data: IAirportDataRow[], airportCode: string): ICoordinates | undefined => {
  const result: IAirportDataRow | undefined = data.find(airport => airport.code === airportCode);
  if (result) {
    return result.coordinates;
  }
  return undefined;
};
