export function ensureIsPlainObject(value) {
  const isPlainObject =
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value);

  if (!isPlainObject) {
    throw new TypeError('Expected a plain object');
  }

  return value;
}

export function ensureIsArray(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('Expected an array');
  }

  return values;
}
