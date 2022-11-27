import isObject from './utils/isObject.js';

const getDiff = (firstObject, secondObject, level = 1) => {
  const firstKeys = Object.keys(firstObject);
  const secondKeys = Object.keys(secondObject);

  const firstChanges = firstKeys.map((key) => {
    const isExist = secondKeys.includes(key);
    const firstValue = firstObject[key];
    const secondValue = secondObject[key];

    if (isExist) {
      if (isObject(firstValue) && isObject(secondValue)) {
        return {
          key,
          type: 'nested',
          value: getDiff(firstValue, secondValue, level + 1),
          level,
        };
      }

      if (firstValue === secondValue) {
        return {
          key,
          value: firstValue,
          type: 'same',
          level,
        };
      }
      return {
        type: 'different',
        key,
        beforeValue: firstValue,
        afterValue: secondValue,
        level,
      };
    }
    return {
      key,
      value: firstValue,
      type: 'removed',
      level,
    };
  });

  const addedKeys = secondKeys
    .filter((secondKey) => !firstKeys.includes(secondKey))
    .map((key) => ({
      type: 'added',
      key,
      value: secondObject[key],
      level,
    }));

  return [...firstChanges, ...addedKeys];
};

export default getDiff;
