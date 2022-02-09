///A01 하트 버튼 클릭시 하트 칠하기
const btnHeart = document.querySelector('.btn-heart');

function fillHeartRed() {
  console.log('btnHeart.className', btnHeart.className);

  btnHeart.classList.toggle('on');

  // // class안에 on이 있냐?
  // if(btnHeart.classList.contains('on')){
  //   // YES::
  //   btnHeart.classList.remove('on');
  // }else{
  //   // NO::
  //   btnHeart.classList.add('on');
  // }

  // // class가 btn btn-heart on과 다른가?
  // if(btnHeart.className !== 'btn btn-heart on') {
  //   btnHeart.classList.add('on');
  // }else{
  //   btnHeart.classList.remove('on');
  }

btnHeart.addEventListener('click', fillHeartRed);

//5.2팔로우한 사람 피드 받아오기-------------------------------------------------------------
const homePostCont = document.querySelector(".container");
const postId = localStorage.getItem('postId');
let postUserId = "";

async function rederFollowPost() {
  const url = "http://146.56.183.55:5050";
  const token = localStorage.getItem('Token');

  try {
    const res = await fetch(`${url}/post/feed`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      }
    });
    const json = await res.json();
    console.log(json);

    // render
    for (let i = 0; i < json.posts.length; i++) {
      console.log(json.posts[i]);
    let img = '';
    const profileImg = json.posts[i].author.image;
    console.log(json.posts);
    const userName = json.posts[i].author.username;
    const accountName = json.posts[i].author.accountname;
    const content = json.posts[i].content;
    if (json.posts.image !== '') {
      img = `<img class="user-photo" src="${img}" alt="회원 사진">`;
    } else {
      img = '';
    }
    const heartCount = json.posts[i].heartCount;
    const commentCount = json.posts[i].commentCount;
    const createAt = json.posts[i].createdAt.slice(0, 11).replace('-', '년 ').replace('-', '월 ').replace('T', '일');
    console.log(json.posts[i].createdAt)
    
    const postItem = document.createElement('li');
    postItem.setAttribute('class','home-post');
      postItem.innerHTML = ` 
        <div class="home-post-user">
          <img class="user-profile" src="${profileImg}" alt="회원 프로필">
          <h4 class="user-name">${userName}</h4>
          <p class="user-id">@ ${accountName}</p>
          <button type="button" class="btn-menu"><button type="button" class="btn-menu">
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
              <img class="message-button" src="../assets/icon/icon-message-circle.png" alt="메세지 버튼">
            </button>
            <p class="message-count">${commentCount}</p>
          </div>
        </div>
        <p class="date">${createAt}</p>`;
      homePostCont.appendChild(postItem);
    }
  
  } catch (err) {
    console.log(err); // MEMO: err 내용 그대로 뜬다
  }
};

rederFollowPost();

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
      const content = element.content;
      document.querySelector('.comment-list').innerHTML += `
        <li class="list-item">
          <div class="item-wrap">
            <img class="user-profile" src="${profileImg}" alt="회원 프로필">
            <strong class="user-name">${userName}</strong>
            <button type="button" class="btn-menu"><img src="../assets/icon/icon-more-vertical.png" alt="메뉴 열기"></button>
          </div>
          <p class="content">${content}</p>
        </li>
      `
    })
  } catch(err) {
    console.log(err);
  }
};
