// [postdetail] 게시물 상세

const postId = new URLSearchParams(location.search).get('postId'); 

const postComment = document.querySelector('.post-comment');
const commentInp = document.querySelector('.comment-input');
const commentBtn = document.querySelector('.comment-btn');
const commentForm = document.querySelector('.comment-form');


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
    // let postImg = '';
    const postImg = document.createElement('img');
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

    const div = document.createElement('div');
    const img = document.createElement('img');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    const button = document.createElement('button');
    const strong = document.createElement('strong');
    const div2 = document.createElement('div');
    const p2 = document.createElement('p');
    const div3 = document.createElement('div');
    const ul = document.createElement('ul');
    const li2 = document.createElement('li');
    const div4 = document.createElement('div');
    const div5 = document.createElement('div');
    const button2 = document.createElement('button');
    const p3 = document.createElement('p');
    const div6 = document.createElement('div');
    const button3 = document.createElement('button');
    const img2 = document.createElement('img');
    const p4 = document.createElement('p');
    const p5 = document.createElement('p');

    div.className = 'home-post-user';
    img.className = 'user-profile';
    h4.className = 'user-name';
    p.className = 'user-id';
    button.className = 'btn-menu';
    strong.className = 'sr-only';
    div2.className = 'home-post-content';
    p2.className = 'user-cont';
    div3.className = 'post-content-imgs';
    ul.className = 'imgs-container';
    li2.className = 'img-item';
    postImg.className = 'post-img'
    div4.className = 'home-post-comment';
    div5.className = 'item-count item-count-heart';
    button2.className = 'btn btn-heart';
    p3.className = 'heart-count';
    div6.className = 'item-count item-count-message';
    button3.className = 'btn btn-message ';
    img2.className = 'message-button';
    p4.className = 'message-count';
    p5.className = 'date';

    img.setAttribute('src', profileImg);
    img.setAttribute('alt', '회원 프로필');
    h4.textContent = userName;
    p.textContent = accountName;
    button.setAttribute('type', 'button')
    p2.textContent = content;
    button2.setAttribute('type', 'button')
    button3.setAttribute('type', 'button')
    img2.setAttribute('src', '../assets/icon/icon-message-circle.svg');
    img2.setAttribute('alt', '메세지 버튼');
    p3.textContent = heartCount;
    p4.textContent = commentCount;
    p5.textContent = createdAt;

    button.addEventListener('click', (e) => {
      open6();
    })
    
    button2.addEventListener('click', (e) => {
      e.target.classList.toggle('on');
    })
    
    li.appendChild(div);
    div.appendChild(img);
    div.appendChild(h4);
    div.appendChild(p);
    div.appendChild(button);
    button.appendChild(strong);
    li.appendChild(div2);
    div2.appendChild(p2);    
    if(jsonImg.length >= 1 && jsonImg[0] !== '') { 
      jsonImg.map((src) => {
        postImg.setAttribute('src', src);
      });
      li.appendChild(div3);
      div3.appendChild(ul);
      ul.appendChild(li2);
      li2.appendChild(postImg);
    }
    li.appendChild(div4);
    div4.appendChild(div5);
    div5.appendChild(button2);
    div5.appendChild(p3);
    div4.appendChild(div6);
    div6.appendChild(button3);
    button3.appendChild(img2);
    div6.appendChild(p4);
    li.appendChild(p5);
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
      p.className = 'content';

      a.setAttribute('href', `./profile.html?id=${accountName}`)
      img.setAttribute('src', profileImg);
      img.setAttribute('alt', '회원 프로필');
      a2.setAttribute('href', `./profile.html?id=${accountName}`)
      strong.textContent = userName;
      span.textContent = getTimeGap(createdAt);
      img2.setAttribute('src', '../assets/icon/icon-more-vertical.png');
      img2.setAttribute('alt', '메뉴 열기')
      p.textContent = content;

      button.addEventListener('click', (e) => {
        open6();
      })
      
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
