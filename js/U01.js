// [U01] 댓글 작성 페이지
// MEMO: test url http://127.0.0.1:5503/html/U01.html?postId=61f549049d09d36b2135c219

/* 
  페이지 구조
  1. 클릭한 게시물
  2. 댓글 리스트
  3. 댓글 작성하기 

  구현할 기능 
  1. 서버에서 게시물 불러오기 
  2. 서버에서 댓글 불러오기 
  3. 작성된 댓글 서버에 post하기 
  4. 댓글 다시 불러오기 (업데이트)
*/

const postComment = document.querySelector('.post-comment');
const commentInp = document.querySelector('.comment-input');
const commentBtn = document.querySelector('.comment-btn');
const commentForm = document.querySelector('.comment-form');

// postId받아오기 
/* 
  CHECK:: 쿼리 URLSearchParams
  말풍선 버튼을 클릭하면 url 쿼리문으로 이동 
  U01.html?postId=get('postId'); 
*/
const postId = new URLSearchParams(location.search).get('postId'); 


// 게시글 불러오기 
// CHECK:: 게시물 날짜 undefined로 뜬다
async function renderPost() {
  const url = 'http://146.56.183.55:5050';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjU0ODg4OWQwOWQzNmIyMTM1YzFiMSIsImV4cCI6MTY0ODY1MTUwMCwiaWF0IjoxNjQzNDY3NTAwfQ.QieMk5pJr-_DbG4yrlla9x3BkgYqMk1-qvI-lNT1tqQ';

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
    const profileImg = json.post.author.image;
    const accountName = json.post.author.accountname;
    const userName = json.post.author.username;
    const content = json.post.content;
    const img = json.post.image;
    const createAt = json.post.createAt;
    document.querySelector('.post-detail').innerHTML = `
      <article class="home-post">
        <div class="home-post-user">
          <img class="user-profile" src="${profileImg}" alt="회원 프로필">
          <h4 class="user-name">${userName}</h4>
          <p class="user-id">@ ${accountName}</p>
          <button type="button" class="btn-menu"><img src="../assets/icon/icon-more-vertical.png" alt="메뉴 열기"></button>
        </div>
        <div class="home-post-content">
          <p class="user-cont">${content}</p>
          <img class="user-photo" src="${img}" alt="회원 사진">
        </div>
        <div class="home-post-comment">
          <div class="item-count">
            <button type="button" class="btn btn-heart">
              <img class="heart-button" src="../assets/icon/heart.png" alt="하트버튼">
            </button>
            <p class="heart-count">58</p>
          </div>
          <div class="item-count">
            <button type="button" class="btn btn-message">
              <img class="message-button" src="../assets/icon/icon-message-circle.png" alt="메세지 버튼">
            </button>
            <p class="message-count">12</p>
          </div>
        </div>
        <p class="date">${createAt}</p>
      </article>
    `

  } catch(err) { 
    console.log(err); // MEMO: err 내용 그대로 뜬다
  }
};

renderPost();


// 댓글 리스트 불러오기
async function renderCommentList() {
  const url = 'http://146.56.183.55:5050';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjU0ODg4OWQwOWQzNmIyMTM1YzFiMSIsImV4cCI6MTY0ODY1MTUwMCwiaWF0IjoxNjQzNDY3NTAwfQ.QieMk5pJr-_DbG4yrlla9x3BkgYqMk1-qvI-lNT1tqQ';
  
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
    // json.comments.map(element => {
    //   console.log(element.content);
    // })
    // document.querySelector('.comment-list').innerHTML += `
    //   <li>
    //     <img class="user-profile" src="${profileImg}" alt="회원 프로필">
    //     <h4 class="user-name">${userName}</h4>
    //     <textarea>${comments}</textarea>
    //   </li>
    // `
  } catch(err) {
    console.log(err);
  }
};

// 페이지 로드 시에 renderCommentList 호출
renderCommentList();


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
/* 
  CHECK:: 아래와 같이 댓글을 post 하면서 화면에 render하면 여러 사람들이 동시에 댓글을 작성할 경우, 내가 등록한 댓글만 화면에 업데이트된다. 
  댓글이 게시되면 댓글 리스트가 재렌더링 되도록 코드를 짜야 한다.
*/
async function writeComment(e) {
  e.preventDefault();
  const url = 'http://146.56.183.55:5050';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjU0ODg4OWQwOWQzNmIyMTM1YzFiMSIsImV4cCI6MTY0ODY1MTUwMCwiaWF0IjoxNjQzNDY3NTAwfQ.QieMk5pJr-_DbG4yrlla9x3BkgYqMk1-qvI-lNT1tqQ';
  
  try {
    const res = await fetch(`${url}/post/${postId}/comments`, { //:id 게시글 id 
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'comment': {
          'content': commentInp.value // MEMO: ${} 필요없음
        }
      })
    });
    const json = await res.json();

    // render
    document.querySelector('.comment-list').innerHTML += `
        <div>${json.comment.content}</div>
        <div>${json.comment.author.username}</div>
      `
    console.log(json);
  } catch(err) {
    console.log(err);
  }
};

commentBtn.addEventListener('click', writeComment);