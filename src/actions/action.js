import * as fs from 'fs';
import * as path from 'path';
import genDiff from '../genDiff.js';
import getFileFormat from '../getFileFormat.js';
import getParser from '../parsers/factory.js';
import getFormatter from '../formaters/factory.js';

const extractData = (filePath) => {
  const resolvedPath = path.resolve(filePath);
  const fileFormat = getFileFormat(resolvedPath);
  const parser = getParser(fileFormat);
  const data = parser(fs.readFileSync(resolvedPath, 'utf-8'));

  return data;
};

export default (firstPath, secondPath, format = 'stylish') => {
  const objects = [firstPath, secondPath].map((filePath) => extractData(filePath));

  const changes = genDiff(...objects);
  const formatter = getFormatter(format);
  const data = formatter(changes);

  return data;
};
