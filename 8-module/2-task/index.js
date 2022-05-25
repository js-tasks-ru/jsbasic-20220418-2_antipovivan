import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.createGrid();
  }

  createGrid(){

    let template=`
    <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>
    `;
    let grid = createElement(template);
    let inner = grid.querySelector('.products-grid__inner');
    for (let prod of this.products){
      inner.appendChild(new ProductCard(prod).elem);
    }
    return grid;
  }

  updateFilter(filters){
    let res = this.products;
    this.filters = {...this.filters, ... filters};
    if (this.filters.noNuts) res = res.filter(e => this.filters.noNuts == !e.nuts);
    if (this.filters.vegeterianOnly) res = res.filter(e => this.filters.vegeterianOnly == e.vegeterian);
    if (this.filters.maxSpiciness) res = res.filter(e => this.filters.maxSpiciness >= e.spiciness);
    if (this.filters.category) res = res.filter(e => this.filters.category == e.category);

    let inner = this.elem.querySelector('.products-grid__inner');
    inner.innerHTML = '';
    for (let prod of res){
      inner.appendChild(new ProductCard(prod).elem);
    }
  }



}
