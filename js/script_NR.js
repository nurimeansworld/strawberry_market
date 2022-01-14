// 뒤로가기
function goBack(){
  window.history.back();
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
  const viewListSec = document.getElementById('viewList');
  const viewAlbumSec = document.getElementById('viewAlbum');
  
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
const viewListBtn = document.getElementById('viewList-btn');
const viewAlbumBtn = document.getElementById('viewAlbum-btn');
viewListBtn.addEventListener('click', toggleOn);
viewAlbumBtn.addEventListener('click', toggleOn);


// // P03 팔로워
// // follow 상태 변경
// const followListBtn = document.querySelector('.follow-item');
// console.log(followListBtn);
// console.log('yesy');
// followListBtn.addEventListener('click', changeFollowList);

// alert('test');