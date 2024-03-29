import yaml from 'yaml';

const parserFactory = (format) => {
  switch (format) {
    case 'yaml':
    case 'yml':
      return yaml.parse;
    case 'json':
      return JSON.parse;
    default:
      throw new Error(`Unknown format! ${format}`);
  }
};

export default parserFactory;
