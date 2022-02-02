// 모든 input 입력되면 다음 버튼 활성화
const joinForm = document.querySelector('.join-form');
const joinEmail = document.querySelector('.join-email-input');
const joinPw = document.querySelector('.join-pw-input');
const nextBtn = document.querySelector('.large-next-btn');
const idError = document.querySelector('.id-error-message');
const pwError = document.querySelector('.pw-error-message');

// 다음 버튼 활성화 함수
function checkBtn() {
  if(joinEmail.value !== '' && joinPw.value !== '') {
    nextBtn.disabled = false;
  } else {
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
    // console.log('resEmailValidJson',resEmailValidJson);

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

    // match() https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/match
    // 문자열이 정규식과 매치되는 부분을 검색합니다.
    // 사용자가 입력한 값 -> 이메일 주소!! 이랑 뭘 비교해야 돼?! 

    // 근데 이메일 형식이 올바르지 않다.
    // -> 이메일 형식이 올발르지 않다고 메시지를 띄운다.

    // 근데 이미 이메일이 있다.
    // -> 이메일이 이미 있다고 메시지를 띄운다.

    // eamil 형식이 잘못될 경우
    // 잘못된 이메일 형식입니다.

    // 가입된 email일 경우
    // 이미 가입된 이메일 주소입니다.

  } catch (err) {
    console.error(err);
  }  
}
joinEmail.addEventListener('focusout',checkEmailValid);


// // 이메일 중복체크하는 함수 
// async function checkEmailValid(email) {
//     const res = await fetch(localStorage.getItem("url")+'/user/emailvalid',{
//       method:"POST",
//       header: {
//             "Content-Type": "application/json",
//           },
//       body:JSON.stringify({
//         "user":{
//               "email":email
//       }
//     })
//   })

//   const json = await res.json()
//   return json.message == "사용 가능한 이메일 입니다." ? true : false

//   // return 이 이메일이 사용가능한지 체크를 할거에요.
// }

// nextBtn.addEventListener("click", async ()=>{
//   const email = joinEmail.value
//   const pw = joinPw.value
  
//   //비밀번호 입력이 6자 이상이여야 함
//   if(pw.length>5){
//     const emailValid = await checkEmailValid(email)  
//     if (emailValid) {
//       errorMessage.style.display = "none"
//       nextBtn.disabled = false;
//     }else{
//       alert("중복된 이메일입니다.")
//     }
//   }else{alert("비밀번호를 다시 입력하세요.")}

// });
