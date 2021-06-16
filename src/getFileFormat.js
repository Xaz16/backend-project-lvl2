import * as path from 'path';

export default (filePath) => path.extname(filePath).split('.')[1];
