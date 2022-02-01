// 뒤로가기
function goBack(){
  window.history.back();
}

// id값 체크
function checkAccountName() {
  const accountName = (location.search.split('id=')[1]) ? location.search.split('id=')[1] : localStorage.getItem('accountname');
  return accountName;
}

// prodid값 체크
function checkProdId() {
  const prodId = (location.search.split('prod=')[1]) ? location.search.split('prod=')[1] : null;
  return prodId;
}

// modal menu 열기
function openMenuModal(){
  let modalBg = document.querySelector('.modal-background');
  let modal = document.querySelector('.up-modal');
  // CHECK:: modal display class 임의로 on으로 설정
  // modal.classList.toggle('on');
  modalBg.style.display = 'block';
  modal.style.display = 'block';
}
// // TODO:: 바깥 클릭 시 modal 닫음
// window.addEventListener('click', (e) => {
//   console.log(e.target);
//   if(e.target !== document.querySelector('.modal-product-list')){
//     let modalBg = document.querySelector('.modal-background');
//     let modal = document.querySelector('.up-modal');
//     // CHECK:: modal display class 임의로 on으로 설정
//     // modal.classList.toggle('on');
//     modalBg.style.display = 'none';
//     modal.style.display = 'none';
//   }
//   // e.target === document.querySelector('.modal-product-list') ? modal.classList.remove('show-modal') : false;
// })
const btnBack = document.querySelector('.btn-back');
const btnMenu = document.querySelector('.btn-menu');
btnBack.addEventListener('click', goBack);
btnMenu.addEventListener('click', openMenuModal);

// P01 사용자 프로필
// follow 상태 변경
function changeFollow(){
  if(this.className === 'medium-follow-btn'){
    this.classList.remove('medium-follow-btn');
    this.classList.add('medium-unfollow-btn');
    this.textContent = '언팔로우';
  }else{
    this.classList.remove('medium-unfollow-btn');
    this.classList.add('medium-follow-btn');
    this.textContent = '팔로우';
  }
}
const followBtn = document.querySelector('.medium-follow-btn');
followBtn.addEventListener('click', changeFollow);

// 리스트로 보기, 엘범으로 보기
function toggleOn(){
  // TODO:: 버튼이 2개일 경우만 아니라 다양한 경우에도 사용 가능하게 리팩토링하기
  const viewListSec = document.querySelector('#viewList');
  const viewAlbumSec = document.querySelector('#viewAlbum');
  
  this.classList.add('on');

  if(this.id === 'viewAlbum-btn'){
    this.previousElementSibling.classList.remove('on');
    viewListSec.classList.remove('on');
    viewAlbumSec.classList.add('on');
  }else{
    this.nextElementSibling.classList.remove('on');
    viewAlbumSec.classList.remove('on');
    viewListSec.classList.add('on');
  }
}

const viewListBtn = document.querySelector('#viewList-btn');
const viewAlbumBtn = document.querySelector('#viewAlbum-btn');
viewListBtn.addEventListener('click', toggleOn);
viewAlbumBtn.addEventListener('click', toggleOn);

// P02 마이 프로필


// P03 팔로워
