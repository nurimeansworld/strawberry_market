const profileImg = document.querySelector('.profile-img')
const postTxt = document.querySelector('.upload-txt');
const uploadInput = document.querySelector('.upload-input');
const imgContainer = document.querySelector('.img-container');
const uploadBtn = document.querySelector('.upload-btn');

const imgFiles = []; 
// 0. 전역 변수로 imgfiles을 빈 배열로 선언한다.

// 게시글 상세 api
// 수정할 게시물의 내용을 화면에 뿌리기 
async function renderPost() {
  const url = (location.protocol === "https:") ? 'https://api.mandarin.cf' : 'http://146.56.183.55:5050';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTc0MThkODY1NjVjNDg2NzdjMTAxYiIsImV4cCI6MTY1MDg3NTI4NCwiaWF0IjoxNjQ1NjkxMjg0fQ.eFYoDRDBbWuoPgWQLqbVrdEtXCILR5y270Qr2LUJ9jE'
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

    //받아온 데이터를 동적으로!!!! 화면에 뿌려야 된다고요.. 
    profileImg.setAttribute('src', src); // 요소의 속성값 설정
    postTxt.textContent = content;
    
    if(jsonImg.length >= 1 && jsonImg[0] !== '') { 
      console.log(jsonImg);
      jsonImg.map((src) => {
        // 업로드 이미지 
        const imgItem = document.createElement('div');
        imgItem.className = 'img-item';
        imgItem.setAttribute("style", `background-image: url(${src})`);
        imgContainer.appendChild(imgItem);
           // child 자식요소에 접근

        // 기존 이미지 삭제 버튼
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        imgItem.appendChild(closeBtn);
        closeBtn.addEventListener('click', () => {
          // 버튼이 이미지에 달려있음 -> 눌러진 버튼이 달려있는 이미지가 jsonImg 배열에서 빠져야 해요 
          // index값 기준으로 splice 요소 제거
          jsonImg.splice( [...imgContainer.children].indexOf(imgItem), 1); 
          console.log([...imgContainer.children].indexOf(imgItem));
          // imgItem 얘도 사라져야 합니다.
          imgContainer.removeChild(imgItem);
          // 화면상으로는 없어지기는 하나 배열에서 빠지지 않은 상태 
          console.log(imgFiles);
        });
      });
    }
  } catch(err) {
    console.log(err);
  }
}
renderPost();



//이미지 업로드 (지아님코드)
async function uploadImg(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`https://api.mandarin.cf/image/uploadfiles`, {
      method: "POST",
      body: formData 
  });
  const data = await res.json()
  const productImgName = data[0].filename;
  return productImgName;
}

// 게시글 수정 api
// 게시물을 수정한 후에 서버에 전송
async function editPost(){     
// 버튼을 누른다 -> 수정 (API코드를 짠다(명세보기필요한정보를 받아서 보냄 ) - 요청을 보낸다 - 결과를 확인 )
  const url = (location.protocol === "https:") ? 'https://api.mandarin.cf' : 'http://146.56.183.55:5050';
  // const token = localStorage.getItem('Token');
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTc0MThkODY1NjVjNDg2NzdjMTAxYiIsImV4cCI6MTY1MDg3NTI4NCwiaWF0IjoxNjQ1NjkxMjg0fQ.eFYoDRDBbWuoPgWQLqbVrdEtXCILR5y270Qr2LUJ9jE'
  const postId = new URLSearchParams(location.search).get('postId'); 
  const files = uploadInput.files;
  if(imgFiles.length > 3) {  //이미지 파일 3장이상이면 
    alert('이미지 파일은 최대 3장까지만 가능합니다.');
  } else {
    const imgUrls = [];
    for (const file of imgFiles) {
      imgUrls.splice(`${url}/${await uploadImg(file)}`); //배열요소 추가하거나 제거  splice
    }
      console.log('imgUrls', imgUrls);
  }

  
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
          "image": imgFiles    // imgcontainer , imgUrls imgItem jsonImg uploadImg
          //이미지 추가시에 이미지 url을 post할 배열에 넣으세요??! 
          // 3. createPost()에서 imgFiles의 요소를 서버로 post할 imgUrls에 담는다.
          // 4. 서버에 imgUrls을 보낸다. 여기서 문제인가?
        }
      })
      
    });
    const json = await res.json();
    console.log(json);


    location.href = '../pages/myprofile.html';
  } catch(err) {
    console.log(err);
  }
};

uploadBtn.addEventListener('click', editPost)



// 사진 미리보기 (지아님코드)
function readInputFile(e){
  const files = e.target.files;
  const fileArr = [...files];
  const index = 0;

  // 파일 추가됨 
  fileArr.forEach(file => imgFiles.push(file)); // 베열끝 요소추가 
  console.log(imgFiles); // 추가한 이미지 생김
  fileArr.forEach(function(i) {
    if(files.length < 3){
      const reader = new FileReader();
      reader.onload = function(e) {
        const imgItem = document.createElement('div');
        imgItem.style.backgroundImage = `url(${reader.result})`;
        imgItem.className = 'img-item';
        imgContainer.appendChild(imgItem);
        e.target.value = '';
        
        // 추가된 이미지 삭제 버튼
        // 2. readInputFile()에서 업로드한 이미지의 삭제 버튼을 누르면 미리보기에서 삭제되고 imgFiles에서도 삭제된다 
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        imgItem.appendChild(closeBtn);
        closeBtn.addEventListener('click',function(){
          // MEMO:: imgFiles에서 삭제, 미리보기에 삭제
          imgFiles.splice([...imgContainer.children].indexOf(imgItem), 1);
          // → 몇번 째에 있는 이미지를 삭제하는 건지 구별해야 한다. 이미지의 index값 기준으로 삭제해야 한다.
          imgContainer.removeChild(imgItem);
          console.log(imgFiles);
          // 추가한 이미지가 화면에서 삭제는 되나 배열에서 빠지지 않음 
        });
      };
      reader.readAsDataURL(i);
    }
  })
}

uploadInput.addEventListener('change',readInputFile);
// 1. readInputFile()에서 uploadInput 업로드한 파일을 imgFiles에 담는다. 




// 딸기 마켓 하하하하하 계정 임시 수정 페이지  
// http://172.30.1.51:5503/pages/mypostedit.html?postId=621741b786565c48677c102e



