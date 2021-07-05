export const pass = (name: string) => {
  console.log(`✔️  passed | ${name}`)
}

export const fail = (name: string, reason: any) => {
  console.error(`❌  failed | ${name} | ${reason}`)
}

export const allPass = () => {
  console.log(`\n\n
      -----------------------------
          ✔️  all tests passed
      -----------------------------
    `)
}

export const allFail = () => {
  console.log(`\n\n
    ------------------------------------
        ❌  at least one test failed
    ------------------------------------
  `)
}
