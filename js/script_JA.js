/**************** tab-menu (3.1.14 하단 탭 메뉴) ****************/ 

const tabMenu = document.querySelectorAll('.tab-menu-list li:not(:nth-child(3))');

for(let i = 0; i < tabMenu.length; i++) {
  tabMenu[i].addEventListener('click', function() {
    for(let j = 0; j < tabMenu.length; j++) {
      tabMenu[j].classList.remove('on');
    };
    tabMenu[i].classList.add('on');
  });
};


/**************** 게시글 작성 페이지 - 업로드한 이미지 보여주기 ****************/

//값이 변경될 때 호출되는 이벤트
// uploadInp.addEventListener('change', (e) => {
//   const file = e.target.files[0]; // 선택된 파일 
//   console.log(file);

//   const reader = new FileReader();
//   reader.readAsDataURL(file); // 선택된 파일의 정보를 인자로 넣는다 

  // reader.onload = function(){ // 선택된 파일이 불러와지면
  //   // 1. div를 생성해서 선택된 파일을 백그라운드로 넣는다 
  //   const imgItem = document.createElement('div');
  //   imgItem.style.background = `url(${reader.result})`;
  //   imgItem.className = 'img-item';

  //   // 2. 생성한 div를 원래 있던 부모요소의 자식으로 지정한다
  //   imgContainer.appendChild(imgItem);
  //   // CHECK:: 왜 넣어야 하는지 모름
  //   e.target.value = '';

  //   // 3. close 아이콘을 클릭하면 div를 제거한다
  //   const closeBtn = document.createElement('button');
  //   closeBtn.className = 'close-btn';
  //   imgItem.appendChild(closeBtn);
  //   closeBtn.addEventListener('click',function(){
  //     imgContainer.removeChild(imgItem);
  //   })
//   }
// })


// CHECK:: 한 번에 업로드할 때 3장 초과 못하도록 기능 구현 완료했으나 버튼을 한번 더 누르면 최대 3장까지 또 추가할 수 있다. 한 번이든 여러번이든 최대 딱 3장이여야 한다.
const uploadInp = document.querySelector('.upload-input');
const imgContainer = document.querySelector(".img-container");

function readInputFile(e){
  var selectedFiles = [];
  
  selectedFiles = [];
  
  const files = e.target.files;
  const fileArr = Array.prototype.slice.call(files);
  const index = 0;
  
  fileArr.forEach(function(i) {
    if(files.length <= 3){
      selectedFiles.push(i);
      const reader = new FileReader();
      reader.onload = function(e) {
        // 1. div를 생성해서 선택된 파일을 백그라운드로 넣는다 
        const imgItem = document.createElement('div');
        imgItem.style.background = `url(${reader.result})`;
        imgItem.className = 'img-item';

        // 2. 생성한 div를 원래 있던 부모요소의 자식으로 지정한다
        imgContainer.appendChild(imgItem);
        // CHECK:: 왜 넣어야 하는지 모름
        e.target.value = '';

        // 3. close 아이콘을 클릭하면 div를 제거한다
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        imgItem.appendChild(closeBtn);
        closeBtn.addEventListener('click',function(){
          imgContainer.removeChild(imgItem);
        })
      };
      reader.readAsDataURL(i);
    }
  })

  if(files.length > 3){
    alert("최대 3장까지 업로드 할 수 있습니다.");
  }
}

uploadInp.addEventListener('change',readInputFile);