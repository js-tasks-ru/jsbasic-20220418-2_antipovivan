function camelize(str) {
  let arr = str.split('-');
  return arr[0]+arr.slice(1).map( (elem) => {
    if (elem.length !==0){
      return elem[0].toUpperCase()+elem.slice(1);
    }
    return elem;
  }).join('');
}

