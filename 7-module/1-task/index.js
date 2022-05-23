import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.createRibbon();
    this.addScroll();
    this.setButtonsVisibility();
    this.chooseCategory();
  }

  createRibbon(){
    let template=` 
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
        <nav class="ribbon__inner">
          ${this.categories.map(category => 
            `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`
          ).join('\n')}
        </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    <div>
    `;
    return createElement(template);
  }

  addScroll(){
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let btnRight = this.elem.querySelector('.ribbon__arrow_right');
    let btnLeft = this.elem.querySelector('.ribbon__arrow_left');

    btnLeft.addEventListener('click', (e) => {
      ribbonInner.scrollBy(-350, 0); 
    })

    btnRight.addEventListener('click', (e) => {
      ribbonInner.scrollBy(350, 0); 
    })
  }

  setButtonsVisibility(){
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let btnRight = this.elem.querySelector('.ribbon__arrow_right');
    let btnLeft = this.elem.querySelector('.ribbon__arrow_left');

    let getScrolls = ()=>{
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
  
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      return {scrollLeft, scrollRight}
    }

    ribbonInner.addEventListener('scroll', e => {
      let {scrollRight} = getScrolls();
      scrollRight>0 ? btnRight.classList.add('ribbon__arrow_visible') : btnRight.classList.remove('ribbon__arrow_visible');
    })

    ribbonInner.addEventListener('scroll', e => {
      let {scrollLeft} = getScrolls();
      scrollLeft>0 ? btnLeft.classList.add('ribbon__arrow_visible') : btnLeft.classList.remove('ribbon__arrow_visible');
    })   
  }

  chooseCategory(){
    let categories = [...this.elem.querySelectorAll('.ribbon__item')];
    categories.forEach(cat => {
      cat.addEventListener('click', e =>{

        e.preventDefault();
        let prevChosen = this.elem.querySelector('.ribbon__item_active');
        try{
          prevChosen.classList.remove('ribbon__item_active');
        }catch{} // ничего не было выбрано ранее
        
        cat.classList.add('ribbon__item_active');

        let customEvent = new CustomEvent('ribbon-select', { 
          detail: cat.dataset.id, 
          bubbles: true 
        })

      this.elem.dispatchEvent(customEvent);
      })
    })
  }
}
