# <span id="top">🍓 딸기마켓</span>
[🔗 배포 URL]()<br>
[🔗 퍼블리싱 문서 리스트](https://nurimeansworld.github.io/strawberry_market/html/index.html)
## 개요
- 🦁 멋쟁이사자처럼 프론트엔드스쿨 1기 팀 프로젝트로 진행한 딸기마켓입니다.
- 🍓 딸기마켓 서비스는 자신의 스토어에서 판매하고 있는 상품(딸기)을 등록하여 홍보할 수 있는 SNS입니다.
- 🙌 상품을 등록하지 않아도 일상을 공유하며 즐거운 SNS 활동을 할 수 있습니다. 글과 사진과 함께 게시물을 작성하여 자신의 일상을 공유할 수 있습니다. 다른 사용자를 팔로우하면 유저가 올린 게시물을 홈 피드에서 소식을 확인할 수도 있습니다.
- 📝 피드를 구경하다가 마음에 드는 게시물을 발견했다면 댓글을 남길 수 있습니다.
## 팀원 구성
- 🙋‍♀️ 박누리 🔗[github/nurimeansworld](https://github.com/nurimeansworld)
- 🙋🏼‍♀️ 최영은 🔗[github/zeroyouth](https://github.com/zeroyouth)
- 🙋🏻‍♀️ 이지아 🔗[github/zeroto99](https://github.com/zeroto99)
- 🙋🏽‍♀️ 한희정 🔗[github/greenknight03](https://github.com/greenknight03)

<details>
<summary>목차</summary>

1. [프로젝트 목표](#goal)
2. [개발 환경 및 배포 URL](#dev)
3. [프로젝트 구조](#tree)
4. [역할 분담](#role)
5. [개발 기간 및 이슈 관리](#task)
6. [UI](#ui)
7. [페이지 기능](#pages)
8. [개발하며 겪은 이슈](#issues)

</details>

***

## <span id="goal">1. 프로젝트 목표</span>
- 개인 판매자가 보다 손쉽게 자신의 상품(딸기)을 판매하는 플랫폼을 제공합니다.
- 현재 판매를 진행하지 않는 잠재 판매자와 고객에게 쉽게 접근 가능한 SNS 플랫폼을 제공합니다.
- 손수 제작한 상품을 등록하여 수익 창출이 가능한 SNS 장터입니다.

<p style="text-align: right"><a href="#top">(Top)</a></p>

## <span id="dev">2. 개발 환경 및 배포 URL</span>
### 개발 환경
- Front : HTML & CSS & Vanilla JS
- Back : 제공된 API 사용
- 버전 관리 및 이슈 : 🔗[GitHub](https://github.com/nurimeansworld/strawberry_market), 🔗[GitHub Issues](https://github.com/nurimeansworld/strawberry_market/issues), 🔗[GitHub Project](https://github.com/nurimeansworld/strawberry_market/projects/1)
- 서비스 배포 환경 : GitHub Pages
### 배포 URL
URL : 🔗 https://nurimeansworld.github.io/strawberry_market/pages

<p style="text-align: right"><a href="#top">(Top)</a></p>

## <span id="tree">3. 프로젝트 구조</span>
- assets/ : 이미지, 파비콘, 아이콘 등
- html/ : 개발용 html 디렉토리
- pages/ : 서비스용 html 디렉토리

```bash
|  README.md
+--.vscode/
+--assets/
+--css/
|    default.css
|    font.css
|    reset.css
|    style.css
|    style_HJ.css
|    style_JA.css
|    style_NR.css
|    style_YE.css
+--font/
+--html/
+--js/
|    accountedit.js
|    chat.js
|    chatroom.js
|    edit.js
|    followers.js
|    followfeed.js
|    followings.js
|    home.js
|    index.js
|    intro.js
|    join.js
|    login.js
|    myprofile.js
|    post.js
|    postdetail.js
|    product.js
|    profile.js
|    script.js
|    search.js
|    useredit.js
\--pages/
     accountedit.html
     chat.html
     chatroom.html
     edit.html
     followers.html
     followfeed.html
     followings.html
     home.html
     index.html
     intro.html
     join.html
     login.html
     myprofile.html
     post.html
     postdetail.html
     postedit.html
     product.html
     profile.html
     search.html
```

<p style="text-align: right"><a href="#top">(Top)</a></p>


## <span id="role">4. 역할 분담</span>
- 하단 이미지와 같이 개인, 공동 작업 페이지로 나누어 진행하였습니다.
- 프로젝트를 진행하며 API 비교적 중요하다 생각되는 로그인, 회원가입 페이지를 공통으로 진행하였습니다.

<img src="https://user-images.githubusercontent.com/92960723/153541899-7a566b69-f9f6-4e34-846c-112ff6dfa35a.png">

### 🙋‍♀️ 박누리
  - 🔗[github/nurimeansworld](https://github.com/nurimeansworld)
  - 프로필 페이지, 팔로잉 페이지, 상품 등록 페이지, 상품 수정 페이지
### 🙋🏼‍♀️ 최영은
  - 🔗[github/zeroyouth](https://github.com/zeroyouth)
  - 홈 피드 페이지, 채팅 페이지
### 🙋🏻‍♀️ 이지아
  - 🔗[github/zeroto99](https://github.com/zeroto99)
  - 게시글 작성 페이지, 게시글 상세 페이지, 검색 페이지
### 🙋🏽‍♀️ 한희정
  - 🔗[github/greenknight03](https://github.com/greenknight03)
  - 모달 페이지, 하단 탭 메뉴 페이지

<p style="text-align: right"><a href="#top">(Top)</a></p>


## <span id="task">5. 개발 기간 및 이슈 관리</span>
- 전체 개발 기간 : 2022-01-03 ~ 2022-02-13
### 이슈 관리

- 🔗[GitHub Projects](https://github.com/nurimeansworld/strawberry_market/projects/1)와 🔗[Issues](https://github.com/nurimeansworld/strawberry_market/issues)를 사용하여 진행도와 상황을 꾸준히 공유하였습니다.
<img src="https://user-images.githubusercontent.com/69141304/153535829-d60fd615-291c-49a2-a52b-86f05893d804.png">

### 주간회의
주간회의를 진행하여 작업 방향이나 코드 고민에 대해 나누었고 GitHub Wiki를 사용하여 기록하였습니다.

- 🔗[220202 회의록](https://github.com/nurimeansworld/strawberry_market/wiki/220202-회의록)
- 🔗[220128 회의록 (딸기마켓 Reboot 🔥)](https://github.com/nurimeansworld/strawberry_market/wiki/220128-%ED%9A%8C%EC%9D%98%EB%A1%9D-(%EB%94%B8%EA%B8%B0%EB%A7%88%EC%BC%93-Reboot-%F0%9F%94%A5))
- 🔗[220114 회의록](https://github.com/nurimeansworld/strawberry_market/wiki/220114-회의록)
- 🔗[220112 회의록](https://github.com/nurimeansworld/strawberry_market/wiki/220112-회의록)
- 🔗[220107 회의록](https://github.com/nurimeansworld/strawberry_market/wiki/220107-회의록)
- 🔗[220103 회의록](https://github.com/nurimeansworld/strawberry_market/wiki/220103-회의록)
- 🔗[211228 회의록](https://github.com/nurimeansworld/strawberry_market/wiki/211228-회의록)

<p style="text-align: right"><a href="#top">(Top)</a></p>

## <span id="ui">6. UI</span>
<img src="https://user-images.githubusercontent.com/69141304/153748670-ddfc60ae-7c66-416b-9a7d-9467f6b40a04.png">

<p style="text-align: right"><a href="#top">(Top)</a></p>

## <span id="pages">7. 페이지 기능</span>
- 상세 기능 설명은 각 페이지별 링크 연결해두었습니다.

### 홈
|   |   |
|:-:|:-:|
|🔗[splash]()|🔗[로그인 페이지]()|
|index.html intro.html <img width="390px;" src="https://user-images.githubusercontent.com/86909942/153747664-ff315846-7e38-4079-8eae-429167206a54.gif"> |login.html <img width="390px;" src="https://user-images.githubusercontent.com/86909942/153747733-5d0fc2c9-a7b5-4662-91a6-41ca7ba268e7.gif">|
|회원가입 페이지|홈 페이지|
|join.html <img width="390px;" src="https://user-images.githubusercontent.com/86909942/153747881-67414426-6365-412f-8dde-479e1fe24eb8.gif">|home.html, followfeed.html <img width="390px;" src="https://user-images.githubusercontent.com/86909942/153747260-e9b4b788-bc6e-4087-8706-362267577f3f.gif">|
|검색 페이지|채팅 페이지|
|searh.html <img width="390px;" src="https://user-images.githubusercontent.com/86909942/153747473-9658f82d-d8b7-4cbd-bcfd-7e7fc726da06.gif">|chat.html, chatlist.html <img width="390px;" src="https://user-images.githubusercontent.com/86909942/153747299-3ad2f035-811c-4d6c-8729-44eec3a28af7.gif">|

## 게시글
|   |   |
|:-:|:-:|
|게시글 작성 페이지|게시물 상세 페이지|
|post.html <img width="390px;" src="https://user-images.githubusercontent.com/86909942/153747294-d2221590-7045-477b-992c-595c20f7d645.gif">|postdetail.html <img width="390px;" src="https://user-images.githubusercontent.com/86909942/153747313-ef897173-eae7-407a-b91b-b5f4580ce135.gif">|
|게시글 수정 or 신고 페이지|댓글 수정 or 신고 페이지|
|postdetail.html <img width="390px;" src="">|postdetail.html <img width="390px;" src="">|

## 프로필
|   |   |
|:-:|:-:|
|마이 프로필 페이지|유저 프로필 페이지|
|myprofile.html <img width="390px;" src="https://user-images.githubusercontent.com/86909942/153747320-3f079fc2-2320-4700-a176-5825c0bfdc55.gif">|profile.html <img width="390px;" src="https://user-images.githubusercontent.com/86909942/153747325-3c89fa25-e70e-460b-9daf-26e625650805.gif">|
|팔로워 페이지|팔로잉 페이지|
|followers.html <img width="390px;" src="https://user-images.githubusercontent.com/86909942/153747331-d4d9375b-581f-4c0f-ba7a-deabf3554b04.gif">|followings.html <img width="390px;" src="https://user-images.githubusercontent.com/86909942/153747337-50aecd0d-89ba-4db2-bd3b-3bfec547e22a.gif">|
|로그아웃 페이지|프로필 수정 페이지|
|myprofile.html <img width="390px;" src="https://user-images.githubusercontent.com/92960723/153748447-97dc681e-fda1-458e-98fb-f15080aff7a3.gif">|accountedit.html <img width="390px;" src="https://user-images.githubusercontent.com/92960723/153748465-7fb6c22a-7ec9-4ca0-96dc-83fbf8028d98.gif">|

## 판매 상품
|   |   |
|:-:|:-:|
|상품 등록 페이지|상품 수정 페이지|
|product.html <img width="390px;" src="https://user-images.githubusercontent.com/92960723/153748485-118b6333-7daa-44a0-ab41-74b5117cab7a.gif">|edit.html <img width="390px;" src="https://user-images.githubusercontent.com/92960723/153748515-593f4d20-3522-4ed9-a898-f98a888c73a0.gif">|
|상품 삭제 페이지|상품 사이트로 이동 페이지|
|edit.html <img width="390px;" src="https://user-images.githubusercontent.com/92960723/153748525-8686cd58-e904-4fee-8525-576af9a60b32.gif">|edit.html <img width="390px;" src="https://user-images.githubusercontent.com/92960723/153748544-c4e968a8-fce7-4e56-ae70-1da32bdcfae7.gif">|

<p style="text-align: right"><a href="#top">(Top)</a></p>

## <span id="issues">8. 개발하며 겪은 이슈</span>
### 1) 코딩 컨벤션, 커밋 컨벤션 정하기
#### 내용
- 협업에 앞서 가독성과 개발 방식 통합을 위해 컨벤션 통일의 필요성에 대해 모두 동의하였습니다.
- 첫 협업에 앞서 다양한 컨벤션 사례와 여러 자료를 서로 찾아보며 공유하였습니다.
- 기존 사례를 무조건 따라가기 보다는 우리에게 더 적합하고 효율적인 규칙에 대해서 고민하는 시간을 가졌습니다.
#### 결론
- 우리만의 코딩 컨벤션, 커밋 컨벤션을 만들었습니다.

  <details>
  <summary>코딩 컨벤션</summary>

  #### 코딩 컨벤션
  - prettier 사용 X
  - 들여쓰기 2개
  - `reset.css`는 http://meyerweb.com/eric/tools/css/reset/ 사용
  - z-index는 10단위로
  - class명은 형태 + 의미 + 상태
  - [toast-ko_HTMLCSS](https://ui.toast.com/fe-guide/ko_HTMLCSS), [toast-ko_CODING-CONVENTION](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION)을 주로 따름

  </details>

  <details>
  <summary>커밋 컨벤션</summary>

  ### 커밋 컨벤션
  ```
  Add: 새로운 기능 추가
  Fix: 버그 수정(단순 수정 X)
  Docs: 문서 수정
  Edit : 코드 포맷팅, 누락된 세미콜론 추가 등의 코드 변경은 없고 단순 style 수정
  Refactor: 리팩토링
  Test: 테스트 관련 코드 추가 및 삭제 등
  ```

  </details>


### 2) createElement vs innerHTML
#### 내용
- API로 받아오는 데이터에따라 동적으로 HTML을 추가해야하는 상황에서 어디까지 createElement를 사용하고 어디까지 innerHTML을 사용 할 것인가에 대한 고민이 있었습니다.
- createElement를 사용하는 것이 브라우저 효율쪽이나 여러모로 innerHTML보다 권장되는 방식이지만, 게시글 하나에 들어가는 태그들의 수가 늘어나며 이 모든 것을 createElement로 작성하는 것에 대한 고민이 생겼습니다.
- 또 innerHTML로 생성한 노드는 querySeletor로 선택하지 못하는 문제도 확인하였습니다.
#### 결론
- 예시로 게시글의 경우 하트 버튼에 이벤트 리스너가 추가되어야하는 상황이라 이벤트를 추가해야하는 노드의 경우는 createElement를 사용하여 생성하였습니다.
- 고정된 HTML구조의 경우는 innerHTML로, 데이터에 따라 값이 바뀌는 경우는 createElement로 생성하는 쪽으로 결정하였습니다.

### 3) button vs a
#### 내용
- 생긴 모양은 button 태그같지만 페이지 이동인지 동작의 수행인지에 따라 a 태그로 사용해야하는 것에 대한 논의를 하였습니다.
#### 결론
- 각 태그의 의미를 고려하여 페이지 이동의 경우에는 a 태그로, 클래스나 데이터가 변경되는 경우에는 button 태그로 사용하기로 결정하였습니다.


<p style="text-align: right"><a href="#top">(Top)</a></p>