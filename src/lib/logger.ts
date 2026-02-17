import { IS_DEV } from './constants';

export const logger = {
  info: (...args: unknown[]) => {
    if (IS_DEV) console.log('[INFO]', ...args);
  },
  error: (...args: unknown[]) => {
    console.error('[ERROR]', ...args);
  }
};
