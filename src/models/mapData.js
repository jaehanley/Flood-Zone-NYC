export default function modelZones(zones) {
  const output = [];
  for (let i = 0; i < zones.length; i++) {
    const zone = zones[i];
    const grade = zone.properties.hurricane;
    if (!(grade === '6' || grade.toLowerCase() === 'x')) {
      output.push(zone);
    }
  }
  return output;
}
