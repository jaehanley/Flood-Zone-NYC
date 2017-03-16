export default function modelZones(zones) {
  const output = [];
  for (let i = 0; i < zones.length; i++) {
    const zone = zones[i];
    const grade = zone.hurricane;
    if (!(grade.toLowerCase() === 'x' || grade === '0' || grade === '7')) {
      output.push(zone);
    }
  }
  return output;
}
