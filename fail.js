function readonly(target, name, descriptor) {
  descriptor.readonly = false;
  return descriptor;
}
function namespace(target, name, descriptor) {
  descriptor.namespace = false;
  return descriptor;
}
function stat(value) {
   return function decorator(target) {
      target.stat = value;
   }
}

class PatternManifestError extends Error {
    @readonly
    @stat('PatternManifestError')
    name() {}

    @readonly
    @namespace
    get message() {}

    @readonly
    @namespace
    get meta() {}
}

function patternManifestErrorFactory(...args) {
    return new PatternManifestError(...args);
}

export default patternManifestErrorFactory;
export {PatternManifestError};
