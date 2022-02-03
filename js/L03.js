// 모든 input 입력되면 다음 버튼 활성화
const joinForm = document.querySelector('.join-form');
const joinEmail = document.querySelector('.join-email-input');
const joinPw = document.querySelector('.join-pw-input');
const nextBtn = document.querySelector('.large-next-btn');
const idError = document.querySelector('.id-error-message');
const pwError = document.querySelector('.pw-error-message');
const LoginError = document.querySelector('.form-error-message');


async function joinUser(e) {
  // button 비활성화
  e.preventDefault();

  const userName = localStorage.userid;
  const userEmail = joinEmail.value;
  const userPw = joinPw.value;
  const userAccount = localStorage.accountname;
  const url = "http://146.56.183.55:5050";
  const userData = {
    "user": {
      "username": userName, //필수
      "email": userEmail, //필수
      "password": userPw, //필수
      "accountname": userAccount, //필수
      "intro": String,
      "image": String //http://146.56.183.55:5050/1641906557953.png
    }
  };

  try{
    const res = await fetch(url+'/user', {
    method: "POST",
    headers: {
      "Content-type" : "application/json"
    },
    body: Json.stringify(userData)
  });
  const resJson = await res.json();
}catch(err){
  console.error('err', err);
}
}