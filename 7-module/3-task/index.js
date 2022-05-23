import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.createSlider();
    this.addPointer();
  }
  
  createSlider = () => {
    let slides = [];
    for (let i=0; i<this.steps; i++){
      slides.push(`<span ${ i === this.value ? 'class="slider__step-active"':''}></span>`)
    }
    let template =`
    <div class="slider">
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
        ${slides.join('\n')}
      </div>
    </div>
    `;
    return createElement(template);
  }

  addPointer = () => {
    this.elem.addEventListener('click',({layerX}) => {
      let width = getComputedStyle(this.elem)['width'].slice(0,-2);
      let value = ((this.steps-1) * layerX / width).toFixed(0);
      let sliderValue = this.elem.querySelector('.slider__value');
      
      if (value != +sliderValue.innerHTML){
        let event = new CustomEvent('slider-change', { 
          detail: +value,
          bubbles: true 
        })
        this.elem.dispatchEvent(event);
      }

      sliderValue.innerHTML = value;

      let oldActiveSlide = this.elem.querySelector('.slider__step-active');
      oldActiveSlide.classList.remove('slider__step-active');

      let newActiveSlide = [...this.elem.querySelectorAll('.slider__steps span')][value];
      newActiveSlide.classList.add('slider__step-active');

      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');

      let leftPercents = (value / (this.steps - 1) * 100)


      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
    })
  }
}
