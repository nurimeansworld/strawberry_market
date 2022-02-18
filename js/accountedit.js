const saveBtn = document.querySelector('.save-btn');
const imgUploadBtn = document.querySelector('.profile-btn-upload');
const editForm = document.querySelector('.profile-edit-form');
const editImgHidden = document.querySelector('#editImgHidden');
const editImg = document.querySelector('#editImg');
const editName = document.querySelector('.edit-name-input');
const editId = document.querySelector('.edit-id-input');
const editIntro = document.querySelector('.edit-intro-input');

// 버튼 클릭시 이미지 input 버튼 클릭
imgUploadBtn.addEventListener('click', function (e) {
  editImg.click();
});

// 이미지 배경 설정 background image url render function
let readURL = function (input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      document.querySelector('.profile-edit-wrap').style.background = `url(${e.target.result}) center center / cover`;
      editImgHidden.value = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
  }
}
editImg.addEventListener('change', function (e) {
  readURL(this);
});

// 사용자 이름 유효성 검사
editName.addEventListener('input', function (e) {
  const messageError = document.querySelector('.edit-message-error.name');
  if (e.target.value.length == 11 || e.target.value.length < 2) {
    saveBtn.disabled = true;
    messageError.style.display = 'block';
  } else {
    saveBtn.disabled = false;
    messageError.style.display = 'none';
  }
});

// 계정 ID 유효성 검사
editId.addEventListener('input', function (e) {
  const messageErrorId = document.querySelector('.edit-message-error.id');
  const messageErrorIdExist = document.querySelector('.edit-message-error.id-exist');
  const regExp = new RegExp('^[a-z0-9._]*$');

  messageErrorIdExist.style.display = 'none';
  if (e.target.value === '' || !regExp.test(e.target.value)) {
    messageErrorId.style.display = 'block';
    saveBtn.disabled = true;
  } else {
    messageErrorId.style.display = 'none';
    saveBtn.disabled = false;
  }
});

// 소개 길이 유효성 검사
editIntro.addEventListener('input', function (e) {
  const messageError = document.querySelector('.edit-message-error.intro');
  if (e.target.value.length == 50) {
    messageError.style.display = 'block';
    saveBtn.disabled = true;
  } else {
    messageError.style.display = 'none';
    saveBtn.disabled = false;
  }
});

// 4. 계정 중복 관련 별도의 API
async function checkAccountnamevalid() {
  const url = 'http://146.56.183.55:5050';
  const userData = {
    'user': {
      'accountname': editId.value,
    }
  };
  const init = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(userData),
  };

  try {
    const accountName = localStorage.getItem('accountname');
    const resCheckAccount = await fetch(`${url}/user/accountnamevalid`, init);
    const resCheckAccountJson = await resCheckAccount.json();

    if ((accountName !== editId.value) && (resCheckAccountJson.message === '이미 가입된 계정ID 입니다.')) {
      const messageError = document.querySelector('.edit-message-error.id-exist');
      messageError.style.display = 'block';
      saveBtn.disabled = true;
    }
  } catch (err) {
    location.href="./404.html";
    console.error(err);
  }
}
editId.addEventListener('input', checkAccountnamevalid);

// 3. 입력된 정보로 프로필 수정 req
async function reqEditProfile() {
  const url = 'http://146.56.183.55:5050';
  const accountName = checkAccountName();
  const token = localStorage.getItem('Token');
  const userData = {
    'user': {
      'username': editName.value,
      'accountname': editId.value,
      'intro': editIntro.value,
      'image': editImgHidden.value
    }
  };
  const init = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(userData),
  };

  try {
    const resEditProfile = await fetch(`${url}/user`, init);
    const resEditProfileJson = await resEditProfile.json();

    if (resEditProfileJson.status != 422) {
      localStorage.setItem("accountname", editId.value);
      location.href = "./myprofile.html"
    }
  } catch (err) {
    location.href="./404.html";
    console.error(err);
  }
}
saveBtn.addEventListener('click', reqEditProfile);

// 2. 마이 프로필 정보 뿌려주기
function setEditUserProfile(editUserProfile) {
  document.querySelector('.profile-edit-wrap').style.background = `url(${editUserProfile.image}) no-repeat center / 110px`;

  document.querySelector('#editImgHidden').value = editUserProfile.image;
  document.querySelector('#editName').value = editUserProfile.username;
  document.querySelector('#editId').value = editUserProfile.accountname;
  document.querySelector('#editIntro').value = editUserProfile.intro;
}

// 1. 로그인한 마이 프로필 정보 받아오기
async function getEditUserProfile() {
  const url = 'http://146.56.183.55:5050';
  const accountName = checkAccountName();
  const token = localStorage.getItem('Token');
  const init = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token} `,
      'Content-type': 'application/json'
    },
  }

  try {
    const resEditUserProfile = await fetch(`${url}/profile/${accountName}`, init);
    const resEditUserProfileJson = await resEditUserProfile.json();
    const editUserProfile = resEditUserProfileJson.profile;

    setEditUserProfile(editUserProfile);
  } catch (err) {
    location.href="./404.html";
    console.error(err);
  }
}

getEditUserProfile();
