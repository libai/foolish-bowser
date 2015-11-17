import proxyrequire from './node/proxyrequire';

export {env} from './node/env';

export const os = proxyrequire('os');
export const electron = proxyrequire('electron');
