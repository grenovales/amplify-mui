export function mergeDeep(target, source) {
  if (!source) return target;

  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) {
      source[key] = {
        ...target[key],
        ...source[key]
      };
    }
  }

  return {
    ...target,
    ...source
  };
}
