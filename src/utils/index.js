export const getRights = (arr, newArr) => {
  if (arr && arr.length !== 0) {
    arr.forEach(item => {
      newArr.push(item.id)
      return getRights(item.children, newArr)
    })
  }
  return newArr
}
