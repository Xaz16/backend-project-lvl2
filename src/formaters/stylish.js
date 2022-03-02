export default (changes) => {
  const rootSeparator = ' ';

  const data = changes
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((change) => {
      const {
        type, key, value, level,
      } = change;
      const separator = rootSeparator.repeat(level + 2);

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

  const joinString = `\n${rootSeparator.repeat(2)}`;
  const resultString = `{\n  ${data.join(joinString)}\n}`;

  return resultString;
};
