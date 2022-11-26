import isObject from '../utils/isObject.js';

const toString = (value, separator, level) => {
  if (isObject(value)) {
    let str = '{\n';
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(value)) {
      const objValue = isObject(value[key])
        ? toString(value[key], separator, level + 1)
        : value[key];
      str += `${separator.repeat(level + 1)}${key}: ${objValue}\n`;
    }
    str += `${separator.repeat(level)}}`;

    return str;
  }
  return value;
};

const format = (changes) => {
  const rootSeparator = '    ';

  const data = changes
    .sort((a, b) => a.key?.localeCompare(b.key))
    .map((change, index) => {
      const {
        type, key, value: rawValue, level,
      } = change;
      const separator = rootSeparator.repeat(level);
      let result;

      const value = toString(rawValue, rootSeparator, level);

      switch (type) {
        case 'nested':
          result = `${separator}${key}: ${format(value, false)}`;
          break;
        case 'same':
          result = `${separator}${key}: ${value}`;
          break;
        case 'added':
          result = `${separator.replace(/ {2}$/, '+ ')}${key}: ${value}`;
          break;
        case 'removed':
          result = `${separator.replace(/ {2}$/, '- ')}${key}: ${value}`;
          break;
        case 'different': {
          const beforeValue = toString(change.beforeValue, rootSeparator, level);
          const afterValue = toString(change.afterValue, rootSeparator, level);

          result = `${separator.replace(/ {2}$/, '- ')}${key}: ${beforeValue}\n${separator.replace(
            / {2}$/,
            '+ ',
          )}${key}: ${afterValue}`;
          break;
        }

        default:
          break;
      }

      const isLast = changes.length === index + 1;
      if (isLast) {
        result += `\n${rootSeparator.repeat(level - 1)}}`;
      }

      return result;
    });

  const joinString = '\n';

  const resultString = `{\n${data.join(joinString)}`;

  return resultString;
};

export default format;
