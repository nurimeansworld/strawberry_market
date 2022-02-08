///A01 하트 버튼 클릭시 하트 칠하기
function fillHeartRed() {
  const btnHeart = document.querySelector('.btn-heart');
  const fillBtnHeart = document.querySelector('.btn-heart-fill');

  if(fillBtnHeart === 'none') {
    btnHeart.classList.remove('btn-heart');
    fillBtnHeart.classList.add('on');
    }
  } 

btnHeart.addEventListener('click', fillHeartRed());


//5.2팔로우한 사람 피드 받아오기-----------------------------------------
const postId = new URLSearchParams(location.search).get('postId');

// async function rederFollowPost() {
//   const url = "http://146.56.183.55:5050";
//   const token = localStorage.getItem('Token');
//   const followData = {
//     "post": [
//       {
//         "id": String,
//         "content": "안녕하세요. 2 입니다.",
//         "image": String,
//         "createdAt": String,
//         "updatedAt": String,
//         "hearted": false,
//         "heartCount": 0,
//         "commentCount": 0,
//         "author": {
//           "_id": "작성자 id",
//           "username": "2",
//           "accountname": "2",
//           "following": [],
//           "follower": [
//                     "follower id"
//                 ],
//     "followerCount": 1,
//     "followingCount": 0
//             }
// }
//     ]
// }
// // follow 한 사용자가 없을 때
// {
//   "post": []

// }

//   try {
//     const res = await fetch(`${url}/post/feed/?limit=10&skip=0`, {
//       method: 'GET',
//       headers: {
//         'Authorization' : `Bearer ${token}`,
//         'Content-type' : 'application/json',
//       },
//       body: JSON.stringify()
//     });
//     const resJson
//   }
// }

