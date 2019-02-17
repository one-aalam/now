export const normalize = (list) => Object.keys(list).map(key => {
  return {
    key,
    ...list[key]
  }
});