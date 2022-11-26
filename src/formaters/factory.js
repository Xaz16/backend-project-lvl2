import stylishFormater from './stylish.js';

const formaterFactory = (format) => {
  switch (format) {
    case 'stylish':
      return stylishFormater;
    default:
      throw new Error(`Unknown format! ${format}`);
  }
};

export default formaterFactory;
