import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import action from '../src/actions/action.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('main action', () => {
  const fixtureDir = path.resolve(__dirname, '__fixtures__');
  const getFixtureFilePath = (fileName) => path.join(fixtureDir, fileName);

  const firstExampleJsonPath = getFixtureFilePath('file1.json');
  const firstExampleYmlPath = getFixtureFilePath('file1.yml');
  const secondExampleJsonPath = getFixtureFilePath('file2.json');
  const secondExampleYamlPath = getFixtureFilePath('file2.yml');
  const resultPath = getFixtureFilePath('result.txt');

  let expectedResult;

  beforeAll(() => {
    expectedResult = fs.readFileSync(resultPath, 'utf-8');
  });

  it('should compare flat objects in json', () => {
    const result = action([firstExampleJsonPath, secondExampleJsonPath]);
    expect(result).toEqual(expectedResult);
  });

  it('should compare flat objects in yml/yaml', () => {
    const result = action([firstExampleYmlPath, secondExampleYamlPath]);
    expect(result).toEqual(expectedResult);
  });

  it('should compare flat objects in yml/yaml or/and json', () => {
    const firstResult = action([firstExampleYmlPath, secondExampleJsonPath]);
    expect(firstResult).toEqual(expectedResult);
    const secondResult = action([firstExampleJsonPath, secondExampleYamlPath]);
    expect(secondResult).toEqual(expectedResult);
  });
});

describe('main action deep', () => {
  const fixtureDir = path.resolve(__dirname, '__fixtures__');
  const getFixtureFilePath = (fileName) => path.join(fixtureDir, fileName);

  const firstExampleJsonPath = getFixtureFilePath('file3.json');
  const firstExampleYmlPath = getFixtureFilePath('file3.yml');
  const secondExampleJsonPath = getFixtureFilePath('file4.json');
  const secondExampleYamlPath = getFixtureFilePath('file4.yaml');
  const resultPath = getFixtureFilePath('result2.txt');

  let expectedResult;

  beforeAll(() => {
    expectedResult = fs.readFileSync(resultPath, 'utf-8');
  });

  it('should compare flat objects in json', () => {
    const result = action([firstExampleJsonPath, secondExampleJsonPath]);
    expect(result).toEqual(expectedResult);
  });

  it('should compare flat objects in yml/yaml', () => {
    const result = action([firstExampleYmlPath, secondExampleYamlPath]);
    expect(result).toEqual(expectedResult);
  });

  it('should compare flat objects in yml/yaml or/and json', () => {
    const firstResult = action([firstExampleYmlPath, secondExampleJsonPath]);
    expect(firstResult).toEqual(expectedResult);
    const secondResult = action([firstExampleJsonPath, secondExampleYamlPath]);
    expect(secondResult).toEqual(expectedResult);
  });
});
