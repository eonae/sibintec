const fs = require('fs');
const path = require('path');

module.exports = {

  random(min, max, step) {

    if (min % step !== 0 || max % step !== 0)
      throw new Error('<min> and <max> must be dividable by <step>.');

    min /= step;
    max /= step;

    const rnd = min + Math.random() * (max + 1 - min);
    return Math.floor(rnd) * step;
  },

  readJson(fileName) {

    const encoding = 'utf8';
    const fullName = path.join(__dirname, 'data', fileName);

    return new Promise((resolve, reject) => {
      fs.readFile(fullName, encoding, (fsError, json) => {
        if (fsError)
          reject(fsError);
        else {
          try {
            resolve(JSON.parse(json));
          } catch (parseError) {
            reject(parseError);
          }
        }
      })
    });
  }
}