import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.cur_page = 0;
    this.elem = this.createCarousel();
    this.addScroll();
    this.addEventGeneration();
  }

  createCarousel = () => {
    let template = `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
        <div class="carousel__inner">
        </div>
    </div>

    `
    let carousel = createElement(template);
    let carouselInner = carousel.querySelector(".carousel__inner");

    this.createSlides().forEach(slide => carouselInner.appendChild(slide));
    return carousel;
  }

  createSlides = () => {
    let result = [];
    for (let slide of this.slides){
      let template = `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `
      result.push(createElement(template));
    }
    return result;
  }


  addScroll = () => {
    let carousel__inner = this.elem.querySelector('.carousel__inner')
    let btn_r = this.elem.querySelector('.carousel__arrow_right');
    let btn_l = this.elem.querySelector('.carousel__arrow_left');
    let setVisible = ()=>{
      if (this.cur_page<=0){
        btn_l.style.display = 'none';
        btn_r.style.display = '';
      }
      else if (this.cur_page>0 && this.cur_page<this.slides.length-1){
        btn_l.style.display = '';
        btn_r.style.display = '';
      }
      else {
        btn_l.style.display = '';
        btn_r.style.display = 'none';
      }
    }
    setVisible();

    btn_r.addEventListener('click', ()=>{
      this.cur_page+=1;
      setVisible()
      let window_width = carousel__inner.offsetWidth;
      carousel__inner.style.transform = `translateX(-${window_width*this.cur_page}px)`;
    })
    btn_l.addEventListener('click', ()=>{
      this.cur_page-=1;
      setVisible()
      let window_width = carousel__inner.offsetWidth;
      carousel__inner.style.transform = `translateX(-${window_width*this.cur_page}px)`;
  })
  }

  addEventGeneration = () => {
    let carousel_btns = this.elem.querySelectorAll('.carousel__button');
    for (let btn of carousel_btns){
      btn.addEventListener('click', () => {
        let event = new CustomEvent("product-add", {
          detail: btn.parentElement.parentElement.dataset.id,
          bubbles: true 
        })
        this.elem.dispatchEvent(event)
      })
    }
  } 
}
