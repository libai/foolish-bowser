export default function proxyrequire(name) {
  try {
    if (System && System._nodeRequire) {
      return System._nodeRequire(name);
    } else if (typeof window === 'object') {
      return window.require(name);
    }
    return require(name);
  } catch (err) {
    if (process.versions.electron) {
      throw err;
    } else {
      console.log('Native module not found:', err);
    }
  }
}
