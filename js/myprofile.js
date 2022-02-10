// 리스트로 보기, 엘범으로 보기
function toggleOn(){
  const viewListSec = document.querySelector('#viewList');
  const viewAlbumSec = document.querySelector('#viewAlbum');
  
  this.classList.add('on');

  if(this.id === 'viewAlbum-btn'){
    this.previousElementSibling.classList.remove('on');
    viewListSec.classList.remove('on');
    viewAlbumSec.classList.add('on');
  }else{
    this.nextElementSibling.classList.remove('on');
    viewAlbumSec.classList.remove('on');
    viewListSec.classList.add('on');
  }
}
const viewListBtn = document.querySelector('#viewList-btn');
const viewAlbumBtn = document.querySelector('#viewAlbum-btn');
viewListBtn.addEventListener('click', toggleOn);
viewAlbumBtn.addEventListener('click', toggleOn);

const profileEditBtn = document.querySelector('.profile-edit-btn');
const profileProdBtn = document.querySelector('.profile-product-btn');
profileEditBtn.addEventListener('click', (e) => {
  const accountName = checkAccountName();
  e.preventDefault();
  location.href = './accountedit.html';
});
profileProdBtn.addEventListener('click', (e) => {
  const accountName = checkAccountName();
  e.preventDefault();
  location.href = './product.html';
});

// 2. 얻어온 정보 뿌려주기
function setUserProfile(userProfile) {
  const user_image = (userProfile.image) ? userProfile.image : '../assets/basic-profile-img-2.png';

  document.querySelector('.profile-followers dd a').textContent = userProfile.followerCount;
  document.querySelector('.profile-followings dd a').textContent = userProfile.followingCount;
  document.querySelector('.profile-img').src = user_image;
  document.querySelector('.profile-name').textContent = userProfile.username;
  document.querySelector('.profile-account').textContent = `@${userProfile.accountname}`;
  document.querySelector('.profile-desc').textContent = userProfile.intro;
}

function setUserProduct(userProduct) {
  const productSec = document.querySelector('.product-sec');

  if (userProduct.data !== 0) {
    // 상품 O
    const fragment = document.createDocumentFragment();
    const productTit = document.createElement('h2');
    productTit.setAttribute('class', 'sec-title');
    productTit.textContent = '판매 중인 상품';

    const productList = document.createElement('ul');
    productList.setAttribute('class', 'product-list');

    for (const product of userProduct.product) {
      const productPrice = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      const productItem = document.createElement('li');
      productItem.setAttribute('class', 'product-item');
      productItem.innerHTML = `<a id="${product.id}" href="./edit.html?productId=${product.id}"><img src="${product.itemImage}" alt="상품 이미지입니다." class="item-img">
        <h3 class="item-tit sl-ellipsis">${product.itemName}</h3><p class="item-price">${productPrice}원</p></a>`;
      fragment.appendChild(productItem);
      productList.appendChild(fragment);
    }

    productSec.appendChild(productTit);
    productSec.appendChild(productList);
  } else {
    // 상품 X
    productSec.remove();
  }
}

function setUserImgPost(userImgPost) {
  const fragement = document.createDocumentFragment();
  const postAlbumList = document.querySelector('.post-album-list');
  for (const imgPost of userImgPost) {
    const postAlbumItem = document.createElement('li');
    postAlbumItem.setAttribute('class', 'post-album-item');
    postAlbumItem.innerHTML = `<a href="./postdetail.html?postId=${imgPost.id}"><img src="${imgPost.image}" alt=""></a>`;
    fragement.appendChild(postAlbumItem);
  }
  postAlbumList.appendChild(fragement);
}

function checkImagePost(userPost) {
  let checkImagePost = false;
  let userImgPost = [];

  for (post of userPost) {
    if (post.image !== '') {
      checkImagePost = true;
      userImgPost.push(post);
    }
  }
  if (checkImagePost === true) {
    // 이미지 게시글 O - 앨범으로 보기 게시글 추가
    setUserImgPost(userImgPost);
  } else {
    // 이미지 게시글이 X - 앨범으로 보기 remove
    const viewAlbumBtn = document.querySelector('.post-btn-album');
    const postAlbumSec = document.querySelector('.post-album-sec');
    viewAlbumBtn.remove();
    postAlbumSec.remove();
  }
}

