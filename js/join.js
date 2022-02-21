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
    
    // 이메일 주소 유효성 
    if(joinEmail.value.match(regExp) != null){
      if(resEmailValidJson.message === '이미 가입된 이메일 주소 입니다.') {
        idError.textContent = `*이미 가입된 이메일 주소 입니다.`;
        idError.style.display = 'block';
        nextBtn.disabled = true;
      }else{
        idError.style.display = 'none';
        nextBtn.disabled = false;
      }
    }else{
      idError.textContent = '*이메일 형식이 올바르지 않습니다.';
      idError.style.display = 'block';
      nextBtn.disabled = true;
    }

  } catch (err) {
    console.error(err);
  }  
}
joinEmail.addEventListener('focusout',checkEmailValid);



// L03 프로필 설정
const userName = document.querySelector('.edit-name-input');
const nameError = document.querySelector('.name-error-message');
const accountName = document.querySelector('.edit-id-input');
const accountError = document.querySelector('.account-error-message');
const intro = document.querySelector('.edit-intro-input');
const introError = document.querySelector('.intro-error-message');
const profileImg = document.querySelector('#editImg');
const profileImgHidden = document.querySelector('#editImgHidden');
const startBtn = document.querySelector('.large-start-btn');
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

userName.addEventListener('focusout', () => {
  if((userName.value.length < 2) || (userName.value.length > 11) ){
    nameError.style.display = 'block';
    startBtn.disabled = true;
  }else{
    nameError.style.display = 'none';
  }
});

//조건 2. 계정 아이디(accountname) 중복 불가
async function checkIdValid(){
  const url = 'http://146.56.183.55:5050';
  
  try {
    const res = await fetch(`${url}/user/accountnamevalid`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'        
      },
      body:JSON.stringify({
        "user":{
          "accountname": accountName.value
        }
      })
    });
    const json = await res.json();
    // console.log(json);

    // 가입여부 검사 
    // CHECK:: if문 중첩이 심함
    if(json.message === '이미 가입된 계정ID 입니다.') { // 미통과 
      accountError.textContent = '*이미 가입된 계정ID 입니다.';
      accountError.style.display = 'block';
    } else { // 통과 
      // 가입여부를 통과한 계정ID가 정규표현식에는 맞는지 유효성 검사 
      const regexName  = /^[0-9a-zA-Z._]*$/i; 
      if(accountName.value.match(regexName) == null  && accountName.value !== '') { // 정규표현식 아닌 경우
        accountError.textContent = '*계정ID는 영문자, 숫자, 점(.), 밑줄(_)만 포함해야 합니다.';
        accountError.style.display = 'block';
      } else {
        accountError.style.display = 'none';
        startBtn.disabled = false;

      }
    }
  } catch(err) {
    console.error(err);
  }
}
accountName.addEventListener('focusout', checkIdValid);

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
    if(json.type == 'entity.too.large'){
      console.error(json.message);
      alert('이미지 용량이 너무 큽니다.');
    }
    if(json.message === "회원가입 성공") {
      window.location.href ="./login.html"
    }
  } catch(err) {
    console.error(err);
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