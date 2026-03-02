import fs from 'fs';

const mapName = process.argv[2];
if (!mapName) {
  console.error('Usage: bun run set-final.ts <map-name>');
  process.exit(1);
}

const dataFile = './_data.json';

let data: any;
try {
  data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
} catch (err) {
  console.error('Could not read', dataFile);
  process.exit(1);
}

if (!data.maps || !data.maps[mapName]) {
  console.error(`Map ${mapName} not found in data file.`);
  process.exit(1);
}

data.maps[mapName].final = true;
fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
console.log(`Map ${mapName} marked as final.`);

