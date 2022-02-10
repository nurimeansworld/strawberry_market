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
// CHECK:: 프로필 이미지 용량 제한 있는지 큰 파일은 업로드 안됨 

// username
const userName = document.querySelector('.edit-name-input');
const nameError = document.querySelector('.name-error-message');
// accountname
const accountName = document.querySelector('.edit-id-input');
const accountError = document.querySelector('.account-error-message');
// intro
const intro = document.querySelector('.edit-intro-input');
const introError = document.querySelector('.intro-error-message');
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

// 프로필 설정 유효성 
// accountname에 지정된 문자 이외의 문자가 들어갈 경우
// 조건
// 1. 사용자 이름(2~10자 이내),
// 2. 계정 아이디 중복 불가 
// 3. 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.
// 가입된 accountname일 경우 = 계정 id 중복일 때 -> 이미 사용중인 계정 ID입니다.

// 1. 사용자 이름(2~10자 이내)
userName.addEventListener('focusout', () => {
  if((userName.value.length < 2) || (userName.value.length > 11) ){
    nameError.style.display = 'block';
    startBtn.disabled = true;
  }else{
    nameError.style.display = 'none';
    // startBtn.disabled = false;
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
    console.log(json);

    // accountname (계정id) 
    // 조건1. 이미 가입된 계정id면 안된다. 
    // 조건에 불일치 -> 이미 가입이 됐다 -> 에러메세지: '이미 가입된 계정ID 입니다' 
    // 조건 2. 영문,숫자,밑줄,마침표 빼고 안된다. 
    // const 정규표현식 = /^[영문,숫자,밑줄,마침표만 가능]/
    // 사용자가 입력한 accountname이 정규표현식과 같다 -> 통과! 
    // 같지 않다면 -> 에러메세지: '계정ID는 영문자, 숫자, 점(.), 밑줄(_)만 포함해야 합니다.'

    // 가입여부 검사 
    // CHECK:: if문 중첩이 심함
    if(json.message === '이미 가입된 계정ID 입니다.') { // 미통과 
      accountError.textContent = '*이미 가입된 계정ID 입니다.';
      accountError.style.display = 'block';
    } else { // 통과 
      // accountError.style.display = 'none';

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
    console.log(err);
  }
}

// 이벤트대상.이벤트걸어줘라는명령어('이벤트내용', 이벤트가발생하면호출할함수이름);
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
    console.log(json);
    if(json.message === "회원가입 성공") {
      window.location.href ="./login.html"
    }
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