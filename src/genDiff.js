export default (firstObject, secondObject, level = 0) => {
  const firstKeys = Object.keys(firstObject);
  const secondKeys = Object.keys(secondObject);

  const changes = [];

  firstKeys.forEach((key) => {
    const isExist = secondKeys.includes(key);
    const firstValue = firstObject[key];
    const secondValue = secondObject[key];

    if (isExist) {
      if (firstValue === secondValue) {
        changes.push({ key, value: firstValue, type: 'same' });
      } else {
        changes.push({
          type: 'different',
          key,
          beforeValue: firstValue,
          afterValue: secondValue,
        });
      }
    } else {
      changes.push({ key, value: firstValue, type: 'removed' });
    }
  });

  const addedKeys = secondKeys.filter((secondKey) => !firstKeys.includes(secondKey));
  if (addedKeys.length) {
    const dataForPush = addedKeys.map((key) => ({
      type: 'added',
      key,
      value: secondObject[key],
    }));
    changes.push(...dataForPush);
  }

  const separator = ' '.repeat(level + 2);

  const data = changes
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((change) => {
      const { type, key, value } = change;
      let result;

      switch (type) {
        case 'same':
          result = `${key}: ${value}`;
          break;
        case 'added':
          result = `+ ${key}: ${value}`;
          break;
        case 'removed':
          result = `- ${key}: ${value}`;
          break;
        case 'different':
          result = `- ${key}: ${change.beforeValue}\n${separator}+ ${key}: ${change.afterValue}`;
          break;
        default:
          break;
      }

      return result;
    });

  const joinString = `\n${separator}`;
  const resultString = `{\n  ${data.join(joinString)}\n}`;

  return resultString;
};
