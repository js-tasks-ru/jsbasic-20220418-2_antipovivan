/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  
  constructor(rows) {
    this.rows = rows;
    this.elem = this.createTable()
  }

  renderRow = row =>{
    let result = '';
    for (let key in row) {
      result+=`<td>${row[key]}</td>`;
    }
    result+='<td><button>X</button></td>';
    return `<tr>${result}</tr>`;
  }

  createTable = () =>{
    let template = `
      <thead>
          <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
              <th></th>
          </tr>
      </thead>
      <tbody>${this.rows.map(row => this.renderRow(row)).join('')}</tbody>
    `
    
    let elem = document.createElement('table');
    elem.innerHTML = template;
    let BODY = elem.querySelector('tbody');

    [...BODY.querySelectorAll('tr')].forEach(row => {
      let removeButton = row.querySelector('button');

      removeButton.addEventListener('click', (event) =>{
        row.remove();
      })
    })

    return elem;
    }
  
  // elem = this.createTable();
  }

