// [search] 유저검색
// 뒤로가기
function goBack(){
  window.history.back();
}
document.querySelector('.btn-back').addEventListener('click', goBack);

// CHECK:: 검색어와 같은 단어 하이라이트 미구현
const searchForm = document.querySelector('.search-form');
const searchInp = document.querySelector('.inp-search');

async function searchUser(e) {
  e.preventDefault();
  const searchValue = e.target.value;
  if(searchValue == '') {
    document.querySelector(".container").innerHTML = '';
  } else {
    const url = "http://146.56.183.55:5050";
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjU0ODg4OWQwOWQzNmIyMTM1YzFiMSIsImV4cCI6MTY0ODY1MTUwMCwiaWF0IjoxNjQzNDY3NTAwfQ.QieMk5pJr-_DbG4yrlla9x3BkgYqMk1-qvI-lNT1tqQ';
    const res = await fetch(`${url}/user/searchuser/?keyword=${searchValue}`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    const json = await res.json();
    console.log(json);
    
    // ① 지우는 코드
    document.querySelector(".container").innerHTML = '';

    // ② 렌더링 하는 코드
    // render 
    // 일단 무조건 먼저 그냥 다 지우고 ①, 그 다음에 그 위에 렌더링을 함 ②
    json.forEach(element => {
      const accountName = element.accountname;
      const userName = element.username;
      const image = element.image;
      
      document.querySelector(".container").innerHTML += `
        <a href='./profile.html?id=${accountName}' class='user-list'>
            <img src='${image}' alt='프로필 이미지' class='profile-img'/>
            <div class='name-wrap'>
              <small class='user-name'>${userName}</small>          
              <strong class='account-name'>${accountName}</strong>
            </div
        </a>                
        `
      }
    );
  }
}

searchInp.addEventListener('input', searchUser);


