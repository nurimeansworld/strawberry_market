// [postdetail] 게시물 상세

const postId = new URLSearchParams(location.search).get('postId'); 

const postComment = document.querySelector('.post-comment');
const commentInp = document.querySelector('.comment-input');
const commentBtn = document.querySelector('.comment-btn');
const commentForm = document.querySelector('.comment-form');

//MEMO:: 여러 async function에서 써야하는 변수는 let으로 미리 선언
let accountName;
let commentId;


// 게시글 불러오기 
async function renderPost() {
  const url = 'http://146.56.183.55:5050';
  const token = localStorage.getItem('Token');

  try {
    const res = await fetch(`${url}/post/${postId}`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`,
	      'Content-type' : 'application/json',
      }
    });
    const json = await res.json();

    // render
    const profileImg = json.post.author.image;
    const userName = json.post.author.username;
    const accountName = json.post.author.accountname;
    const content = json.post.content;
    const jsonImg = json.post.image.split(',');
    // console.log(jsonImg);
    // console.log(jsonImg.length);
    // console.log(jsonImg[0] === '');

    const heartCount = json.post.heartCount;
    const commentCount = json.post.commentCount;
    const createdAt = json.post.createdAt.slice(0,11).replace('-','년 ').replace('-', '월 ').replace('T', '일'); 

    const li = document.querySelector('.home-post');
    // render 전에 초기화
    li.textContent = '';

    const homePostUser = document.createElement('div');
    const userProfile = document.createElement('img');
    const postUserName = document.createElement('h4');
    const userId = document.createElement('p');
    const btnMenu = document.createElement('button');
    const srOnly = document.createElement('strong');
    const homePostContent = document.createElement('div');
    const userCont = document.createElement('p');
    const postContentImgs = document.createElement('div');
    const imgsContainer = document.createElement('ul');
    const homePostComment = document.createElement('div');
    const itemCountHeart = document.createElement('div');
    const btnHeart = document.createElement('button');
    const postHeartCount = document.createElement('p');
    const itemCountMessage = document.createElement('div');
    const btnMessage = document.createElement('button');
    const messageButton = document.createElement('img');
    const messageCount = document.createElement('p');
    const date = document.createElement('p');

    homePostUser.className = 'home-post-user';
    userProfile.className = 'user-profile';
    postUserName.className = 'user-name';
    userId.className = 'user-id';
    btnMenu.className = 'btn-menu';
    srOnly.className = 'sr-only';
    homePostContent.className = 'home-post-content';
    userCont.className = 'user-cont';
    postContentImgs.className = 'post-content-imgs';
    imgsContainer.className = 'imgs-container';
    homePostComment.className = 'home-post-comment';
    itemCountHeart.className = 'item-count item-count-heart';
    btnHeart.className = 'btn btn-heart';
    postHeartCount.className = 'heart-count';
    itemCountMessage.className = 'item-count item-count-message';
    btnMessage.className = 'btn btn-message';
    messageButton.className = 'message-button';
    messageCount.className = 'message-count';
    date.className = 'date';

    userProfile.setAttribute('src', profileImg);
    userProfile.setAttribute('alt', '회원 프로필');
    postUserName.textContent = userName;
    userId.textContent = accountName;
    btnMenu.setAttribute('type', 'button')
    userCont.textContent = content;
    btnHeart.setAttribute('type', 'button')
    btnMessage.setAttribute('type', 'button')
    messageButton.setAttribute('src', '../assets/icon/icon-message-circle.svg');
    messageButton.setAttribute('alt', '메세지 버튼');
    postHeartCount.textContent = heartCount;
    messageCount.textContent = commentCount;
    date.textContent = createdAt;

    btnMenu.addEventListener('click', (e) => {
      open6();
    })
    
    btnHeart.addEventListener('click', (e) => {
      e.target.classList.toggle('on');
    })
    
    li.appendChild(homePostUser);
    homePostUser.appendChild(userProfile);
    homePostUser.appendChild(postUserName);
    homePostUser.appendChild(userId);
    homePostUser.appendChild(btnMenu);
    btnMenu.appendChild(srOnly);
    li.appendChild(homePostContent);
    homePostContent.appendChild(userCont);    
    if(jsonImg.length >= 1 && jsonImg[0] !== '') { 
      jsonImg.map((src) => {
        const imgItem = document.createElement('li');
        const postImg = document.createElement('img');
        imgItem.className = 'img-item';
        postImg.className = 'post-img'
        postImg.setAttribute('src', src);
        imgItem.appendChild(postImg);
        imgsContainer.appendChild(imgItem);
      });
      li.appendChild(postContentImgs);
      postContentImgs.appendChild(imgsContainer);
    }
    li.appendChild(homePostComment);
    homePostComment.appendChild(itemCountHeart);
    itemCountHeart.appendChild(btnHeart);
    itemCountHeart.appendChild(postHeartCount);
    homePostComment.appendChild(itemCountMessage);
    itemCountMessage.appendChild(btnMessage);
    btnMessage.appendChild(messageButton);
    itemCountMessage.appendChild(messageCount);
    li.appendChild(date);
  } catch(err) { 
    console.error(err); 
  }
};
renderPost();


// 댓글 작성 시간 계산
const getTimeGap = (time) => {
  const ms = Date.parse(time);
  const now = Date.now();
  const gap = (now - ms) / 1000;
  if (gap < 60) return `${parseInt(gap)}초 전`;
  else if (gap < 3600) return `${parseInt(gap / 60)}분 전`;
  else if (gap < 86400) return `${parseInt(gap / 3600)}시간 전`;
  else if (gap < 2592000) return `${parseInt(gap / 86400)}일 전`;
  else return `${parseInt(gap / 2592000)}달 전`;
};


// 댓글 리스트 불러오기
async function renderCommentList() {
  const url = 'http://146.56.183.55:5050';
  const token = localStorage.getItem('Token');
  
  try {
    const res = await fetch(`${url}/post/${postId}/comments`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`,
	      'Content-type' : 'application/json',
      }
    });
    const json = await res.json();

    // render
    json.comments.map(element => {
      const profileImg = element.author.image;
      const userName = element.author.username;
      accountName = element.author.accountname;
      const content = element.content;
      const createdAt = element.createdAt;
      commentId = element.id;

      const commentList = document.querySelector('.comment-list');
      const listItem = document.createElement('li');
      const itemWrap = document.createElement('div');
      const a = document.createElement('a');
      const userProfile = document.createElement('img');
      const commentUserName = document.createElement('a');
      const strong = document.createElement('strong');
      const commentDate = document.createElement('span');
      const commentContent = document.createElement('p');
      const btnMenu = document.createElement('button');
      const img2 = document.createElement('img');

      listItem.className = 'list-item';
      itemWrap.className = 'item-wrap';
      userProfile.className = 'user-profile';
      commentUserName.className = 'user-name';
      commentDate.className = 'comment-date';
      commentContent.className = 'content';
      btnMenu.className = 'btn-menu';

      a.setAttribute('href', `./profile.html?id=${accountName}`)
      userProfile.setAttribute('src', profileImg);
      userProfile.setAttribute('alt', '회원 프로필');
      commentUserName.setAttribute('href', `./profile.html?id=${accountName}`)
      strong.textContent = userName;
      commentDate.textContent = getTimeGap(createdAt);
      img2.setAttribute('src', '../assets/icon/icon-more-vertical.png');
      img2.setAttribute('alt', '메뉴 열기')
      commentContent.textContent = content;

      btnMenu.addEventListener('click', showModal);

      // btnMenu.addEventListener('click', (e) => {
      //   open6();
      // })
      
      commentList.appendChild(listItem);
      listItem.appendChild(itemWrap);
      itemWrap.appendChild(a);
      a.appendChild(userProfile);
      itemWrap.appendChild(commentUserName);
      commentUserName.appendChild(strong)
      itemWrap.appendChild(commentDate);
      listItem.appendChild(commentContent);
      listItem.appendChild(btnMenu);
      btnMenu.appendChild(img2);
    })
  } catch(err) {
    console.error(err);
  }
};
renderCommentList();




