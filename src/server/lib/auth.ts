interface Auth {
  code: string
}

export const CheckAuthorization = async (data:Auth) => {
  const {code} = data
  const codeAccess = process.env.CODE_ACCESS
  if(code === codeAccess) {
    return true
  } else {
    return false
  }
}