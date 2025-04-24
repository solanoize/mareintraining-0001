export function safeChange(e) {
  const name = e?.target?.name;
  const type = e?.target?.type;
  let value = e?.target?.value;
  if (type === 'number') {
    value = Number(value.replace(/^0+/, ''));
  }

  return [name, value];
}