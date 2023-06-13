// trackBy Item
export function trackItem(index: number, item: any): any {
  return item ? item.id : null;
}

export const currentTimestampDate = (): string => new Date().getTime().toString();

export const capitalizeFirstLetter = (login: string): string =>
  login.charAt(0).toUpperCase() + login.slice(1);
