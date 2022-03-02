import stylishFormater from './stylish.js';

const formaterFactory = (format) => {
  switch (format) {
    case 'stylish':
      return stylishFormater;
    //   case 'json':
    // return JSON.parse;
    default:
      throw new Error(`Unknown format! ${format}`);
  }
};

export default formaterFactory;
