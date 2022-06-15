export function nameValidator(name: string) {
  const isValid = /^([A-Za-z]{2,12})$/.test(name);

  return isValid;
}
