//5.2팔로우한 사람 피드-------------------------------------------------------------
const homePostCont = document.querySelector(".container");
// const postId = localStorage.getItem('postId');
// let postUserId = "";

async function renderFollowPost() {
  const url = "http://146.56.183.55:5050";
  const token = localStorage.getItem('Token');
  // console.log(token);
  try {
    const res = await fetch(`${url}/post/feed`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      }
    });
    const json = await res.json();
    // console.log(json);

    // rende
    if (json.posts.length === 0) {
      
    }
    for (let i = 0; i < json.posts.length; i++) {
      // console.log(json.posts[i]);
    let img = '';
    const profileImg = json.posts[i].author.image;
    const userName = json.posts[i].author.username;
    const accountName = json.posts[i].author.accountname;
    const content = json.posts[i].content;
    if (json.posts[i].image !== '') {
      // console.log(json.posts[i].image);
      img = `<img class="user-photo" src="${json.posts[i].image}" alt="회원 사진">`;
    } else {
      img = '';
    }


    const heartCount = json.posts[i].heartCount;
    const commentCount = json.posts[i].commentCount;
    const createAt = json.posts[i].createdAt.slice(0, 11).replace('-', '년 ').replace('-', '월 ').replace('T', '일');
    // console.log(json.posts[i].createdAt)
    
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

      // ['img', 'name'].forEach(key => {
      //   item
      //     .querySelector(`.user-${key}`)
      //     .addEventListener('click', () => {
      //       gotoPage('../html/P01.html', { user: accountName }, ['user']);
      //     });
      // });

      //

      //댓글 버튼을 눌렀을 때 댓글로 넘어가기
      const btnMessage = document.querySelector(".btn.btn-message");
      // btnMessage.innerHTML += `<a href= '../html/U01.html'>`

      function nextPageMessage() {
        const postId = new URLSearchParams(location.search).get('postId');
        window.location.href = `../html/U01.html?postId=${postId}`;
      }

      btnMessage.addEventListener('click', nextPageMessage);

    }//for문 닫는 버튼
  
  } catch (err) {
    console.error(err); // MEMO: err 내용 그대로 뜬다
  }
};

renderFollowPost();
