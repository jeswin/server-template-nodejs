export function getSingleValue(value: string | string[] | undefined) {
  return value !== undefined
    ? Array.isArray(value)
      ? value[0]
      : value
    : undefined;
}
