# 딸기마켓

<!-- [🔗 URL](https://nurimeansworld.github.io/strawberry_market/pages) -->
[🔗 퍼블리싱 리스트](https://nurimeansworld.github.io/strawberry_market/html/index.html)

<!-- - 개발 기간 : 2022-01-03 ~ 2022-02-13 -->
<!-- - 개발 환경
  - 프론트 : HTML & CSS & Vanilla JS
  - 백 : 제공된 API 사용 -->
- 🦁 멋사 프론트엔드스쿨 1기 팀 프로젝트로 진행한 딸기마켓입니다.
- 🍓 딸기마켓 서비스는 자신의 스토어에서 판매하고 있는 상품(딸기)를 등록하여 홍보할 수 있는 SNS입니다.
- 상품을 등록하지 않아도 일상을 공유하며 즐거운 SNS 활동을 할 수 있습니다. 글과 사진과 함께 게시물을 작성하여 자신의 일상을 공유할 수 있습니다. 다른 사용자를 팔로우하면 유저가 올린 게시물을 홈 피드에서 소식을 확인할 수도 있습니다.
- 피드를 구경하다가 마음에 드는 게시물을 발견했다면 댓글을 남길 수 있습니다.

***

## 1. 목표
- 개인 판매자가 보다 손쉽게 자신의 상품(딸기)를 판매 할 수 있는 플랫폼을 제공한다.
- 현재 판매를 진행하지 않는 잠재 판매자와 고객에게 쉽게 접근 가능한 SNS 플랫폼입니다.
- 손수 제작한 상품을 등록하여 수익을 창출할 수 있는 SNS 장터입니다.


## 2. 개발 환경 및 배포 URL- 
### 개발 환경
- Front : HTML & CSS & Vanilla JS
- Back : 제공된 API 사용
- 버전 관리 및 이슈 : GitHub, GitHub Issues, GitHub Project
- 서비스 배포 환경 : GitHub Pages
### 배포 URL
[🔗 URL](https://nurimeansworld.github.io/strawberry_market/pages)


## 3. 프로젝트 구조와 개발 일정
### 프로젝트 구조
```bash
|   README.md
|
+---.vscode/
+---assets/
|       \---icon/
+---css
|       default.css
|       font.css
|       reset.css
|       style.css
|       style_HJ.css
|       style_JA.css
|       style_NR.css
|       style_YE.css
+---font/
+---html/
+---js
|       accountedit.js
|       chat.js
|       edit.js
|       followers.js
|       followfeed.js
|       followings.js
|       home.js
|       index.js
|       intro.js
|       join.js
|       login.js
|       myprofile.js
|       post.js
|       postdetail.js
|       product.js
|       profile.js
|       script.js
|       search.js
|       useredit.js
\---pages
        accountedit.html
        chat.html
        chatroom.html
        edit.html
        followers.html
        followings.html
        H02.html
        home.html
        index.html
        intro.html
        join.html
        login.html
        myprofile.html
        post.html
        postdetail.html
        product.html
        profile.html
        search.html
```
- assets : 이미지, 파비콘, 아이콘
- html : 개발용 html 디렉토리
- pages : 서비스용 html 디렉토리

### 개발 기간
- 2022-01-03 ~ 2022-02-13
- 개발 기간동안 GitHub Projects를 사용하여 일정 관리
<img src="https://user-images.githubusercontent.com/92960723/153541899-7a566b69-f9f6-4e34-846c-112ff6dfa35a.png">

## 회의록
- [220202 회의록](https://github.com/nurimeansworld/strawberry_market/wiki/220202-회의록)
- [220128 회의록 (딸기마켓 Reboot 🔥)](https://github.com/nurimeansworld/strawberry_market/wiki/220128-%ED%9A%8C%EC%9D%98%EB%A1%9D-(%EB%94%B8%EA%B8%B0%EB%A7%88%EC%BC%93-Reboot-%F0%9F%94%A5))
- [220114 회의록](https://github.com/nurimeansworld/strawberry_market/wiki/220114-회의록)
- [220112 회의록](https://github.com/nurimeansworld/strawberry_market/wiki/220112-회의록)
- [220107 회의록](https://github.com/nurimeansworld/strawberry_market/wiki/220107-회의록)
- [220103 회의록](https://github.com/nurimeansworld/strawberry_market/wiki/220103-회의록)
- [211228 회의록](https://github.com/nurimeansworld/strawberry_market/wiki/211228-회의록)


## 참여자(역할 분담)

<img src="https://user-images.githubusercontent.com/92960723/153541899-7a566b69-f9f6-4e34-846c-112ff6dfa35a.png">

- 박누리 [github/nurimeansworld](https://github.com/nurimeansworld)
- 최영은 [github/zeroyouth](https://github.com/zeroyouth)
- 이지아 [github/zeroto99](https://github.com/zeroto99)
- 한희정 [github/greenknight03](https://github.com/greenknight03)



## 5. UI
<img src="지아님 작업해주신 이미지 링크 - 페이지 모아둔 것">

## 6. 페이지 기능
- 상세 기능 설명은 각 페이지별 링크에

index.html intro.html(스플래시, 넘어가는 것) 0 
login.html (유효성 검사도 보여주면 좋을 것 같아요!) 0
join.html (화면 2개 넘어가는 것) 0

홈
home.html, followfeed.html (로그인 후 팔로잉 하나도 없는 상태, 로그인 후 팔로잉 있어서 게시글 뜨는 상태)  
검색
searh.html (상단 돋보기, 검색하기 누르면 검색 페이지로 이동 -> 검색한 내용 나오는 것)

채팅
chat.html, chatlist.html (채팅 리스트에서 채팅 창으로 넘어가는 것) 

게시물 작성
post.html (게시글 작성 후 업로드 클릭하여 게시글 등록 확인)
게시물 상세
postdetail.html 댓글 아이콘 눌러 상세 페이지로 이동. 댓글 작성하여 추가된 것 확인
아직 미완 - postedit.html 게시글 수정 누르면 이동.


마이 프로필
myprofile.html (단순 스크롤 천천히 내렸다 올라오기. 판매 상품 스크롤 해보고, 게시글의 경우 앨범으로 보기도 클릭해보기)
유저 프로필
profile.html (단순 스크롤 천천히 내렸다 올라오기. 팔로우 버튼 눌렀다 변하는 것 확인, 판매 상품 스크롤 해보고, 게시글의 경우 앨범으로 보기도 클릭해보기)
팔로워
followers.html (버튼 클릭하여 팔로우 on/off 보여주기. 상대방 프로필로 이동하는 것도 보여주기)
팔로잉
followings.html (이건 팔로우를 10명 넘게 해서 목록이 스크롤 되는 것도 보이면 좋을 것 같아요!)

마이 프로필 (.희정님께서 도움을 주심)
로그아웃
myprofile.html (상단 메뉴 클릭 -> 로그아웃 클릭 -> 로그아웃)
프로필 수정
accountedit.html (myprofile.html에서 내 프로필수정 누르고 -> 수정하여 저장까지) 좀 길다면 적당히 잘라주세요)
상품 등록
product.html (myprofile.html에서 상품 등록 누르고 데이터 입력하여 저장버튼 활성화까지) 좀 길다면 적당히 잘라주세요)
상품 수정
edit.html (myprofile.html에서 판매 중인 상품 클릭 -> 수정 클릭 -> 수정 페이지)
상품 삭제
edit.html (myprofile.html에서 판매 중인 상품 클릭 -> 삭제 클릭)
상품 사이트로 이동
edit.html (myprofile.html에서 판매 중인 상품 클릭 -> 새 탭으로 창)
















판매 중인 상품 클릭
 - 내 상품인 경우 : 삭제, 수정, 웹사이트에서 보기
   - 
 - 다른 사람 상품인 경우 : 바로 웹사이트로 새 창 띄우기
edit.html 







## 7. 개발하며 겪은 이슈
- 컨벤션 정하기
### 1) 컨벤션 정하기
#### 코딩 컨벤션
- prettier 사용 X
- 들여쓰기 2개
- `reset.css`는 http://meyerweb.com/eric/tools/css/reset/ 사용
- z-index는 10단위로
- class명은 형태 + 의미 + 상태
- [toast-ko_HTMLCSS](https://ui.toast.com/fe-guide/ko_HTMLCSS), [toast-ko_CODING-CONVENTION](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION)을 주로 따름

### 커밋 컨벤션
- [커밋 컨벤션 논의 #3](https://github.com/nurimeansworld/team_market/issues/3)
```
Add: 새로운 기능 추가
Fix: 버그 수정(단순 수정 X)
Docs: 문서 수정
Edit : 코드 포맷팅, 누락된 세미콜론 추가 등의 코드 변경은 없고 단순 style 수정
Refactor: 리팩토링
Test: 테스트 관련 코드 추가 및 삭제 등
```
- createElement vs innerHTML
- button vs a
- js 파일 각 페이지별로 설정하게 된 히스토리?
- (여기 개인적인 이슈나 고민있으셨던 분들 적어주세요~)
