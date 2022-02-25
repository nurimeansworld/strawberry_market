const loginForm = document.querySelector('.login-form');
const loginEmailInput = document.querySelector('.login-email-input');
const loginPwInput = document.querySelector('.login-pw-input');
const largeLoginBtn = document.querySelector('.large-login-btn');
const LoginError = document.querySelector('.form-error-message');

// 로그인 버튼 활성화 함수
function checkBtn() {
  if(loginEmailInput.value !== '' && loginPwInput.value !== '') {
    largeLoginBtn.disabled = false;
  } else {
    largeLoginBtn.disabled = true;
  }
}

// 아이디 입력시
loginEmailInput.addEventListener("input", checkBtn);
// 비밀번호 입력시 
loginPwInput.addEventListener("input", checkBtn);

// 사용자 로그인 api 연동 함수
// ----- 이 함수에 대한 설명 -----
// 1. await 선언 필요 : 로그인 동작은 비동기로 이뤄져야 하기 때문에, async & await을 사용했고, 이 2개는 반드시 동시에 사용되어야 올바른 데이터 처리 가능
// 2. res에 있는 fetch 값 : 기본적으로 api 문서에 명세되어있는 내용을 보고 채우면 됨. method, headers, body 크게 3가지로 보통 명시되어 있음.
// 3. body 값 형변환 : jSON.stringify를 하지 않으면 object 형태로 return 되기 때문에 우리가 처리하려는 string 형변환 해야 함.
// 4. try{}catch(){} : 동작 수행 후 예외처리를 위해 선언. catch(err)로 err 내용 확인 가능. 정확한 원리는 추후 확인 필요.

async function login(e) {
  e.preventDefault(); // button form 전송하지 않게 초기화

  const userEmail = loginEmailInput.value;
  const userPw = loginPwInput.value;
  const url = (location.protocol === "https:") ? 'https://api.mandarin.cf' : 'http://146.56.183.55:5050';
  const loginData = {
    "user": {
      "email": userEmail,
      "password": userPw
    }
  };

  try{
    const res = await fetch(url+'/user/login', {
      method: "POST",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify(loginData),
    });
    const resJson = await res.json();

    if(resJson.status !== 422){ // 로그인 성공한 경우
      localStorage.setItem("accountname",resJson.user.accountname);
      localStorage.setItem("Token",resJson.user.token);
      location.href = "./followfeed.html";
    }else{ // 로그인 실패한 경우
      LoginError.style.display = 'block';
      LoginError.textContent = `*${resJson.message}`;
    }
  }catch(err){
    // 아예 api와 연결이 되지 않았을 때
    console.error('err', err);
  } 
}
largeLoginBtn.addEventListener('click', login);

// 로그인하여 localStorage에 값이 있는 경우 해당 페이지 접근 불가
function checkLogin() {
  if (localStorage.getItem("Token")) {
    location.href = "./followfeed.html";
  }
}
checkLogin();