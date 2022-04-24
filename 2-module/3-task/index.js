let calculator = {
  read(a,b){
    this.a=a;
    this.b=b;
  },
  sum(){
    let res = 0; 
    for (let key in this){
      if (typeof(this[key]) === 'number'){
        res+=this[key]
      }
    }
    return res;
  },
  mul(){
    let res = 1; 
    for (let key in this){
      if (typeof(this[key]) === 'number'){
        res*=this[key]
      }
    }
    return res;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально


