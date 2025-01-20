import os from 'os';

export function isWindows() {
  return os.platform().startsWith('win');
}
