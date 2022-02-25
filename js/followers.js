function setFollowing(userInfo) {
  const followList = document.querySelector('.follow-list');
  const fragment = document.createDocumentFragment();

  if (Object.keys(userInfo).length !== 0) {
    for (const user of userInfo) {
      // 유저 정보
      const loginUser = localStorage.getItem('accountname');
      const user_accountname = user.accountname;
      const user_username = user.username;
      const user_intro = user.intro;
      const user_image = user.image;
      const user_link = `./profile.html?id=${user_accountname}`;
      let user_btn = '';

      if (user_accountname == loginUser) {
        // 로그인한 계정인 경우
        user_btn = '';
      } else {
        if (user.isfollow === true) {
          user_btn = `<button type="button" class="cancel-button" data-id="${user_accountname}">취소</button>`;
        } else {
          user_btn = `<button type="button" class="small-follow-button" data-id="${user_accountname}">팔로우</button>`;
        }
      }

      // 계정 추가
      const followItem = document.createElement('li');
      followItem.setAttribute('class', 'follow-item');
      // followItem.setAttribute('data-id', user_accountname);
      followItem.innerHTML = `<a href="${user_link}" class="user-follow-bar">
      <img src="${user_image}" alt="사용자 이미지" class="user-image">
        <div class="user-follow-info">
          <span>${user_username}</span>
          <div class="user-email sl-ellipsis">${user_intro}</div>
        </div>
    </a>${user_btn}`;

      const followBtnEvent = followItem.getElementsByTagName('BUTTON')[0];
      followBtnEvent.addEventListener('click', changeFollowList);
      fragment.appendChild(followItem);
    }
    followList.appendChild(fragment);
  } else {
    // 팔로우 or 팔로워가 1명도 없을 때
    const emptyfollowItem = document.createElement('li');
    emptyfollowItem.setAttribute('class', 'emptyfollow-item');
    emptyfollowItem.innerHTML = `<span>팔로워 계정이 없습니다.</span><div class="user-email">유저를 검색해 팔로우 해보세요!</div>`;
    fragment.appendChild(emptyfollowItem);
    followList.appendChild(fragment);
  }
}

async function getFollowing() {
  const url = (location.protocol === "https:") ? 'https://api.mandarin.cf' : 'http://146.56.183.55:5050';
  const accountName = checkAccountName();
  const token = localStorage.getItem('Token');
  const init = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    }
  }

  try {
    const res = await fetch(`${url}/profile/${accountName}/follower?limit=100`, init);
    const resJson = await res.json();

    setFollowing(resJson);
  } catch (err) {
    // location.href="./404.html";
    console.error('err', err);
  }
}

getFollowing();