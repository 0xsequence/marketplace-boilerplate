/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// replacer and revivier for JSON.stringify/parse to support BigInt

// JSON.stringify({...}, BigIntReplacer)
export const BigIntReplacer = (_: any, value: any) =>
  typeof value === 'bigint' ? { type: 'bigint', v: value.toString() } : value;

// JSON.parse({...}, BigIntReviver)
export const BigIntReviver = (_: any, value: any) =>
  value?.type === 'bigint' ? BigInt(value.v) : value;
