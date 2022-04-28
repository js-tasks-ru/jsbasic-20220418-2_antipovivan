function getMinMax(str) {
  let reg = /[\d\.]+/;
  let arr = str.split(' ')
  let matches = arr.filter((elem) => elem.match(reg)).map( elem => +elem);
  return {min: Math.min(...matches), max: Math.max(...matches)}
}
