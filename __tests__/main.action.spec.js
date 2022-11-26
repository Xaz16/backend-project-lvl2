import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import action from '../src/actions/action.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('main action deep', () => {
  const fixtureDir = path.resolve(__dirname, '__fixtures__');
  const getFixtureFilePath = (fileName) => path.join(fixtureDir, fileName);

  const firstExampleJsonPath = getFixtureFilePath('file3.json');
  const firstExampleYmlPath = getFixtureFilePath('file3.yml');
  const secondExampleJsonPath = getFixtureFilePath('file4.json');
  const secondExampleYamlPath = getFixtureFilePath('file4.yml');
  const resultPath = getFixtureFilePath('result2.txt');

  let expectedResult;

  beforeAll(() => {
    expectedResult = fs.readFileSync(resultPath, 'utf-8');
  });

  it('should compare deep objects in json', () => {
    const result = action([firstExampleJsonPath, secondExampleJsonPath]);
    expect(result).toEqual(expectedResult);
  });

  it('should compare deep objects in yml/yaml', () => {
    const result = action([firstExampleYmlPath, secondExampleYamlPath]);
    expect(result).toEqual(expectedResult);
  });

  it('should compare deep objects in yml/yaml or/and json', () => {
    const firstResult = action([firstExampleYmlPath, secondExampleJsonPath]);
    expect(firstResult).toEqual(expectedResult);
    const secondResult = action([firstExampleJsonPath, secondExampleYamlPath]);
    expect(secondResult).toEqual(expectedResult);
  });
});

describe('main action plain', () => {
  const fixtureDir = path.resolve(__dirname, '__fixtures__');
  const getFixtureFilePath = (fileName) => path.join(fixtureDir, fileName);

  const firstExampleJsonPath = getFixtureFilePath('file3.json');
  const firstExampleYmlPath = getFixtureFilePath('file3.yml');
  const secondExampleJsonPath = getFixtureFilePath('file4.json');
  const secondExampleYamlPath = getFixtureFilePath('file4.yml');
  const resultPath = getFixtureFilePath('result3.txt');

  let expectedResult;

  beforeAll(() => {
    expectedResult = fs.readFileSync(resultPath, 'utf-8');
  });

  it('should compare deep objects in json', () => {
    const result = action([firstExampleJsonPath, secondExampleJsonPath], 'plain');
    expect(result).toEqual(expectedResult);
  });

  it('should compare deep objects in yml/yaml', () => {
    const result = action([firstExampleYmlPath, secondExampleYamlPath], 'plain');
    expect(result).toEqual(expectedResult);
  });

  it('should compare deep objects in yml/yaml or/and json', () => {
    const firstResult = action([firstExampleYmlPath, secondExampleJsonPath], 'plain');
    expect(firstResult).toEqual(expectedResult);
    const secondResult = action([firstExampleJsonPath, secondExampleYamlPath], 'plain');
    expect(secondResult).toEqual(expectedResult);
  });
});
