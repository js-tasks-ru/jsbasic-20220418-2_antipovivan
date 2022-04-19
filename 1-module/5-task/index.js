function truncate(str, maxlength) {
  if (str.length>maxlength-1){
    let result = str.slice(0,maxlength-1)+'…';
    return result;
  }
  return str;
}
