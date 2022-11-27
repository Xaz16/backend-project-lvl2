import _ from 'lodash';
import isObject from '../utils/isObject.js';

const addToPath = (path, key) => (path.length !== 0 ? `${path}.${key}` : key);
const formatValue = (value) => {
  if (isObject(value) || Array.isArray(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const format = (changes, path = '') => {
  const sortedChanges = _.sortBy(changes, (change) => change.key);

  return sortedChanges
    .map((change) => {
      switch (change.type) {
        case 'nested':
          return format(change.value, `${addToPath(path, change.key)}`);

        case 'added':
          return `Property '${addToPath(path, change.key)}' was added with value: ${formatValue(
            change.value,
          )}`;

        case 'removed':
          return `Property '${addToPath(path, change.key)}' was removed`;

        case 'different':
          return `Property '${addToPath(path, change.key)}' was updated. From ${formatValue(
            change.beforeValue,
          )} to ${formatValue(change.afterValue)}`;

        default:
          break;
      }

      return null;
    })
    .filter((val) => val)
    .join('\n');
};

export default format;
