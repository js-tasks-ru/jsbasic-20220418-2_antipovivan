import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';


export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);
    let cartHolder = document.querySelector('[data-carousel-holder]');
    cartHolder.appendChild(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    let ribHolder = document.querySelector('[data-ribbon-holder]');
    ribHolder.appendChild(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({steps:5, value:3});
    let sliderHolder = document.querySelector('[data-slider-holder]');
    sliderHolder.appendChild(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    let iconHolder = document.querySelector('[data-cart-icon-holder]');
    iconHolder.appendChild(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);
    let response = await fetch('products.json');
    response = await response.json();


    this.productsGrid = new ProductsGrid(response);
    let gridHolder = document.querySelector('[data-products-grid-holder]');
    gridHolder.innerHTML = ''
    gridHolder.appendChild(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    let BODY = document.querySelector('body');
    BODY.addEventListener('product-add', (e) => {
      let product = response.filter(item => item.id == e.detail)[0];
      this.cart.addProduct(product);
    })

    let SLIDER = document.querySelector('.slider');
    SLIDER.addEventListener('slider-change', (e) => {
      console.log(e);
      this.productsGrid.updateFilter({
        maxSpiciness: e.detail 
      })
    })

    let RIBBON_MENU =document.querySelector('.ribbon') ;
    RIBBON_MENU.addEventListener('ribbon-select', (e) => {
      console.log(e);
      this.productsGrid.updateFilter({
        category: e.detail 
      });
    })

    let NUTS_CHECKBOX = document.querySelector('#nuts-checkbox');
    NUTS_CHECKBOX.addEventListener('change', (e) => {
      this.productsGrid.updateFilter({
        noNuts: e.target.checked
      });
    })

    let VEG_CHECKBOX = document.querySelector('#vegeterian-checkbox');
    VEG_CHECKBOX.addEventListener('change', (e) => {
        this.productsGrid.updateFilter({vegeterianOnly: e.target.checked})
    })


  }
}
