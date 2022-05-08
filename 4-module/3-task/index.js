function highlight(table) {
  for (let i = 0; i<table.rows.length;i++){ 
    if (typeof table.rows[i].cells[3].dataset.available ==='undefined'){
      table.rows[i].setAttribute('hidden','');
    }
    else if (table.rows[i].cells[3].dataset.available==='true') table.rows[i].classList.add("available");
    else table.rows[i].classList.add("unavailable");
    table.rows[i].cells[2].innerText === 'm' ? table.rows[i].classList.add("male") :  table.rows[i].classList.add("female");
    if (18 > +table.rows[i].cells[1].innerText) table.rows[i].setAttribute('style','text-decoration: line-through');
  }
}
