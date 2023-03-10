export function alternateArrays(arr1: any[], arr2: any[]) {
  var result = [];
  var rest = [];
  if(arr1 && arr2) {
    var maxLen = Math.max(arr1.length, arr2.length);
    for (var i = 0; i < maxLen; i++) {
        if (arr1[i] !== undefined && arr2[i] !== undefined) {
            result.push(arr1[i]);
            result.push(arr2[i]);
        } else if (arr1[i] !== undefined) {
            rest.push(arr1[i]);
        } else if (arr2[i] !== undefined) {
            rest.push(arr2[i]);
        }
    }
  }
  return {
      alternated: result,
      rest: rest
  };
}