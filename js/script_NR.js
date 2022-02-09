// title 수정
function changeTitle() {
  htmlTitle = document.title;
  document.title = checkAccountName() + ' | ' + htmlTitle;
}
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
  const prodId = (location.search.split('productId=')[1]) ? location.search.split('productId=')[1] : null;
  return prodId;
}

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
