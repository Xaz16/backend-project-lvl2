import * as fs from 'fs';
import * as path from 'path';
import genDiff from '../genDiff.js';
import getFileFormat from '../getFileFormat.js';
import getParser from '../parsers/parserFactory.js';

const extractData = (filePath) => {
  const resolvedPath = path.resolve(filePath);
  const fileFormat = getFileFormat(resolvedPath);
  const parser = getParser(fileFormat);
  const data = parser(fs.readFileSync(resolvedPath, 'utf-8'));

  return data;
};

export default (...paths) => {
  const objects = paths.map((filePath) => extractData(filePath));

  const data = genDiff(...objects);

  return data;
};
