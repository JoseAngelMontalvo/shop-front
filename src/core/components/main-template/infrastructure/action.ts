export type Action =
  | { type: 'search'; result: string }
  | { type: 'refreshValue'; result: string }
  | { type: 'clearValue'; result: string }
