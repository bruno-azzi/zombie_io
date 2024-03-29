export class LonLatFormatter {

  /** 10km north security */
  static tenKmLatSecurity = 0.0899;

  /**
   * Parse survivor location from api format
   * @param lonlat survivor longitude and latitude
   */
  static parseFromPointFormat(lonlat: string) {
    const lon = +lonlat.split(' ')[1].replace('(', '');
    let lat = +lonlat.split(' ')[2].replace(')', '');

    /** Removing 10km north security */
    lat = lat - LonLatFormatter.tenKmLatSecurity;

    return `${lat} ${lon}`;
  }

  /**
   * Parse survivor location to api format
   * @param lonlat survivor longitude and latitude
   */
  static parseToPointFormat(lonlat: string) {
    let lat = +lonlat.split(' ')[0];
    const lon = +lonlat.split(' ')[1];

    /** Adding 10km north security */
    lat = lat + LonLatFormatter.tenKmLatSecurity;

    return `Point(${lon.toFixed(3)} ${lat.toFixed(3)})`;
  }

}
