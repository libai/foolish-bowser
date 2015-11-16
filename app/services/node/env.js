import proxyrequire from './proxyrequire';
export const env = (typeof window === 'object' && window.env) ? window.env : proxyrequire('../../env_config.json');
