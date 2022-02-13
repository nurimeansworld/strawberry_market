saveBtn = document.querySelector('.save-btn');
prodForm = document.querySelector('.prod-form');
prodImgBtn = document.querySelector('.prod-btn-img');
prodImg = document.querySelector('#prodBtnImg');
prodImgHidden = document.querySelector('#prodImgHidden');
prodName = document.querySelector('.prod-name-input');
prodPrice = document.querySelector('.prod-price-input');
prodLink = document.querySelector('.prod-link-input');

// 버튼 클릭시 이미지 input 버튼 클릭
prodImgBtn.addEventListener('click', function (e) {
  prodImg.click();
});

// 이미지 배경 설정 background image url render function
let readURL = function (input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      document.querySelector('.prod-img-wrap').style.background = `url(${e.target.result}) center center / cover`;
      prodImgHidden.value = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
  }
}
prodImg.addEventListener('change', function (e) {
  readURL(this);
});

// 모든 input 입력되면 저장 버튼 활성화
prodForm.addEventListener('input', function (e) {
  if ((prodImg.value !== '') && (prodName.value !== '') && (prodPrice.value !== '') && (prodLink.value !== '')) {
    saveBtn.disabled = false;
  } else {
    saveBtn.disabled = true;
  }
});

// 상품 이름 2~15자 유효성 검사
prodName.addEventListener('input', function (e) {
  const messageError = document.querySelector('.prod-message-error.prodname');
  if (e.target.value.length > 15 || e.target.value.length < 2) {
    messageError.style.display = 'block';
  } else {
    messageError.style.display = 'none';
  }
});

// 상품 가격 숫자만, 자동 원화단위
prodPrice.addEventListener('input', function (e) {
  const messageError = document.querySelector('.prod-message-error.prodprice');
  let originNum = e.target.value.replace(/,/gi, "");

  // 숫자가 아닐 경우
  if (isNaN(originNum)) {
    messageError.style.display = 'block';
  } else {
    messageError.style.display = 'none';
    // 자동 원화단위
    e.target.value = originNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
});

async function reqProdData() {
  const url = 'http://146.56.183.55:5050';
  const token = localStorage.getItem('Token');
  const originNum = parseInt(prodPrice.value.replace(/,/gi, ""));
  const prodData = {
    "product": {
      "itemName": prodName.value,
      "price": originNum,
      "link": prodLink.value,
      "itemImage": prodImgHidden.value
    }
  }
  const init = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(prodData)
  }

  try {
    const resProdData = await fetch(`${url}/product`, init);
    const resProdDataJson = await resProdData.json();

    if (resProdDataJson.status != 422) {
      // img 용량
      if(resProdDataJson.type == 'entity.too.large'){
        console.error(resProdDataJson.message);
        alert('이미지 용량이 너무 큽니다.');
      }else{
        location.href = "./myprofile.html"
      }
    } else {
      console.error(resProdDataJson);
    }
  } catch (err) {
    console.error(err);
  }
}
saveBtn.addEventListener('click', reqProdData);