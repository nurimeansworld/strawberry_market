// tab-menu (3.1.14 하단 탭 메뉴)

const tabMenu = document.querySelectorAll('.tab-menu-list li:not(:nth-child(3))');

for(let i = 0; i < tabMenu.length; i++) {
  tabMenu[i].addEventListener('click', function() {
    for(let j = 0; j < tabMenu.length; j++) {
      tabMenu[j].classList.remove('on');
    };
    tabMenu[i].classList.add('on');
  });
};


// 