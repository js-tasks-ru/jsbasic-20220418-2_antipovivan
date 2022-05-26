import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    
    if (!product) return;
    let sameProd = this.cartItems.filter(item => item.product.id === product.id);
    if (sameProd.length === 0){
      this.cartItems = [...this.cartItems,{product, count : 1}];
      sameProd.push({product, count : 1});
    }
    else {
      sameProd[0].count += 1;
    }
    this.onProductUpdate( sameProd[0]);
  }

  updateProductCount(productId, amount) {
    let sameProd = this.cartItems.filter(item => item.product.id === productId);
    if (sameProd.length === 0) return
    sameProd[0].count += amount;
    if (sameProd[0].count === 0){
      this.cartItems = this.cartItems.filter(e => e.product.id !== sameProd[0].product.id);
    }
    this.onProductUpdate( sameProd[0]);
  }

  isEmpty() {
    return this.cartItems.length === 0 ? true : false;
  }

  getTotalCount() {
    let amount = 0;
    for (let prod of this.cartItems){
      amount+=prod.count;
    }
    return amount;
  }

  getTotalPrice() {
    return this.cartItems.map(item => item.count*item.product.price).reduce(
      (prev, curr) => prev + curr, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    modal.setTitle("Your order");
    let template = `
    <div>
      ${this.cartItems.map(cart => {
        return this.renderProduct(cart.product, cart.count).outerHTML
      }).join('\n')}
      ${this.renderOrderForm().outerHTML}
    </div>
    `;
    modal.setBody(createElement(template));
    let pluses = [... modal.modal.querySelectorAll('.cart-counter__button_plus')];
    let minuses = [...modal.modal.querySelectorAll('.cart-counter__button_minus')];
    for (let i in pluses){
      pluses[i].addEventListener('click', e => {
        let id = pluses[i].parentNode.parentNode.parentNode.parentNode.dataset.productId;
        this.updateProductCount(id, 1);
      })
      minuses[i].addEventListener('click', e => {
        let id = minuses[i].parentNode.parentNode.parentNode.parentNode.dataset.productId;
        this.updateProductCount(id, -1);
      }) 
    }
    let form = modal.modal.querySelector('form');
    form.addEventListener('submit',e => this.onSubmit(e));
    return modal
  }

  onProductUpdate(cartItem) {
    let BODY = document.querySelector('body');
    if (BODY.classList.contains('is-modal-open')){
      let productId = cartItem.product.id; 
      let modalBody = this.modal.modal;
  
      if (this.getTotalCount()===0) this.modal.close();
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
  
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);


      productCount.innerHTML = cartItem.count;
      if (cartItem.count == 0){
        let product = modalBody.querySelector(`[data-product-id="${productId}"]`);
        product.remove();
      }
      productPrice.innerHTML = `€${(cartItem.count*cartItem.product.price).toFixed(2)}`;
  
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    let submBtn = document.querySelector('[type="submit"]');
    submBtn.classList.add('is-loading');
    let form = this.modal.modal.querySelector('form');

    fetch('https://httpbin.org/post',{
      method: 'POST',
      body: new FormData(form),
    })

    for (let i of this.cartItems){
      this.updateProductCount(i.product.id, -i.count);
    }
    this.modal.open();
    this.modal.setTitle('Success!');
    let modalBody = this.modal.modal.querySelector('.modal__body');
    modalBody.innerHTML = `
    <div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => {
      this.modal = this.renderModal();
      this.modal.open();
    };
  }
}

