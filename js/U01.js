// [U01] 댓글 작성 페이지
// 피드 게시글의 말풍선 아이콘을 클릭하면 U01.html로 이동하고 페이지 로드 시에 클릭한 게시글, 댓글 리스트, 댓글 작성이 보여야 함 
// 로드 시에 게시글 정보, 댓글 리스트를 api에서 불러와서 화면에 바로 뿌려줘야 함.
// MEMO: test url http://127.0.0.1:5503/html/U01.html?postId=61f549049d09d36b2135c219

const comment = document.querySelector('.comment');
const commentInp = document.querySelector('.comment-input');
const commentBtn = document.querySelector('.comment-btn');
const commentForm = document.querySelector('.comment-form');

// postId받아오기 
// CHECK: 쿼리 URLSearchParams
const postId = new URLSearchParams(location.search).get('postId'); 

// 게시글 불러오기 
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


// 작성된 댓글을 서버에 post, 화면에 render
/* 
  CHECK: 아래와 같이 댓글을 post 하면서 화면에 render하면 여러 사람들이 동시에 댓글을 작성할 경우, 내가 등록한 댓글만 화면에 업데이트된다. 
  댓글이 게시되면 댓글 리스트가 재렌더링 되도록 구성하는 방법이 있다.
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
    document.querySelector('.comment').innerHTML += `
        <div>${json.comment.content}</div>
        <div>${json.comment.author.username}</div>
      `
    console.log(json);
  } catch(err) {
    console.log(err);
  }
};

commentBtn.addEventListener('click', writeComment);