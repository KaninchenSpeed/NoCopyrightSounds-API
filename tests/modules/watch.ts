import * as test from './output'

export const handel = (
  promise: Promise<any>,
  name: string
): Promise<string> => {
  return new Promise((res, rej) => {
    promise
      .then(() => {
        test.pass(name)
        res(name)
      })
      .catch(err => {
        test.fail(name, err)
        rej({ name, err })
      })
  })
}
