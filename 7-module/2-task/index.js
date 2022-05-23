import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this.createModal();
    this.setRemoveEvent();
  }

  createModal(){
    let template = `
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
          </h3>
        </div>
        <div class="modal__body">
        </div>
      </div>
    </div>
    `;
    return createElement(template);
  }

  open(){
    let BODY = document.querySelector('body');
    BODY.appendChild(this.modal);
    BODY.classList.add('is-modal-open');
  }

  setTitle(title){
    let modalTitle = this.modal.querySelector('.modal__title');
    modalTitle.innerHTML = title;
  }

  setBody(template){
    let modalBody = this.modal.querySelector('.modal__body');
    modalBody.appendChild(template);
  }

  close = () => {
    let BODY = document.querySelector('body');
    BODY.classList.remove('is-modal-open');
    this.modal.remove();
  }

  setRemoveEvent(){
    let removeBtn = this.modal.querySelector('.modal__close');
    removeBtn.addEventListener('click', this.close, {once : true});

    let removeOnEscape = (event) => {
      if (event.code === 'Escape'){
        this.close();
      } 
    }
    document.addEventListener('keydown', removeOnEscape, {once : true})
  }
}
