export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getFixedRandomString<T>(items: T[], quantity: number): string {
  let result = '';
  for (let i = 0; i < quantity; i++) {
    result = `${result};${getRandomItem<T>(items)}`.replace(/^;+/, '');
  }
  return result;
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}