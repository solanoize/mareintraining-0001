export function parseInput(e) {
  const name = e?.target?.name;
  const type = e?.target?.type;
  let value = e?.target?.value;
  if (type === 'number') {
    value = Number(value.replace(/^0+/, ''));
  }

  return [name, value];
}

export function getFieldError(errors, field) {
  const raw = errors?.data?.[field];

  if (!raw) return null;
  if (Array.isArray(raw)) return raw.join("."); // ambil error pertama
  if (typeof raw === "string") return raw;

  return null; // fallback
}