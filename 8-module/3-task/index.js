export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;
    let sameProd = this.cartItems.filter(item => item.product.id === product.id);
    if (sameProd.length === 0){
      this.cartItems = [...this.cartItems,{product, count : 1}];
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

