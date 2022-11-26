import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

const formatterFactory = (format) => {
  switch (format) {
    case 'stylish':
      return stylishFormatter;
    case 'plain':
      return plainFormatter;
    default:
      throw new Error(`Unknown format! ${format}`);
  }
};

export default formatterFactory;
