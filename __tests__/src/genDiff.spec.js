import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import genDiff from '../../src/genDiff.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('genDiff', () => {
  const fixtureDir = path.resolve(__dirname, '..', '__fixtures__');
  const firstExamplePath = path.join(fixtureDir, 'file1.json');
  const secondExamplePath = path.join(fixtureDir, 'file2.json');
  const resultPath = path.join(fixtureDir, 'result.txt');

  let firstObject;
  let secondObject;
  let expectedResult;

  beforeAll(() => {
    firstObject = JSON.parse(fs.readFileSync(firstExamplePath, 'utf-8'));
    secondObject = JSON.parse(fs.readFileSync(secondExamplePath, 'utf-8'));
    expectedResult = fs.readFileSync(resultPath, 'utf-8');
  });

  it('should compare flat objects', () => {
    const result = genDiff(firstObject, secondObject);
    expect(result).toEqual(expectedResult);
  });
});
