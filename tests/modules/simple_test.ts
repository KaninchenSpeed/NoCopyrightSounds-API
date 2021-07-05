export const promise = (feature: Function, arglist: any[][]): Promise<any> => {
  if (arglist == []) {
    return new Promise(async (res, rej) => {
      try {
        const out = await feature()
        res(out)
      } catch (err) {
        rej(err)
      }
    })
  } else {
    return Promise.all(
      arglist.map((arg: any[]): Promise<any> => {
        return new Promise(async (res, rej) => {
          try {
            const out = await feature(...arg)
            res(out)
          } catch (err) {
            rej(err)
          }
        })
      })
    )
  }
}

export const normal = (feature: Function, arglist: any[][]): Promise<any> => {
  if (arglist == []) {
    return new Promise(async (res, rej) => {
      try {
        const out = feature()
        res(out)
      } catch (err) {
        rej(err)
      }
    })
  } else {
    return Promise.all(
      arglist.map((arg: any[]): Promise<any> => {
        return new Promise(async (res, rej) => {
          try {
            const out = feature(...arg)
            res(out)
          } catch (err) {
            rej(err)
          }
        })
      })
    )
  }
}
