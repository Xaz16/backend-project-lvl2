import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

const formatterFactory = (format) => {
  switch (format) {
    case 'stylish':
      return stylishFormatter;
    case 'plain':
      return plainFormatter;
    case 'json':
      return jsonFormatter;
    default:
      throw new Error(`Unknown format! ${format}`);
  }
};

export default formatterFactory;
