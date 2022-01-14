// @@@@@@@@@@@@@@@@@@@@@@ L01.html @@@@@@@@@@@@@@@@@@@@@@ //

const loginEmailInput = document.querySelector('.login-email-input');
const loginPwInput = document.querySelector('.login-pw-input');
const largeNextBtn = document.querySelector('.large-next-btn');
const LoginError = document.querySelector('.login-message-error');

// 로그인 버튼 활성화 함수
function checkBtn() {
  if(loginEmailInput.value === '' && loginPwInput.value === '') {
    largeNextBtn.disabled = true;
  } else if (loginEmailInput.value === '' || loginPwInput.value === '') {
    largeNextBtn.disabled = true;
  } else {
    largeNextBtn.disabled = false;
    largeNextBtn.classList.remove('disabled');
  }
}
// 아이디 입력시
loginEmailInput.addEventListener("input", checkBtn);

// 비밀번호 입력시 
loginPwInput.addEventListener("input", checkBtn);

function getInput(){
  console.log(loginEmailInput.value);
  console.log(loginPwInput.value);
}

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
  const url = "http://146.56.183.55:5050";
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
    console.log('resJson', resJson);

    if(resJson.status == 200){ // 로그인 성공한 경우
      localStorage.setItem("Token",resJson.user.token);
      location.href = "./H01.html";
    }else{ // 로그인 실패한 경우
      // MEMO:: 나중에 다른 기능과 같이 함수화 할 기능이 생기면 함수화 하기 - setErrorMessage();
      LoginError.style.display = 'block'; // LoginError.classList.add = 'on';
      LoginError.textContent = resJson.message;
    }
  }catch(err){
    // 아예 api와 연결이 되지 않았을 때
    // console.log('err', err);
  } 
}
largeNextBtn.addEventListener('click', login);


// 누리가 작성한 찌끄래기 낙서...
// 이메일&비밀번호 값 검사(api)
// 이메일&비밀번호 입력하고
// 아이디&&비번 일치시 성공된 json 값 return
// 아이디&&비번 일치하지 않을 지 error 값 return
// 이메일&비밀번호 입력 값 유효성 검사ㅏ(js)



// 정규식 관련 참고 블로그 링크 : https://rateye.tistory.com/468