// 댓글 작성자의 프로필 이미지 동적으로 받아오기
async function renderProfile() {
  const url = 'http://146.56.183.55:5050';
  const token = localStorage.getItem('Token');
  const accountName = localStorage.getItem('accountname');
  const profileImg = document.querySelector('.profile-img');
  
  try {
    const res = await fetch(`${url}/profile/${accountName}`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    profileImg.setAttribute('src', json.profile.image);
  } catch(err) {
    console.error(err);
  }
}
renderProfile();


// 댓글 작성 
// 게시 버튼 활성화
function checkValue() {
  if(commentInp.value !== '') {
    commentBtn.disabled = false;
    commentBtn.style.color = '#E26E7E';
  } else {
    commentBtn.disabled = true;
    commentBtn.style.color = '#C4C4C4';
  }
};
commentInp.addEventListener('input', checkValue);


// 작성된 댓글을 서버에 post
async function sendComment(e) {
  e.preventDefault();
  const url = 'http://146.56.183.55:5050';
  const token = localStorage.getItem('Token');
  
  try {
    const res = await fetch(`${url}/post/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'comment': {
          'content': commentInp.value 
        }
      })
    });
    const json = await res.json();

    // render 전에 초기화
    document.querySelector('.comment-list').textContent = '';

    // render
    renderPost();
    renderCommentList();
    commentInp.value = '';
    checkValue()
  } catch(err) {
    console.error(err);
  }
};

commentBtn.addEventListener('click', sendComment);
commentForm.addEventListener('submit', sendComment);

// 댓글에 모달 붙이기 
// 내가 작성한 댓글이면 -> 삭제 / 남이 쓴 거면 -> 신고
// 구별법: 로컬스토리지에 있는 accountName과 댓글의 accountName 같은지 확인 


async function callPost(){  
  const url = 'http://146.56.183.55:5050';
  const token = localStorage.getItem('Token');

  try {
    const res = await fetch(`${url}/post/${postId}/comments/${commentId}/report`, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-type' : 'application/json'
      }
    });
    const json = await res.json();
    console.log(json);
  } catch(err) {
    console.log(err);
  }
};

function showModal() {
  if(accountName === localStorage.getItem('accountname')) {
    console.log('내가쓴댓글이야 - 삭제');
  } else {
    console.log('내가쓴거아니야 - 신고');
    open6();
    call6.addEventListener('click', callPost);
  }
}

// 신고하기 모달(희정님 담당) 
const open6 = () => {
  document.querySelector(".modal6").classList.remove("hidden");
}
const close6 = () => {
  document.querySelector(".modal6").classList.add("hidden");   
}  

document.querySelector(".report-menu").addEventListener("click", close6); 

const btn6 = document.querySelector('.call-post');
const pop6 = document.querySelector('.report-dim');
const out6 = document.querySelector('.cancle-btn');
const call6 = document.querySelector('.call-btn');

btn6.addEventListener('click',viewOption);
out6.addEventListener('click',cancleOption);
call6.addEventListener('click',cancleOption);

function viewOption() {
  pop6.style.display = 'block';
}
function cancleOption() {
  pop6.style.display = 'none';
}


// call6.addEventListener('click', callPost);