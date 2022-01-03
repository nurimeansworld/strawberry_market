// 뒤로가기
function goBack(){
  window.history.back();
}
// modal menu 열기
function openMenuModal(){
  let modal = document.querySelector('.modal');
  // CHECK:: modal display class 임의로 on으로 설정
  modal.classList.toggle('on');
}

let btnBack = document.querySelector('.btn-back');
let btnMenu = document.querySelector('.btn-menu');

btnBack.addEventListener('click', goBack);
btnMenu.addEventListener('click', openMenuModal);