// follow 상태 변경
function changeFollow(){
  if(this.className === 'medium-follow-btn'){
    this.classList.remove('medium-follow-btn');
    this.classList.add('medium-unfollow-btn');
    this.textContent = '언팔로우';
  }else{
    this.classList.remove('medium-unfollow-btn');
    this.classList.add('medium-follow-btn');
    this.textContent = '팔로우';
  }
}
const followBtn = document.querySelector('.medium-follow-btn');
followBtn.addEventListener('click', changeFollow);

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

// 2. 얻어온 정보 뿌려주기
function setOtherProfile(otherProfile) {
  const other_image = (otherProfile.image) ? otherProfile.image : '../assets/basic-profile-img-2.png';
  const followBtn = document.querySelector('.medium-follow-btn');

  document.querySelector('.profile-followers dd a').setAttribute('href', `./followers.html?id=${otherProfile.accountname}`);
  document.querySelector('.profile-followers dd a').textContent = otherProfile.followerCount;
  document.querySelector('.profile-followings dd a').setAttribute('href', `./followings.html?id=${otherProfile.accountname}`);
  document.querySelector('.profile-followings dd a').textContent = otherProfile.followingCount;
  document.querySelector('.profile-img').src = other_image;
  document.querySelector('.profile-name').textContent = otherProfile.username;
  document.querySelector('.profile-account').textContent = `@${otherProfile.accountname}`;
  document.querySelector('.profile-desc').textContent = otherProfile.intro;

  // 팔로우 or 언팔로우
  if (otherProfile.isfollow === true) {
    followBtn.textContent = '언팔로우';
    followBtn.classList.replace('medium-follow-btn', 'medium-unfollow-btn');
  }
}

function setOtherProduct(otherProduct) {
  const productSec = document.querySelector('.product-sec');

  if (otherProduct.data !== 0) {
    // 상품 O
    const fragment = document.createDocumentFragment();
    const productList = document.querySelector('.product-list');

    for (const product of otherProduct.product) {
      const productPrice = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      const productItem = document.createElement('li');
      productItem.setAttribute('class', 'product-item');
      productItem.setAttribute('data-id', product.id);

      const productLink = document.createElement('a');
      productLink.setAttribute('href', product.link);
      productLink.setAttribute('target', '_blank');
      productLink.setAttribute('data-id', product.id);

      const productImg = document.createElement('img');
      productImg.setAttribute('src', product.itemImage);
      productImg.setAttribute('alt', '상품 이미지입니다.');
      productImg.setAttribute('class', 'item-img');

      const productTit = document.createElement('h3');
      productTit.setAttribute('class', 'item-tit sl-ellipsis');
      productTit.textContent = product.itemName;

      const productText = document.createElement('p');
      productText.setAttribute('class', 'item-price');
      productText.textContent = `${productPrice}원`;

      // productItem.addEventListener('click', close4);

      productLink.appendChild(productImg);
      productLink.appendChild(productTit);
      productLink.appendChild(productText);
      
      productItem.appendChild(productLink);
      fragment.appendChild(productItem);
      productList.appendChild(fragment);
    }
    productSec.appendChild(productList);
  } else {
    // 상품 X
    productSec.remove();
  }
}

function setOtherImgPost(otherImgPost) {
  const fragement = document.createDocumentFragment();
  const postAlbumList = document.querySelector('.post-album-list');
  for (const imgPost of otherImgPost) {
    const postAlbumItem = document.createElement('li');
    postAlbumItem.setAttribute('class', 'post-album-item');
    postAlbumItem.innerHTML = `<a href="./postdetail.html?postId=${imgPost.id}"><img src="${imgPost.image}" alt=""></a>`;
    fragement.appendChild(postAlbumItem);
  }
  postAlbumList.appendChild(fragement);
}

function checkImagePost(otherPost) {
  let checkImagePost = false;
  let OtherImgPost = [];

  for (post of otherPost) {
    if (post.image !== '') {
      checkImagePost = true;
      OtherImgPost.push(post);
    }
  }
  if (checkImagePost === true) {
    // 이미지 게시글 O - 앨범으로 보기 게시글 추가
    setOtherImgPost(OtherImgPost);
  } else {
    // 이미지 게시글이 X - 앨범으로 보기 remove
    const viewAlbumBtn = document.querySelector('.post-btn-album');
    const postAlbumSec = document.querySelector('.post-album-sec');
    viewAlbumBtn.remove();
    postAlbumSec.remove();
  }
}

