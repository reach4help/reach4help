import fs from 'fs';

function getObjectIDs(filename) {
  console.log(filename);
  const stream1 = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
  const json = JSON.parse(stream1);
  if (filename.includes('prod')) {
    console.log('debug', stream1.substring(0, 100));
  }
  const ids = {};
  console.log('j', json.length);
  json.forEach(hit => {
    if (hit.id) {
      const keyValue = ids[hit.id];
      ids[hit.id] = keyValue ? keyValue + 1 : 1;
      if (ids[hit.id] > 1) {
        console.log('duplicate id', hit.id);
      }
    } else {
      console.log('Missing', hit.objectID, hit);
    }
  });
  return ids;
}

const { argv } = process;
const objectIDs1 = getObjectIDs(argv[2]);
const objectIDs2 = getObjectIDs(argv[3]);
let same = 0;
let diff = 0;
let undef = 0;
const keys = Object.keys(objectIDs1);
const keys2 = Object.keys(objectIDs2);
console.log(keys.length, keys2.length);
keys.forEach(key => {
  if (objectIDs2[key]) {
    same = same + 1;
  } else {
    diff = diff + 1;
  }
});
console.log('Same', same, 'Different', diff);
