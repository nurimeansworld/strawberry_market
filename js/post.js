// [post] 게시물 작성 

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

// 댓글 작성자의 프로필 이미지 동적으로 받아오기
async function renderProfile() {
  const url = (location.protocol === "https:") ? 'https://mandarin.api.weniv.co.kr' : 'http://146.56.183.55:5050';
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
    // console.log(json.profile.image);
    profileImg.setAttribute('src', json.profile.image);
  } catch(err) {
    console.error(err);
  }
}
renderProfile();


// 이미지 업로드
async function uploadImg(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`https://mandarin.api.weniv.co.kr/image/uploadfiles`, {
      method: "POST",
      body: formData
  });
  const data = await res.json()
  const productImgName = data[0].filename;
  return productImgName;
}


// 게시글 작성 후 서버에 post
async function createPost() {
  const url = (location.protocol === "https:") ? 'https://mandarin.api.weniv.co.kr' : 'http://146.56.183.55:5050';
  const token = localStorage.getItem('Token');
  const contentText = uploadTxt.value;
  const files = uploadInp.files;
  if(imgFiles.length > 3) {
    alert('이미지 파일은 최대 3장까지만 가능합니다.');
  } else {
    const imgUrls = [];
    for (const file of imgFiles) {
      imgUrls.push(`${url}/${await uploadImg(file)}`);
    }
    // console.log('imgUrls', imgUrls);
    const res = await fetch(`${url}/post`, {
      method: 'POST',
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-type" : "application/json"
      },
      body:JSON.stringify({
        "post": {
          "content": contentText,
          "image": imgUrls.join(',') 
        }
      })
    })
    const json = await res.json();
    // console.log(json);
    location.href = '../pages/myprofile.html';
  }
}

uploadBtn.addEventListener('click', createPost)


// 사진 미리보기
function readInputFile(e){
  const files = e.target.files;
  const fileArr = [...files];
  const index = 0;
  fileArr.forEach(file => imgFiles.push(file));
  // console.log(imgFiles);
  
  fileArr.forEach(function(i) {
    if(files.length <= 3){
      const reader = new FileReader();
      reader.onload = function(e) {
        const imgItem = document.createElement('div');
        imgItem.style.backgroundImage = `url(${reader.result})`;
        imgItem.className = 'img-item';

        imgContainer.appendChild(imgItem);
        e.target.value = '';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        imgItem.appendChild(closeBtn);
        closeBtn.addEventListener('click',function(){
          // MEMO:: imgFiles에서 삭제, 미리보기에 삭제
          imgFiles.splice([...imgContainer.children].indexOf(imgItem), 1);
          imgContainer.removeChild(imgItem);
          // console.log(imgFiles);
        });
      };
      reader.readAsDataURL(i);
    }
  })
}
uploadInp.addEventListener('change',readInputFile);