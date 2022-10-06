export default function modelZones(zones) {
  const output = [];
  for (let i = 0; i < zones.length; i++) {
    const zone = zones[i];
    /* eslint-disable no-underscore-dangle */
    zone.hurricane = zone.hurricane_;
    delete zone.hurricane_;
    /* eslint-enable no-underscore-dangle */
    const grade = zone.hurricane;
    if (!(grade.toLowerCase() === 'x' || grade === '0' || grade === '7')) {
      output.push(zone);
    }
  }
  return output;
}
