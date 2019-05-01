import { ICoordinates } from '../classes/Interfaces';

const toRadians = (degrees: number) => {
  return degrees * Math.PI / 180;
};

/**
 * from and credits to: http://www.movable-type.co.uk/scripts/latlong.html
 * Modified with variable names and return is in KM
 * @param from
 * @param to
 */
export default (from: ICoordinates, to: ICoordinates) => {
  const R = 6371e3; // earth metres
  const fi1 = toRadians(from.lat);
  const fi2 = toRadians(to.lat);
  const deltaFi = toRadians(to.lat - from.lat);
  const deltaLambda = toRadians(to.long - from.long);

  const a = Math.sin(deltaFi / 2) * Math.sin(deltaFi / 2) +
      Math.cos(fi1) * Math.cos(fi2) *
      Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c / 1000;
};
