export const encodeForDatabase = (value: string): string => {
  value = value.split('.').join('_P')
          .split('$').join('_S')
          .split('#').join('_H')
          .split('[').join('_LB')
          .split(']').join('_RB')
          .split('/').join('_B')
  return value
}

export const decodeFromDatabase = (value: string): string => {
  value = value.split('_P').join('.')
          .split('_S').join('$')
          .split('_H').join('#')
          .split('_LB').join('[')
          .split('_RB').join(']')
          .split('_B').join('/')
  return value
}