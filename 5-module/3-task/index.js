function initCarousel() {
  let carousel = document.querySelector('.carousel__inner');
  let btn_r = document.querySelector('.carousel__arrow_right');
  let btn_l = document.querySelector('.carousel__arrow_left');
  let cur_page = 0;
  
  const setVisible = (page)=>{
    if (page<=0){
      btn_l.style.display = 'none';
      btn_r.style.display = '';
    }
    else if (page>0 && page<3){
      btn_l.style.display = '';
      btn_r.style.display = '';
    }
    else {
      btn_l.style.display = '';
      btn_r.style.display = 'none';
    }
  }
  setVisible(cur_page);

  btn_r.addEventListener('click', ()=>{
    cur_page+=1;
    setVisible(cur_page)
    let window_width = carousel.offsetWidth;
    carousel.style.transform = `translateX(-${window_width*cur_page}px)`;
  })
  btn_l.addEventListener('click', ()=>{
    cur_page-=1;
    setVisible(cur_page)
    let window_width = carousel.offsetWidth;
    carousel.style.transform = `translateX(-${window_width*cur_page}px)`;
  })
}
