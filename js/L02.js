// L02 이메일로 회원가입 

// 모든 input 입력되면 다음 버튼 활성화
const joinForm = document.querySelector('.join-form');
const joinEmail = document.querySelector('.join-email-input');
const joinPw = document.querySelector('.join-pw-input');
const nextBtn = document.querySelector('.large-next-btn');
const idError = document.querySelector('.id-error-message');
const pwError = document.querySelector('.pw-error-message');
const LoginError = document.querySelector('.form-error-message');

// 다음 버튼 활성화 함수
function checkBtn() {
  if(joinEmail.value !== '' && joinPw.value !== '') {
    nextBtn.disabled = false;
    LoginError.style.display = 'none';
  } else {
    LoginError.style.display = 'block';
    nextBtn.disabled = true;
  }
}

// 이메일 입력시
joinEmail.addEventListener("input", checkBtn);
// 비밀번호 입력시 
joinPw.addEventListener("input", checkBtn);
joinPw.addEventListener("input", checkPw);

// 비밀번호 유효성 검사
function checkPw() {
  if(joinPw.value.length <= 5) {
    pwError.style.display = 'block';
  } else {
    pwError.style.display = 'none';
  }
}

// 이메일 중복 체크하는 함수
async function checkEmailValid() {
  const url = 'http://146.56.183.55:5050';
  const emailInp = {
    "user":{
      "email": joinEmail.value
    }
  }
  const init = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify(emailInp)
  }

  try {
    const resEmailValid = await fetch(`${url}/user/emailvalid`, init);
    const resEmailValidJson = await resEmailValid.json();    

    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    // 이메일 주소의 형식이 유효 X -> @ 
    if(joinEmail.value.match(regExp) != null){ // = null -> 일치하는게 없다 -> 이메일 형식이 아니다 // != null -> 일치한다 -> 이메일 형식이 맞다!  
      nextBtn.disabled = true;      
      document.querySelector('.id-error-message').style.display = 'none';
    }else{
      document.querySelector('.id-error-message').textContent = '*이메일 형식이 올바르지 않습니다.';
      document.querySelector('.id-error-message').style.display = 'block';
      nextBtn.disabled = false;
    }

  } catch (err) {
    console.error(err);
  }  
}
joinEmail.addEventListener('focusout',checkEmailValid);



// L03 프로필 설정
// CHECK:: 프로필 이미지 용량 제한 있는지 큰 파일은 업로드 안됨 

// username
const userName = document.querySelector('.edit-name-input');
// accountname
const accountName = document.querySelector('.edit-id-input');
// intro
const intro = document.querySelector('.edit-intro-input');
// image (type=file)
const profileImg = document.querySelector('#editImg');
// image (type=hidden)
const profileImgHidden = document.querySelector('#editImgHidden');
// 감귤마켓 시작하기 버튼
const startBtn = document.querySelector('.large-start-btn');
// image button
const profileImgBtn = document.querySelector('.profile-btn-upload');

// 버튼 클릭시 이미지 input 버튼 클릭
profileImgBtn.addEventListener('click', function(e) {
  profileImg.click();
});

// 이미지 배경 설정 background image url render function
let readURL = function (input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      document.querySelector('.profile-edit-wrap').style.background = `url(${e.target.result}) center center / cover`;
      editImgHidden.value = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
  }
}
editImg.addEventListener('change', function (e) {
  readURL(this);
});


// 회원 정보 api에 post하기
async function joinUser(e) {
  // button 비활성화
  e.preventDefault();
  const url = 'http://146.56.183.55:5050';

  // 프로필 이미지 업로드 유무 판단
  const image = (profileImgHidden.value !== '') ? profileImgHidden.value : 'http://146.56.183.55:5050/Ellipse.png';
  
  try {
    const res = await fetch(`${url}/user`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        'user': {
          'username': userName.value,
          'email': joinEmail.value,
          'password': joinPw.value,
          'accountname': accountName.value,
          'intro': intro.value,
          'image': image //http://146.56.183.55:5050/1641906557953.png 형식.
        }
      })
    });
    const json = await res.json();

  } catch(err) {
    console.log(err);
  }
}

startBtn.addEventListener('click', joinUser);

const proSection = document.querySelector('.profile-section')
const joinSection = document.querySelector('.join-section');

nextBtn.addEventListener('click', (e) => {
  e.preventDefault();

  joinSection.style.display = 'none';
  proSection.style.display = 'block';
});