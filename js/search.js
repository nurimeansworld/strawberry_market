// [search] 유저검색

const searchForm = document.querySelector('.search-form');
const searchInp = document.querySelector('.inp-search');

async function searchUser(e) {
  e.preventDefault();
  const searchValue = e.target.value;
  if(searchValue == '') {
    document.querySelector(".container").innerHTML = '';
  } else {
    const url = "http://146.56.183.55:5050";
    const token = localStorage.getItem('Token');
    const res = await fetch(`${url}/user/searchuser/?keyword=${searchValue}`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    const json = await res.json();
    console.log(json);
    
    document.querySelector(".container").innerHTML = '';

    // render 
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


