export function alternateArrays(arr1: any[], arr2: any[]) {
  const result = []
  const rest = []
  if (arr1 && arr2) {
    const maxLen = Math.max(arr1.length, arr2.length)
    for (let i = 0; i < maxLen; i++) {
      if (arr1[i] !== undefined && arr2[i] !== undefined) {
        result.push(arr1[i])
        result.push(arr2[i])
      } else if (arr1[i] !== undefined) {
        rest.push(arr1[i])
      } else if (arr2[i] !== undefined) {
        rest.push(arr2[i])
      }
    }
  }
  return {
    alternated: result,
    rest,
  }
}
