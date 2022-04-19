function checkSpam(str) {
  let reg1xbet=/.*1xbet.*/;
  let regxxx=/.*xxx.*/;
  str = str.toLowerCase()
  if (str.match(reg1xbet) || str.match(regxxx) ){
    return true;
  }
  return false;
}