function setUserPost(userPost, userProfile) {
  const user_image = (userProfile.image) ? userProfile.image : '../assets/basic-profile-img-2.png';
  const htmlPostUser = `<div class="home-post-user">
    <img class="user-profile" src="${user_image}" alt="회원 프로필">
    <h4 class="user-name">${userProfile.username}</h4>
    <p class="user-id">@ ${userProfile.accountname}</p>
    <button type="button" class="btn-menu"><img src="../assets/icon/icon-more-vertical.png" alt="메뉴 열기"></button>
    </div>`;

  const postSec = document.querySelector('.post-sec');

  if (Object.keys(userPost.post).length !== 0) {
    // 이미지 게시글 체크
    checkImagePost(userPost.post);

    const fragment = document.createDocumentFragment();
    const postList = document.querySelector('.post-list-list');

    for (const post of userPost.post) {
      const post_date = new Date(post.createdAt);
      const post_date_format = `${post_date.getFullYear()}년 ${post_date.getMonth() + 1}월 ${post_date.getDate()}일`;

      const postImage = post.image ? `<img class="user-photo" src="${post.image}" alt="게시글 사진">` : '';
      const post_image = post.image;

      const heartBtn = post.hearted ? `<img class="heart-button" src="../assets/icon/icon-heart-active.png" alt="하트버튼">` : `<img class="heart-button" src="../assets/icon/icon-heart.png" alt="하트버튼">`;

      const postItem = document.createElement('li');
      postItem.setAttribute('class', 'post-list-item home-post');
      postItem.innerHTML = `${htmlPostUser}
          <!-- 게시글 내용 부분 -->
          <div class="home-post-content">
            <p class="user-cont">${post.content}</p>
            ${postImage}
          </div>
          <!-- 게시글 좋아요,메세지 버튼 -->
          <div class="home-post-comment">
            <div class="item-count">
              <button type="button" class="btn btn-heart">${heartBtn}</button>
              <p class="heart-count">${post.heartCount}</p>
            </div>
            <div class="item-count">
              <button type="button" class="btn btn-message">
                <img class="message-button" src="../assets/icon/icon-message-circle.png" alt="메세지 버튼">
              </button>
              <p class="message-count">${post.commentCount}</p>
            </div>
          </div>
          <!-- 게시글 날짜 -->
          <p class="date">${post_date_format}</p>`;
      fragment.appendChild(postItem);
    }
    postList.appendChild(fragment);
  } else {
    // 게시글 X
    postSec.remove();
  }
}

// 1. api - 프로필 정보 얻어오기
async function getUserProfile() {
  const url = 'http://146.56.183.55:5050';
  const accountName = checkAccountName();
  const token = localStorage.getItem('Token');
  const init = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
  }

  try {
    // userProfile
    const resUserProfile = await fetch(`${url}/profile/${accountName}`, init);
    const resUserProfileJson = await resUserProfile.json();
    const userProfile = resUserProfileJson.profile;

    setUserProfile(userProfile);

    // userProduct
    const resUserProduct = await fetch(`${url}/product/${accountName}`, init);
    const resUserProductJson = await resUserProduct.json();
    const userProduct = resUserProductJson;

    setUserProduct(userProduct);

    // userProduct
    const resUserPost = await fetch(`${url}/post/${accountName}/userpost`, init);
    const resUserPostJson = await resUserPost.json();
    const userPost = resUserPostJson;

    setUserPost(userPost, userProfile);
  } catch (err) {
    console.error('err', err);
  }
}

// 사용자 프로필 or 마이 프로필 확인
function checkUserOther() {
  if (location.search.split('id=')[1]) {
    location.href = `./profile.html?id=${location.search.split('id=')[1]}`;
  }
}

// title 수정
changeTitle();
checkUserOther();
getUserProfile();