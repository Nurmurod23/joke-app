export const JOKE_CATEGORIES = [
  'Dad Jokes',
  'Puns',
  'One-liners',
  'Knock-knock',
  'Programming',
] as const;

export type JokeCategory = typeof JOKE_CATEGORIES[number];