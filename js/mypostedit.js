const profileImg = document.querySelector('.profile-img')
const postTxt = document.querySelector('.upload-txt');
const uploadInput = document.querySelector('.upload-input');
const imgContainer = document.querySelector('.img-container');

// 수정할 게시물의 내용을 화면에 뿌리기 
async function renderPost() {
  const url = 'http://146.56.183.55:5050';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmNjMjNkOWQwOWQzNmIyMTM2ZTk3MCIsImV4cCI6MTY0OTI2MDUzNiwiaWF0IjoxNjQ0MDc2NTM2fQ.dgflqthibSYSMd5p6EXqd-IdeHts0tv9fmLJjh-GOt4'
  // const token = localStorage.getItem('Token');
  const postId = new URLSearchParams(location.search).get('postId'); 

  try {
    const res = await fetch( `${url}/post/${postId}`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-type' : 'application/json'
      }, 
    });
    const json = await res.json();
    console.log(json);

    // json으로 받아온 데이터를 화면에 render(화면에 뿌림)
    // 화면에 뿌릴 내용(데이터)과 접근법
    // 1. 프로필이미지: post - author - image 
    // 2. 글 : post - content 
    // 3. 이미지 : post - image 
    // 데이터를 가져오는 법 
    // 1. 변수 선언 
    // 2. 변수의 값으로 데이터를 할당한다. 
    const src = json.post.author.image;
    const content = json.post.content;
    const jsonImg = json.post.image.split(',');
    console.log(src);
    console.log(content);
    console.log(jsonImg);

    // 받아온 데이터를 동적으로!!!! 화면에 뿌려야 된다고요.. 
    profileImg.setAttribute('src', src);
    postTxt.textContent = content;
    if(jsonImg.length >= 1 && jsonImg[0] !== '') { 
      jsonImg.map((src) => {
        // 업로드 이미지 
        const imgItem = document.createElement('div');
        imgItem.className = 'img-item';
        imgItem.setAttribute("style", `background-image: url(${src})`);
        imgContainer.appendChild(imgItem);
        // 이미지 삭제 버튼
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        imgItem.appendChild(closeBtn);
        closeBtn.addEventListener('click', () => {
          // 버튼이 이미지에 달려있음 -> 눌러진 버튼이 달려있는 이미지가 jsonImg 배열에서 빠져야 해요
          closeBtn
          // imgItem 얘도 사라져야 합니다.
        
        });
      });
    }
  } catch(err) {
    console.log(err);
  }
}
renderPost();

// 게시물을 수정한 후에 서버에 전송
async function editPost(){     
// 버튼을 누른다 -> 수정 (API코드를 짠다(명세보기필요한정보를 받아서 보냄 ) - 요청을 보낸다 - 결과를 확인 )
  const url = 'http://146.56.183.55:5050';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmNjMjNkOWQwOWQzNmIyMTM2ZTk3MCIsImV4cCI6MTY0OTI2MDUzNiwiaWF0IjoxNjQ0MDc2NTM2fQ.dgflqthibSYSMd5p6EXqd-IdeHts0tv9fmLJjh-GOt4'
  const postId = new URLSearchParams(location.search).get('postId'); 

  try {
    const res = await fetch( `${url}/post/${postId}`, {
      method: 'PUT',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-type' : 'application/json'
      },
      body:JSON.stringify({
        "post": {
          "content": postTxt.value,
          "image": postImg.value  
        }
      })
      
    });
    const json = await res.json();
    console.log(json);
  } catch(err) {
    console.log(err);
  }
};

