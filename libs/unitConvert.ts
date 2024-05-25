import { limitDecimals } from '~/libs/limitDecimals'

export type Unit = 'px' | 'rem'

export function unitConvert (value: number, from: Unit, to: Unit) {
  // convert value from from unit to to unit
  if (from === 'px' && to === 'rem') {
    return limitDecimals(value / 16, 4)
  } else if (from === 'rem' && to === 'px') {
    return limitDecimals(value * 16, 4)
  }
  
  return value
}
