import { IAirportDataRow } from '../classes/Interfaces';

export default (data: string[]): IAirportDataRow[] => {
  return data
      .map(item => item.split(','))
      // remove empty items
      .filter(item => item[0] !== '' && item[0] !== undefined)
      .map(item => <IAirportDataRow>{
        code: item[4].replace(/"+/g, ''),
        coordinates: {
          lat: Number(item[6]),
          long: Number(item[7]),
        },
      });
};
