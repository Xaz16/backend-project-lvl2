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
        changes.push({
          key, value: firstValue, type: 'same', level,
        });
      } else {
        changes.push({
          type: 'different',
          key,
          beforeValue: firstValue,
          afterValue: secondValue,
          level,
        });
      }
    } else {
      changes.push({
        key, value: firstValue, type: 'removed', level,
      });
    }
  });

  const addedKeys = secondKeys.filter(
    (secondKey) => !firstKeys.includes(secondKey),
  );
  if (addedKeys.length) {
    const dataForPush = addedKeys.map((key) => ({
      type: 'added',
      key,
      value: secondObject[key],
      level,
    }));
    changes.push(...dataForPush);
  }

  return changes;
};
