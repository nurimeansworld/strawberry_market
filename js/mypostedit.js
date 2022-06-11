const postId = new URLSearchParams(location.search).get('postId');
const profileImg = document.querySelector('.profile-img')
const postTxt = document.querySelector('.upload-txt');
const hiddenImg = document.querySelector('#hiddenImg');
const uploadInput = document.querySelector('.upload-input');
const uploadImgBtn = document.querySelector('.upload-img');
const imgContainer = document.querySelector('.img-container');
const uploadBtn = document.querySelector('.upload-btn');
let imgFiles = []; 

async function uploadImg(file) {
  const url = (location.protocol === "https:") ? 'https://mandarin.api.weniv.co.kr' : 'http://146.56.183.55:5050';
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${url}/image/uploadfiles`, {
      method: "POST",
      body: formData 
  });
  const data = await res.json()
  const productImgName = data[0].filename;
  return productImgName;
}

function setImg() {
  if(hiddenImg.value !== ''){
    const arrImg = hiddenImg.value.split(',');

    if(arrImg.length >= 1 && arrImg[0] !== '') { 
      arrImg.map((src) => {
        const imgItem = document.createElement('div');
        imgItem.className = 'img-item';
        imgItem.setAttribute("style", `background-image: url(${src})`);
        imgContainer.appendChild(imgItem);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        imgItem.appendChild(closeBtn);

        closeBtn.addEventListener('click', () => {
          arrImg.splice([...imgContainer.children].indexOf(imgItem)-1, 1); 
          imgContainer.removeChild(imgItem);
          hiddenImg.value = arrImg;

        });
      });
    }
  }
}
// 수정할 게시물의 내용을 화면에 뿌리기 
async function renderPost() {
  const url = (location.protocol === "https:") ? 'https://mandarin.api.weniv.co.kr' : 'http://146.56.183.55:5050';
  const token = localStorage.getItem('Token');

  try {
    const res = await fetch( `${url}/post/${postId}`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-type' : 'application/json'
      }, 
    });
    const json = await res.json();
    const post = json.post;

    const src = post.author.image;
    const content = post.content;

    profileImg.setAttribute('src', src);  // 저자 프로필 이미지
    postTxt.textContent = content;
    hiddenImg.value = post.image;

    setImg();
  } catch(err) {
    console.error(err);
  }
}
// 사진 새로 추가
function readInputFile(e){
  const files = e.target.files;
  const fileArr = [...files];
  const arrImg = hiddenImg.value.split(',');

  fileArr.forEach(file => imgFiles.push(file));
  fileArr.forEach(function(i) {
    if(arrImg.length < 3){
      var reader = new FileReader();
      reader.onload = function (e) {
        const imgItem = document.createElement('div');
        imgItem.style.backgroundImage = `url(${reader.result})`;
        imgItem.className = 'img-item';

        imgContainer.appendChild(imgItem);
        e.target.value = '';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        imgItem.appendChild(closeBtn);

        closeBtn.addEventListener('click',function(){
          arrImg.splice([...imgContainer.children].indexOf(imgItem)-1, 1); 
          imgContainer.removeChild(imgItem);
          hiddenImg.value = arrImg;
        });
      }
      reader.readAsDataURL(i);
    }else{
      alert('이미지는 3장까지 가능합니다.');
    }
  });
}

renderPost();
uploadInput.addEventListener('change',readInputFile);

async function editPost(){     
  const url = (location.protocol === "https:") ? 'https://mandarin.api.weniv.co.kr' : 'http://146.56.183.55:5050';
  const token = localStorage.getItem('Token');
  const postId = new URLSearchParams(location.search).get('postId'); 
  const oldImg = hiddenImg.value;
  const updateImgArr = (hiddenImg.value === '') ? [] : oldImg.split(',');

  for (const file of imgFiles) {
    const resultImg = await uploadImg(file);
    updateImgArr.push(`${url}/${resultImg}`); 
  }

  try {
    const res = await fetch(`${url}/post/${postId}`, {
      method: 'PUT',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-type' : 'application/json'
      },
      body:JSON.stringify({
        "post": {
          "content": postTxt.value,
          "image": updateImgArr.join(',')
        }
      })
      
    });
    const json = await res.json();
    location.href="./myprofile.html";

    if(json.type == 'entity.too.large'){
      console.error(json.message);
      alert('이미지 용량이 너무 큽니다.');
    }
  }catch(err){
    location.href="./404.html";
    console.error(err);
  }
};
uploadBtn.addEventListener('click', editPost)
