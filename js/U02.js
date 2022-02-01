// CHECK:: 전체적으로 정리 필요! 
const uploadTxt = document.querySelector('.upload-txt');
const uploadInp = document.querySelector('.upload-input');
const imgContainer = document.querySelector('.img-container');
const uploadBtn = document.querySelector('.upload-btn');


async function imgUpload(files, index) {
  const formData = new FormData();
  formData.append("image", files[index]);
  const res = await fetch('http://146.56.183.55:5050/image/uploadfile', {
      method: "POST",
      body : formData
  })
  const data = await res.json()
  const productImgName = data["filename"];
  return productImgName
}

//token
// const token = localStorage.getItem("Token")
//
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjU0ODg4OWQwOWQzNmIyMTM1YzFiMSIsImV4cCI6MTY0ODY1MTUwMCwiaWF0IjoxNjQzNDY3NTAwfQ.QieMk5pJr-_DbG4yrlla9x3BkgYqMk1-qvI-lNT1tqQ'

async function uploadPost(e) {
  const url = "http://146.56.183.55:5050"

  // 사용자가 작성한 글 
  const content = uploadTxt.value;
  // 사용자가 불러온 이미지를 담을 빈 배열
  const imgUrls = [];
  // 사용자가 불러온 이미지
  const files = uploadInp.files;

  console.log(token)
  console.log(content)
  console.log(imgUrls)
  console.log(files)
  
  //사용자가 불러온 이미지 파일이 3개 이하이면
  if(files.length <= 3) {
    for(let index = 0; index < files.length; index++) {
      const imgUrl = await imgUpload(files, index)
      imgUrls.push(url+imgUrl);
    }
    const res = await fetch(url+'/post', {
      method: "POST", 
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-type" : "application/json"
      },
      body: JSON.stringify({ 
        "post": {
            "content": content,
            "image": imgUrls+'' 
        }
      })
    })
    const json = await res.json()
    console.log(json)
  }else {
    alert('이미지 파일은 최대 3장까지 첨부 가능합니다.')
  }
}

uploadBtn.addEventListener('click', uploadPost);


// ::: 아래 미리 만들어둔 코드 활용해서 쓰면 된다!!!

function readInputFile(e){
  var selectedFiles = [];
  
  selectedFiles = [];
  
  const files = e.target.files;
  const fileArr = Array.prototype.slice.call(files);
  const index = 0;
  
  fileArr.forEach(function(i) {
    if(files.length <= 3){
      selectedFiles.push(i);
      const reader = new FileReader();
      reader.onload = function(e) {
        // 1. div를 생성해서 선택된 파일을 백그라운드로 넣는다 
        const imgItem = document.createElement('div');
        imgItem.style.background = `url(${reader.result})`;
        imgItem.className = 'img-item';

        // 2. 생성한 div를 원래 있던 부모요소의 자식으로 지정한다
        imgContainer.appendChild(imgItem);
        // ::: 왜 넣어야 하는지 모름
        e.target.value = '';

        // 3. close 아이콘을 클릭하면 div를 제거한다
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        imgItem.appendChild(closeBtn);
        closeBtn.addEventListener('click',function(){
          imgContainer.removeChild(imgItem);
          // ::: imgUrls 배열에서도 빼줘야 한다
        })
      };
      reader.readAsDataURL(i);
    }
  })
}

uploadInp.addEventListener('change',readInputFile);