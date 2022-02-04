const uploadTxt = document.querySelector('.upload-txt');
const uploadInp = document.querySelector('.upload-input');
const imgContainer = document.querySelector('.img-container');
const uploadBtn = document.querySelector('.upload-btn');

/* 
  MEMO:: 
  0. 전역 변수로 imgFiles을 빈 배열로 선언한다.
  1. readInputFile()에서 uploadInp에 업로드한 파일을 imgFiles에 담는다. 
  2. readInputFile()에서 업로드한 이미지의 삭제 버튼을 누르면 미리보기에서 삭제되고 imgFiles에서도 삭제된다 
    → 몇번 째에 있는 이미지를 삭제하는 건지 구별해야 한다. 이미지의 index값 기준으로 삭제해야 한다. 
  3. createPost()에서 imgFiles의 요소를 서버로 post할 imgUrls에 담는다.
  4. 서버에 imgUrls을 보낸다.
*/
const imgFiles = [];


// 이미지 업로드
async function uploadImg(file) {
  const formData = new FormData();
  formData.append("image", file);
  // console.log('formData: ' + formData);
  const res = await fetch(`http://146.56.183.55:5050/image/uploadfiles`, {
      method: "POST",
      body: formData
  });
  const data = await res.json()
  // console.log('data: ' ,data);
  const productImgName = data[0].filename;
  // console.log('productImgName: ' + productImgName);
  return productImgName;
}


// 게시글 작성 후 서버에 post
async function createPost() {
  const url = "http://146.56.183.55:5050";
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjU0ODg4OWQwOWQzNmIyMTM1YzFiMSIsImV4cCI6MTY0ODY1MTUwMCwiaWF0IjoxNjQzNDY3NTAwfQ.QieMk5pJr-_DbG4yrlla9x3BkgYqMk1-qvI-lNT1tqQ';
  const contentText = uploadTxt.value;
  const files = uploadInp.files;
  if(imgFiles.length > 3) {
    alert('이미지 파일은 최대 3장까지만 가능합니다.');
  } else {
    const imgUrls = [];
    for (const file of imgFiles) {
      imgUrls.push(`${url}/${await uploadImg(file)}`);
    }
    console.log('imgUrls', imgUrls);
    const res = await fetch(`${url}/post`, {
      method: 'POST',
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-type" : "application/json"
      },
      body:JSON.stringify({
        "post": {
          "content": contentText,
          "image": imgUrls.join(',') //"imageurl1", "imageurl2" 형식으로 
        }
      })
    })
    const json = await res.json();
    console.log(json);
    // location.href = '../html/P02.html';
  }
}

uploadBtn.addEventListener('click', createPost)

function removeImg() {

}


// 사진 미리보기
// CHECK:: 아래 미리 만들어둔 코드 활용해서 쓰면 된다!!!
function readInputFile(e){
  const files = e.target.files;
  const fileArr = [...files];
  const index = 0;
  fileArr.forEach(file => imgFiles.push(file));
  console.log(imgFiles);
  
  fileArr.forEach(function(i) {
    if(files.length <= 3){
      const reader = new FileReader();
      reader.onload = function(e) {
        // 1. div를 생성해서 선택된 파일을 백그라운드로 넣는다 
        const imgItem = document.createElement('div');
        imgItem.style.backgroundImage = `url(${reader.result})`;
        imgItem.className = 'img-item';

        // 2. 생성한 div를 원래 있던 부모요소의 자식으로 지정한다
        imgContainer.appendChild(imgItem);
        // CHECK:: 왜 넣어야 하는지 모름
        e.target.value = '';

        // 3. close 아이콘을 클릭하면 div를 제거한다
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        imgItem.appendChild(closeBtn);
        closeBtn.addEventListener('click',function(){
          // MEMO:: imgFiles에서 삭제, 미리보기에 삭제
          imgFiles.splice([...imgContainer.children].indexOf(imgItem), 1);
          imgContainer.removeChild(imgItem);
          console.log(imgFiles);
        });
      };
      reader.readAsDataURL(i);
    }
  })
}

uploadInp.addEventListener('change',readInputFile);