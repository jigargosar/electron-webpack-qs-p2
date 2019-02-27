import * as R from 'ramda'
import validate from 'aproba'

export function overProp(prop) {
  return R.over(R.lensProp(prop))
}

export function toggleProp(key) {
  validate('S', arguments)
  return overProp(key)(R.not)
}
