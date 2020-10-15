/*
 * Copyright (c) 2020. Prototype
 */

export function removeSpacesFromString(str: string): string {
  if (!str) return '';
  return str.replace(/\s/g, '');
}

export function removeNonNumericFromString(str: string): string {
  if (!str) return '';
  return str.replace(/\D/g, '');
}

/**
 * Проверка на непустую стоку
 * <pre>
 * isNotBlank(null)      = false
 * isNotBlank(undefined) = false
 * isNotBlank("")        = false
 * isNotBlank(" ")       = false
 * isNotBlank("bob")     = true
 * isNotBlank("  bob  ") = true
 * </pre>
 *
 * @param str предположительно строка, может быть null или undefined
 * @return (boolean) true если str не пустая и не null и не undefined
 */
export function isNotBlankString(str?: string): boolean {
  if (!!str) {
    return !!str.trim();
  }
  return false;
}

export function getFormattedFioString(fioString: string = ''): string {
  if (!isNotBlankString(fioString)) return '';
  if (fioString.split(' ').length !== 3) return fioString;

  return fioString
    .split(' ')
    .map((item, index) => (!index ? `${item} ` : `${item[0]}.`))
    .join('');
}
