#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import mainAction from '../src/actions/action.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv)
  .action((firstFilePath, secondFilePath) => {
    const data = mainAction(firstFilePath, secondFilePath);
    console.log(data);
  });

program.parse(process.argv);
