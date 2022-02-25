// 뒤로가기
function goBack(){
  // window.history;
  window.history.back();
}
const btnBack = document.querySelector('.btn-back');
btnBack.addEventListener('click', goBack);

// title 수정
function changeTitle() {
  htmlTitle = document.title;
  document.title = checkAccountName() + ' | ' + htmlTitle;
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

// 모달 open, close
const open = () => {
  document.querySelector(".modal").classList.remove("hidden");
}
const close = () => {
  document.querySelector(".modal").classList.add("hidden");  
}  

document.querySelector(".btn-menu").addEventListener("click", open);
document.querySelector(".modal.hidden .hidden-menu").addEventListener("click", close); 

const btn = document.querySelector('.log-out-btn');
const pop = document.querySelector('.dimm');
const out = document.querySelector('.cancle-btn');
const logout = document.querySelector('.logout-btn');

btn.addEventListener('click',viewOption);
out.addEventListener('click',cancleOption);
logout.addEventListener('click',checkLogout);

function viewOption() {
  pop.style.display = 'block';
}
function cancleOption() {
  pop.style.display = 'none';
}
function checkLogout(){
  localStorage.removeItem("Token");
  localStorage.removeItem("accountname");
  location.href="./login.html";
}


// followings, followers - 팔로우, 언팔로우 기능 함수
async function changeFollowList(){
  const btn = this;
  const url = (location.protocol === "https:") ? 'https://api.mandarin.cf' : 'http://146.56.183.55:5050';
  const accountName = this.getAttribute('data-id');
  const token = localStorage.getItem('Token');
  const init = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
  }
  if (btn.classList.contains('cancel-button')) {
    try {
      init['method'] = 'DELETE';
      const resUnfollow = await fetch(`${url}/profile/${accountName}/unfollow`, init);
      const resUnfollowJson = await resUnfollow.json();
    }catch(err){
      console.error('err', err);
    }

    btn.classList.remove('cancel-button');
    btn.classList.add('small-follow-button');
    btn.textContent = '팔로우';
  } else {
    try {
      const resFollow = await fetch(`${url}/profile/${accountName}/follow`, init);
      const resFollowJson = await resFollow.json();
    }catch(err){
      console.error('err', err);
    }

    btn.classList.remove('small-follow-button');
    btn.classList.add('cancel-button');
    btn.textContent = '취소';
  }
}