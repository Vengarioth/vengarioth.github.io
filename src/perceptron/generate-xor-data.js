import nj from 'numjs';

/*
  Generates data for this xor problem:
y
^ 1 | 0
| --+--
| 0 | 1
+------->x
 */

export default function generateXorData(batches = 40, batchSize = 4) {
  // TODO test data

  const trainData = [];

  for(let t = 0; t < batches; t++) {
    const batch = {
      x: new Array(batchSize),
      y: new Array(batchSize),
    };

    for(let i = 0; i < batchSize; i++) {
      const x1 = Math.random();
      const x2 = Math.random();
      let y = 0;

      if ((x1 < 0.5 && x2 >= 0.5) || (x1 > 0.5 && x2 < 0.5)) {
        y = 1;
      }

      batch.x[i] = [x1, x2];
      batch.y[i] = [y];
    }

    batch.x = nj.array(batch.x);
    batch.y = nj.array(batch.y);
    trainData.push(batch);
  }

  return trainData;
}
