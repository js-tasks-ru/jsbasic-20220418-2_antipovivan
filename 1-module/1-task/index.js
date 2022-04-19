function factorial(n) {
  if (Number.isInteger(n) && n>=0){
    let result=1;
    for (let i=1;i<=n;i++){
      result*=i;
    }
    return result;
  }
  return null;
}

