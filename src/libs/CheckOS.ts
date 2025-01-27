import os = require('os');

export function isWindows() {
  return os.platform().startsWith('win');
}
