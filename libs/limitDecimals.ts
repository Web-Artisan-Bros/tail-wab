export function limitDecimals(num: number, decimals: number): number {
  return parseFloat(num.toFixed(decimals))
}
