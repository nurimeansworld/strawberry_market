// @@@@@@@@@@@@@@@@@@@@@@ [S01] 유저검색 @@@@@@@@@@@@@@@@@@@@@@ //
const searchForm = document.querySelector('.search-form');
const searchInp = document.querySelector('.inp-search');

async function searchUser(e) {
  e.preventDefault();
  const searchValue = document.querySelector('.inp-search').value;
  if(searchValue == '') {
    document.querySelector(".container").innerHTML = '';
  } else {
    const url = "http://146.56.183.55:5050/user/searchuser/?keyword=";
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjU0ODg4OWQwOWQzNmIyMTM1YzFiMSIsImV4cCI6MTY0ODY1MTUwMCwiaWF0IjoxNjQzNDY3NTAwfQ.QieMk5pJr-_DbG4yrlla9x3BkgYqMk1-qvI-lNT1tqQ';
    const res = await fetch(url+searchValue, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    const json = await res.json();
    json.forEach(element => {
      const accountName = element.accountname;
      const userName = element.username;
      const image = element.image;
  
      document.querySelector(".container").innerHTML+=`
        <a herf='' class='user-list'>
            <img src='${image}' alt='프로필 이미지' class='profile-img'/>
            <div class='name-wrap'>
              <strong class='account-name'>${accountName}</strong>
              <small class='user-name'>${userName}</small>          
            </div
        </a>                
        `
      }
    );
  }
}

searchInp.addEventListener('input', searchUser);
