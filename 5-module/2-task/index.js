function toggleText() {
  let btn = document.querySelector('.toggle-text-button');
  let div = document.querySelector('#text');
  btn.addEventListener('click', () => {
    if(!div.getAttribute('hidden')) div.setAttribute('hidden','true');
    else div.removeAttribute('hidden');
  })
}
