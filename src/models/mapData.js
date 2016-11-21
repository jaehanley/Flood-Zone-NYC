export default function modelZones(zones) {
  const output = [];
  for (let i = 0; i < zones.length; i++) {
    const zone = zones[i];
    const grade = zone.properties.hurricane;
    if (!(grade.toLowerCase() === 'x' || grade === '0')) {
      output.push(zone);
    }
  }
  return output;
}
