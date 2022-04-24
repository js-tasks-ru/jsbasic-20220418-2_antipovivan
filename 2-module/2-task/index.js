function isEmpty(obj) {
  let cnt = 0;
  for (let i in obj){
    cnt+=1;
  }
  return !Boolean(cnt)
}

