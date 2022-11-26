import { writeFileSync } from 'fs';

const format = (changes) => {
  const result = JSON.stringify(changes);

  writeFileSync('./result.json', result, 'utf-8');

  return 'The changes were written to a file result.json';
};

export default format;
