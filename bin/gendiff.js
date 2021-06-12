#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import * as fs from 'fs';
import * as path from 'path';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv)
  .action((firstFilePath, secondFilePath) => {
    const preparedFirstPath = path.resolve(firstFilePath);
    const preparedSecondPath = path.resolve(secondFilePath);
    const firstObject = JSON.parse(fs.readFileSync(preparedFirstPath), 'utf-8');
    const secondObject = JSON.parse(fs.readFileSync(preparedSecondPath), 'utf-8');

    const data = genDiff(firstObject, secondObject);

    console.log(data);
  });

program.parse(process.argv);
