const buttonSearch = document.querySelector('#searchButton')
const modal = document.querySelector('#modal')
const close = document.querySelector('#closeSearch')

buttonSearch.addEventListener('click', () => {
  modal.classList.remove('hide')
})  

close.addEventListener('click', () => {
  modal.classList.add('hide')
})