// tab-menu (3.1.14 하단 탭 메뉴)

const tabMenu = document.querySelectorAll('.tab-menu-list li:not(:nth-child(3))');

for(const item of tabMenu) {
  item.addEventListener('click', () => {
    item.classList.toggle('on');
    console.log('클릭')
  })
}

// const tabHome = document.querySelector('.tab-menu-home');
// const tabChat = document.querySelector('.tab-menu-chat');
// const tabPost = document.querySelector('.tab-menu-post');
// const tabProfile = document.querySelector('.tab-menu-profile');


// tabHome.addEventListener('click', () => {
//   // 1. 클릭하면 주황색으로 변경, 다시 클릭하면 원래 색상으로 -> toggle 기능 
//   console.log('클릭');
//   tabHome.classList.toggle('on');

//   // 2. 클릭하면 Home 내용 불러오기 -> 우리는 a태그로 이동 
// })