function setOtherPost(otherPost, otherProfile) {
  const user_image = (otherProfile.image) ? otherProfile.image : '../assets/basic-profile-img-2.png';
  const htmlPostUser = `<div class="home-post-user">
    <img class="user-profile" src="${user_image}" alt="회원 프로필">
    <h4 class="user-name">${otherProfile.username}</h4>
    <p class="user-id">@ ${otherProfile.accountname}</p>
    <button type="button" class="btn-menu"><img src="../assets/icon/icon-more-vertical.png" alt="메뉴 열기"></button>
    </div>`;

  const postSec = document.querySelector('.post-sec');

  if (Object.keys(otherPost.post).length !== 0) {
    // 이미지 게시글 체크
    checkImagePost(otherPost.post);

    const fragment = document.createDocumentFragment();
    const postList = document.querySelector('.post-list-list');

    for (const post of otherPost.post) {
      const post_date = new Date(post.createdAt);
      const post_date_format = `${post_date.getFullYear()}년 ${post_date.getMonth() + 1}월 ${post_date.getDate()}일`;
      // 이미지 여부 확인 및 복수 처리
      let postImageList = '';
      if(post.image){
        const postImages = post.image;
        const imageList = postImages.split(',');
        for (const item of imageList) {
          postImageList = `${postImageList}<li class="current"><img src="${item}" alt="포스트 이미지" class="user-photo"></li>`
        }
      }
      postImageList = `<ul class="post-img-list">${postImageList}</ul>`

      const heartBtnClass = post.hearted ? "btn btn-heart on" : "btn btn-heart";
      const postItem = document.createElement('li');
      postItem.setAttribute('class', 'post-list-item home-post');
      postItem.setAttribute('data-id', post.id);
      postItem.innerHTML = `${htmlPostUser}
          <div class="home-post-content">
            <p class="user-cont">${post.content}</p>
            ${postImageList}
          </div>`;

      const postComment = document.createElement('div');
      postComment.setAttribute('class', 'home-post-comment');

      const itemHeart = document.createElement('div');
      itemHeart.setAttribute('class', 'item-count');
      const itemHeartBtn = document.createElement('button');
      itemHeartBtn.setAttribute('type', 'button');
      itemHeartBtn.setAttribute('class', heartBtnClass);
      itemHeartBtn.addEventListener('click', (e) => {
        e.target.classList.toggle('on');
      });
      const itemHeartCount = document.createElement('p');
      itemHeartCount.setAttribute('class', 'heart-count');
      itemHeartCount.textContent = post.heartCount;

      itemHeart.appendChild(itemHeartBtn);
      itemHeart.appendChild(itemHeartCount);

      const itemComment = document.createElement('div');
      itemComment.setAttribute('class', 'item-count');
      const itemCommentBtn = document.createElement('button');
      itemCommentBtn.setAttribute('type', 'button');
      itemCommentBtn.setAttribute('class', 'btn btn-message');
      const itemCommentImg = document.createElement('img');
      itemCommentImg.setAttribute('class', 'message-button');
      itemCommentImg.setAttribute('src', '../assets/icon/icon-message-circle.png');
      itemCommentImg.setAttribute('alt', '댓글 버튼');
      itemCommentBtn.addEventListener('click', () => {
        location.href=`./postdetail.html?postId=${post.id}`;
      });
      const itemCommentCount = document.createElement('p');
      itemCommentCount.setAttribute('class', 'message-count');
      itemCommentCount.textContent = post.commentCount;

      itemComment.appendChild(itemCommentBtn);
      itemCommentBtn.appendChild(itemCommentImg);
      itemComment.appendChild(itemCommentCount);

      const itemDate = document.createElement('p');
      itemDate.setAttribute('class', 'date');
      itemDate.textContent = post_date_format;
      
      postComment.appendChild(itemHeart);
      postComment.appendChild(itemComment);

      postItem.appendChild(postComment);
      postItem.appendChild(itemDate);
      fragment.appendChild(postItem);
    }
    postList.appendChild(fragment);
  } else {
    // 게시글 X
    postSec.remove();
  }
}

// 1. api - 프로필 정보 얻어오기
async function getOtherProfile() {
  const url = 'http://146.56.183.55:5050';

  // ?id= 값이 있는지 확인
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
    // otherProfile
    const resOtherProfile = await fetch(`${url}/profile/${accountName}`, init);
    const resOtherProfileJson = await resOtherProfile.json();
    const otherProfile = resOtherProfileJson.profile;

    setOtherProfile(otherProfile);

    // otherProduct
    const resOtherProduct = await fetch(`${url}/product/${accountName}`, init);
    const resOtherProductJson = await resOtherProduct.json();
    const otherProduct = resOtherProductJson;

    setOtherProduct(otherProduct);

    // OtherProduct
    const resOtherPost = await fetch(`${url}/post/${accountName}/userpost`, init);
    const resOtherPostJson = await resOtherPost.json();
    const otherPost = resOtherPostJson;

    setOtherPost(otherPost, otherProfile);
  } catch (err) {
    location.href="./404.html";
    console.error('err', err);
  }
}

// 사용자 프로필 or 마이 프로필 확인s
function checkUserOther() {
  const accountName = checkAccountName();
  if (!location.search.split('id=')[1] || accountName == localStorage.getItem('accountname')) {
    location.href = "./myprofile.html";
  }
}

// title 수정
changeTitle();
// 사용자 프로필인지 마이 프로필인지 확인
checkUserOther();
// 프로필 데이터 받아오기
getOtherProfile();
