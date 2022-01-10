// L01.html
const loginEmailInput = document.querySelector('.login-email-input');
const loginPwInput = document.querySelector('.login-pw-input');
const largeNextBtn = document.querySelector('.large-next-btn');
const LoginError = document.querySelector('.login-message-error');

// L01.html - 이메일로 로그인 
// let flagIdBtn = false;
// let flagPwBtn = false;

// 아이디 입력시
loginEmailInput.addEventListener("input", function () {
  // flagIdBtn = true;

  // if (flagIdBtn === '' && flagPwBtn === '') {
  //   largeNextBtn.disabled = true;
  // } else if   
  //   else if (loginEmailInput.value !== null && loginPwInput.value !== null) { 
  //     console.log('둘 다 값 있음!'); 
  //     largeNextBtn.classList.remove('disabled');
  //     largeNextBtn.disabled = false;
  //   }
  // }

  // if(loginEmailInput.value == "")
  //   flagIdBtn = true;

  if(loginEmailInput.value === '' && loginPwInput.value === '') {
    largeNextBtn.disabled = true;
  } else if (loginEmailInput.value === '' || loginPwInput.value === '') {
    largeNextBtn.disabled = true;
  } else {
    largeNextBtn.disabled = false;
    largeNextBtn.classList.remove('disabled');
  }
});

// if(email.value === '' && pw.value === '') {
//   btn.disabled = true;

// } else if(email.value === '' || pw.value === ''){
//   btn.disabled = true;
// } else {
//   btn.disabled = false;
// }


// 비밀번호 입력시 
loginPwInput.addEventListener("input", function () {
  // console.log('비번 입력됨');
  // flagPwBtn = true;
  // console.log('flagPwBtn', flagPwBtn);

  // if (flagIdBtn === true && flagPwBtn === true) {
  //   console.log('3:', flagIdBtn, flagPwBtn);
  //   if (loginEmailInput.value !== null && loginPwInput.value !== null) {
  //     console.log('둘 다 값 있음!');
  //     largeNextBtn.classList.remove('disabled');
  //   }
  //   flagPwBtn = false;
  // }

  if(loginEmailInput.value === '' && loginPwInput.value === '') {
    largeNextBtn.disabled = true;
  } else if (loginEmailInput.value === '' || loginPwInput.value === '') {
    largeNextBtn.disabled = true;
  } else {
    largeNextBtn.disabled = false;
    largeNextBtn.classList.remove('disabled');
  }
});

async function login() {
  console.log('tes');
  const email = document.querySelector("#email")
  const pw = document.querySelector("#pw")
  const res = await fetch("http://146.56.183.55:5050/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "user": {
        "email": email.value,
        "password": pw.value,
      }
    })
  });
  const json = await res.json();
  console.log(json);

}
document.querySelector("#next-btn").addEventListener('click', login);







//이메일로 로그인

// // 1. 사용자가 이메일, 비번 입력 시 버튼 활성화
// loginEmailInput.addEventListener('keyup', function () {
//   if (loginEmailInput.value !== null && loginPwInput.value !== null) {
//     largeNextBtn.classList.remove('disabled');
//   }
// });

// 1. 사용자가 이메일, 비번 입력 시 버튼 활성화 
loginEmailInput.addEventListener('keyup', function(){
  if(loginEmailInput.value !== null && loginPwInput.value !== null) {
    largeNextBtn.classList.remove('disabled');
  }
});

loginPwInput.addEventListener('keyup', function(){
  if(loginEmailInput.value !== null && loginPwInput.value !== null) {
    largeNextBtn.classList.remove('disabled');
  }
});



// // 2. 로그인 버튼이 클릭되면 입력한 이메일과 비번이 데이터에 있는지 확인 
// largeNextBtn.addEventListener('click', () => {
//   if(loginEmailInput.value = 데이터에 있다면 && loginPwInput.value === 데이터에 있다면) {
//     // -> true 홈 페이지로 이동 (로그인됨)
//     location.href = 'H01.html';
//   } else {
//     // -> false 에러 메세지 띄우기 
//     LoginError.style.display = 'block'
//   }
// })

// // -------------------------------------------------------------------------

// instagramId.addEventListener('keyup', function(){
//     if(instagramId.value !== "" && instagramPassword.value.length > 5){
//          document.getElementById('loginButton').style.opacity = '1';
//     }
// }); // id input에 event

// instagramPassword.addEventListener('keyup', function(){
//     if(instagramId.value !== "" && instagramPassword.value.length > 5){
//          document.getElementById('loginButton').style.opacity = '1';
//     }
// });


// https://rateye.tistory.com/468





// if(email.value === '' && pw.value === '') {
//   btn.disabled = true;
// } else if(email.value === '' || pw.value === ''){
//   btn.disabled = true;
// } else {
//   btn.disabled = false;
// }