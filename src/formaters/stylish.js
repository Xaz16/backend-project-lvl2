import isObject from '../utils/isObject.js';

const toString = (value, separator, level) => {
  if (isObject(value)) {
    const str = Object.keys(value).reduce((result, key) => {
      const objValue = isObject(value[key])
        ? toString(value[key], separator, level + 1)
        : value[key];
      return `${result}${separator.repeat(level + 1)}${key}: ${objValue}\n`;
    }, '');

    return `{\n${str}${separator.repeat(level)}}`;
  }
  return value;
};

const format = (changes, rootLevel = 0) => {
  const rootSeparator = '    ';

  const data = changes
    .sort((a, b) => a.key?.localeCompare(b.key))
    .map((change) => {
      const {
        type, key, value: rawValue, level,
      } = change;
      const separator = rootSeparator.repeat(level);
      let result;

      const value = toString(rawValue, rootSeparator, level);

      switch (type) {
        case 'nested':
          return `${separator}${key}: ${format(change.value, level)}`;
        case 'same':
          return `${separator}${key}: ${value}`;
        case 'added':
          return `${separator.replace(/ {2}$/, '+ ')}${key}: ${value}`;
        case 'removed':
          return `${separator.replace(/ {2}$/, '- ')}${key}: ${value}`;
        case 'different': {
          const beforeValue = toString(change.beforeValue, rootSeparator, level);
          const afterValue = toString(change.afterValue, rootSeparator, level);

          return `${separator.replace(/ {2}$/, '- ')}${key}: ${beforeValue}\n${separator.replace(
            / {2}$/,
            '+ ',
          )}${key}: ${afterValue}`;
        }

        default:
          break;
      }

      return result;
    });

  const resultString = `{\n${data.join('\n')}\n${rootSeparator.repeat(rootLevel)}}`;

  return resultString;
};

export default format;
