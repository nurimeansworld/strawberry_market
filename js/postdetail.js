const postComment = document.querySelector('.post-comment');
const commentInp = document.querySelector('.comment-input');
const commentBtn = document.querySelector('.comment-btn');
const commentForm = document.querySelector('.comment-form');

const postId = new URLSearchParams(location.search).get('postId'); 
console.log('postId',postId);

// http://127.0.0.1:5503/pages/postdetail.html?postId=62040c2e9d09d36b213aa275


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
    console.log(json);

    // render
    let img = '';
    const profileImg = json.post.author.image;
    const userName = json.post.author.username;
    const accountName = json.post.author.accountname;
    const content = json.post.content;
    const contentImg = json.post.image;
    if(json.post.image !== '') {
      img = `<img class="user-photo" src="${contentImg}" alt="회원 사진">`;
    } else {
      img = '';
    }
    const heartCount = json.post.heartCount;
    const commentCount = json.post.commentCount;
    const createdAt = json.post.createdAt.slice(0,11).replace('-','년 ').replace('-', '월 ').replace('T', '일');
    
    /* 
      CHECK:: 모듈에서 복붙해옴 → li로 변경되서 수정 필요
      사진 여러장일 때 피드에서 어떻게 렌더하는지 참고
    */
    document.querySelector('.post-detail').innerHTML = `
      <li class="home-post">
        <div class="home-post-user">
          <img class="user-profile" src="${profileImg}" alt="회원 프로필">
          <h4 class="user-name">${userName}</h4>
          <p class="user-id">@ ${accountName}</p>
          <button type="button" class="btn-menu">
            <strong class="sr-only">메뉴</strong>
          </button>
        </div>
        <div class="home-post-content">
          <p class="user-cont">${content}</p>
          ${img}
        </div>
        <div class="home-post-comment">
          <div class="item-count">
            <button type="button" class="btn btn-heart">
            </button>
            <p class="heart-count">${heartCount}</p>
          </div>
          <div class="item-count">
            <button type="button" class="btn btn-message">
              <img class="message-button" src="../assets/icon/icon-message-circle.svg" alt="메세지 버튼">
            </button>
            <p class="message-count">${commentCount}</p>
          </div>
        </div>
        <p class="date">${createdAt}</p>
      </li>
    `
  } catch(err) { 
    console.log(err); 
  }
};

renderPost();


// 댓글 작성 시간 계산
const getElapsedTime = (time) => {
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
    console.log(json);

    // render
    json.comments.map(element => {
      const profileImg = element.author.image;
      const userName = element.author.username;
      const accountName = element.author.accountname;
      const content = element.content;
      const createdAt = element.createdAt;

      const commentList = document.querySelector('.comment-list');
      const li = document.createElement('li');
      const div = document.createElement('div');
      const a = document.createElement('a');
      const img = document.createElement('img');
      const a2 = document.createElement('a');
      const strong = document.createElement('strong');
      const span = document.createElement('span');
      const p = document.createElement('p');
      const button = document.createElement('button');
      const img2 = document.createElement('img');

      li.className = 'list-item';
      div.className = 'item-wrap';
      img.className = 'user-profile';
      a2.className = 'user-name';
      span.className = 'comment-date';
      button.className = 'btn-menu';
      // button.className = 'other-user-comment';
      p.className = 'content';

      a.setAttribute('href', `./profile.html?id=${accountName}`)
      img.setAttribute('src', profileImg);
      img.setAttribute('alt', '회원 프로필');
      a2.setAttribute('href', `./profile.html?id=${accountName}`)
      strong.textContent = userName;
      span.textContent = getElapsedTime(createdAt);
      img2.setAttribute('src', '../assets/icon/icon-more-vertical.png');
      img2.setAttribute('alt', '메뉴 열기')
      p.textContent = content;
      
      commentList.appendChild(li);
      li.appendChild(div);
      div.appendChild(a);
      a.appendChild(img);
      div.appendChild(a2);
      a2.appendChild(strong)
      div.appendChild(span);
      li.appendChild(p);
      li.appendChild(button);
      button.appendChild(img2);

      // 수정 전 
      // document.querySelector('.comment-list').innerHTML += `
      //   <li class="list-item">
      //     <div class="item-wrap">
      //       <img class="user-profile" src="${profileImg}" alt="회원 프로필">
      //       <strong class="user-name">${userName}</strong>
      //       <button type="button" class="btn-menu"><img src="../assets/icon/icon-more-vertical.png" alt="메뉴 열기"></button>
      //     </div>
      //     <p class="content">${content}</p>
      //   </li>
      // `
    })
  } catch(err) {
    console.log(err);
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
    console.log(json.profile.image);
    profileImg.setAttribute('src', json.profile.image);
  } catch(err) {
    console.log(err);
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
async function writeComment(e) {
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
    document.querySelector('.comment-list').innerHTML = '';
    // render
    renderPost();
    renderCommentList();
    commentInp.value = '';
    checkValue()
    console.log(json);
  } catch(err) {
    console.log(err);
  }
};

commentBtn.addEventListener('click', writeComment);
commentForm.addEventListener('submit', writeComment);


/* 
CHECK:: 상세 페이지-작성된 댓글에 모달 붙이기
1. 작성된 댓글을 불러와서 화면에 뿌려주는 async 함수에서 모달을 붙여야 한다 -> 모달 관련 JS을 async 함수 내부에 넣음
2. 상단 nav에 있는 버튼을 누르면 나오는 모달과 댓글에 있는 버튼을 누르면 나오는 모달의 클래스명이 동일해서 이벤트가 제대로 동작하지 않는다. 
*/
const open6 = () => {
  document.querySelector(".modal6").classList.remove("hidden");
}
const close6 = () => {
  document.querySelector(".modal6").classList.add("hidden");   
}  

button.addEventListener("click", open6);
document.querySelector(".hidden-menu").addEventListener("click", close6); 
console.log(document.querySelector(".hidden-menu"));

const btn6 = document.querySelector('.call-post');
const pop6 = document.querySelector('.dimm');
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
// 모달 끝 



/* 게시물 불러오기 수정 전 
<article class="home-post">
  <div class="home-post-user">
    <img class="user-profile" src="${profileImg}" alt="회원 프로필">
    <h4 class="user-name">${userName}</h4>
    <p class="user-id">@ ${accountName}</p>
    <button type="button" class="btn-menu"><img src="../assets/icon/icon-more-vertical.png" alt="메뉴 열기"></button>
  </div>
  <div class="home-post-content">
    <p class="user-cont">${content}</p>
    ${img}
  </div>
  <div class="home-post-comment">
    <div class="item-count">
      <button type="button" class="btn btn-heart">
        <img class="heart-button" src="../assets/icon/heart.png" alt="하트버튼">
      </button>
      <p class="heart-count">${heartCount}</p>
    </div>
    <div class="item-count">
      <button type="button" class="btn btn-message">
        <img class="message-button" src="../assets/icon/icon-message-circle.png" alt="메세지 버튼">
      </button>
      <p class="message-count">${commentCount}</p>
    </div>
  </div>
  <p class="date">${createdAt}</p>
</article>
*/