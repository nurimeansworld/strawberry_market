//5.2팔로우한 사람 피드-------------------------------------------------------------
const homePostCont = document.querySelector(".container");
// const postId = localStorage.getItem('postId');
// let postUserId = "";

// 팔로우한 게시글 불러오기 
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

    if(json.posts.length === 0) {
      location.href = `../pages/home.html`;
    }
    // render
      for (let i = 0; i < json.posts.length; i++) {
        // console.log(json.posts[i]);
        let img = '';
        const postId = json.posts[i].id;
        const profileImg = json.posts[i].author.image;
        const userName = json.posts[i].author.username;
        const accountName = json.posts[i].author.accountname;
        const content = json.posts[i].content;
        // 목표 li>img 태그를 json.posts[i].image에 담긴 이미지 url의 갯수만큼 동적으로 생성한다. 
        const postImg = json.posts[i].image.split(',');
        const heartCount = json.posts[i].heartCount;
        const commentCount = json.posts[i].commentCount;
        const createAt = json.posts[i].createdAt.slice(0, 11).replace('-', '년 ').replace('-', '월 ').replace('T', '일');
        
        // 피드 전체
        const feedCont = document.querySelector('.feed-cont');
        // 게시글
        const postItem = document.createElement('li');
        // 게시글 헤더시작
        const div = document.createElement('div');
        const img22 = document.createElement('img');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        const button = document.createElement('button');
        const strong = document.createElement('strong');
        // 게시글 내용부분
        const ul = document.createElement('ul');
        const div2 = document.createElement('div');
        const p2 = document.createElement('p');
        const div3 = document.createElement('div');
        // 게시글 좋아요,메세지 버튼
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
        img22.className = 'user-profile';
        h4.className = 'user-name';
        p.className = 'user-id';
        button.className = 'btn-menu';
        strong.className = 'sr-only';
        div2.className = 'home-post-content';
        p2.className = 'user-cont';
        div3.className = 'post-content-imgs';
        div4.className = 'home-post-comment';
        ul.className = 'imgs-container';
        div5.className = 'item-count item-count-heart';
        button2.className = 'btn btn-heart';
        p3.className = 'heart-count';
        div6.className = 'item-count item-count-message';
        button3.className = 'btn btn-message ';
        img2.className = 'message-button';
        p4.className = 'message-count';
        p5.className = 'date';
        
        postItem.setAttribute('class', 'home-post');
        img22.setAttribute('src', profileImg);
        img22.setAttribute('alt', '회원 프로필');
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
        p5.textContent = createAt;
        
        button.addEventListener('click', (e) => {
          open6();
        })

        button2.addEventListener('click', (e) => {
          e.target.classList.toggle('on');
        })
        
        feedCont.appendChild(postItem);
        postItem.appendChild(div);
        div.appendChild(img22);
        div.appendChild(h4);
        div.appendChild(p);
        div.appendChild(button);
        button.appendChild(strong);
        postItem.appendChild(div2);
        div2.appendChild(p2);
        postItem.appendChild(div3);
        
        // ul.innerHTML = postImg;
        postItem.appendChild(div4);
        div4.appendChild(div5);
        div5.appendChild(button2);
        div5.appendChild(p3);
        div4.appendChild(div6);
        div6.appendChild(button3);
        button3.appendChild(img2);
        div6.appendChild(p4);
        postItem.appendChild(p5);

        // 게시물의 이미지 
        // console.log(postImg);
        // (3) ['사진1.jpg', '사진2.jpg', '사진3.jpg']
        // (1) ['사진1.jpg']
        // (1) [''] -> postImg[0] = '';
        // div3를 이미지가 있을 때만 동적으로 생성하기 -> if문 
        // if문의 조건: postImg.length가 1이상이면서 배열의 첫번째 요소가 빈 문자열이면 안된다
        // && : and 둘다 truth -> truth를 반환 
        // || : or 둘 중 하나만 truth -> truth를 반환 
        if(postImg.length >= 1 && postImg[0] !== '') { 
          // div3와 그 이하의 요소를 여기서 생성 
          // postImg에 담긴 src를 img태그의 src에 각각 넣어준다 -> map 활용
          postImg.map((url) => {
            const li = document.createElement('li');
            const img = document.createElement('img');            
            li.className = 'img-item';
            img.className = 'post-img'
            img.setAttribute('src', url);
            ul.appendChild(li);
            li.appendChild(img);
          })
          div3.appendChild(ul);
        }
      }//for문 닫는 버튼

    //댓글 버튼을 눌렀을 때 댓글로 넘어가기
    const btnMessage = document.querySelector(".item-count-message");
    // btnMessage.innerHTML += `<a href= '../html/U01.html'>`
    
    function nextPageMessage() {
      window.location.href = `../pages/postdetail.html`;
    };

    btnMessage.addEventListener('click', nextPageMessage);

    
    // 신고하기 모달(희정님 담당) 
    btnMenu = document.querySelector('.btn-menu');
    btnMenu.addEventListener('click', (e) => {
      open6();
    })

    const open6 = () => {
      document.querySelector(".modal6").classList.remove("hidden");
    }
    const close6 = () => {
      document.querySelector(".modal6").classList.add("hidden");
    }

    document.querySelector(".other-user-comment").addEventListener("click", open6);
    document.querySelector(".hidden-menu").addEventListener("click", close6);

    const btn6 = document.querySelector('.call-post');
    const pop6 = document.querySelector('.dimm');
    const out6 = document.querySelector('.cancle-btn');
    const call6 = document.querySelector('.call-btn');

    btn6.addEventListener('click', viewOption);
    out6.addEventListener('click', cancleOption);
    call6.addEventListener('click', cancleOption);

    function viewOption() {
      pop6.style.display = 'block';
    }
    function cancleOption() {
      pop6.style.display = 'none';
    }


    //http://127.0.0.1:5503/html/MD06.html?postId=6202a3fb9d09d36b213a721e
    // 별로 댓글
    //댓글 신고 

    const postId = new URLSearchParams(location.search).get('postId');
    console.log('postId', postId);

    // 게시글 삭제 예시 
    // const productId = document.querySelector(".product-item a").id;
    // console.log('test', productId);

    // commentId연결 안됨 


    // const callAlert = document.querySelector('.call-btn');

    async function callPost() {

      // 버튼을 누른다 -> 삭제 (API코드를 짠다(명세보기필요한정보를 받아서 보냄 ) - 요청을 보낸다 - 결과를 확인 )
      const url = 'http://146.56.183.55:5050';
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmNjMjNkOWQwOWQzNmIyMTM2ZTk3MCIsImV4cCI6MTY0OTMzNjMwNiwiaWF0IjoxNjQ0MTUyMzA2fQ.1OxFHxHcN4BV1m_0TzK-t4h8aQ6VIbKs3Z-BM7B94yk'
      const commentId = document.querySelector(".comment-item a").id;
      console.log('test', commentId);


      try {
        const res = await fetch(`${url}/post/${postId}/comments/${commentId}/report`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
          }
        });
        const json = await res.json();
        console.log(json);

      } catch (err) {
        console.log(err);
      }
    };
    call6.addEventListener('click', callPost);
    // const open6 = () => {
    //   document.querySelector(".modal6").classList.remove("hidden");
    // }
    // const close6 = () => {
    //   document.querySelector(".modal6").classList.add("hidden");
    // }

    // document.querySelector(".report-menu").addEventListener("click", close6);

    // const btn6 = document.querySelector('.call-post');
    // const pop6 = document.querySelector('.report-dim');
    // const out6 = document.querySelector('.cancle-btn');
    // const call6 = document.querySelector('.call-btn');

    // btn6.addEventListener('click', viewOption);
    // out6.addEventListener('click', cancleOption);
    // call6.addEventListener('click', cancleOption);

    // function viewOption() {
    //   pop6.style.display = 'block';
    // }
    // function cancleOption() {
    //   pop6.style.display = 'none';
    // }

  }catch (err) {
    console.log(err); // MEMO: err 내용 그대로 뜬다
  }
};

renderFollowPost();


