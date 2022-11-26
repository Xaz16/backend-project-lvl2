import isObject from '../utils/isObject.js';

const addToPath = (path, key) => (path.length !== 0 ? `${path}.${key}` : key);
const formatValue = (value) => {
  let result = value;
  if (isObject(value) || Array.isArray(value)) {
    result = '[complex value]';
  } else if (typeof result === 'string') {
    result = `'${value}'`;
  }

  return result;
};

const format = (changes, path = '') => changes
  .sort((a, b) => a.key?.localeCompare(b.key))
  .map((change) => {
    let result;

    switch (change.type) {
      case 'nested':
        result = format(change.value, `${addToPath(path, change.key)}`);
        break;
      case 'added':
        result = `Property '${addToPath(path, change.key)}' was added with value: ${formatValue(
          change.value,
        )}`;
        break;
      case 'removed':
        result = `Property '${addToPath(path, change.key)}' was removed`;
        break;
      case 'different':
        result = `Property '${addToPath(path, change.key)}' was updated. From ${formatValue(
          change.beforeValue,
        )} to ${formatValue(change.afterValue)}`;
        break;
      default:
        break;
    }

    return result;
  })
  .filter((val) => val)
  .join('\n');

export default format;
