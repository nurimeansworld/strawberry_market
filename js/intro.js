// 로그인하여 localStorage에 값이 있는 경우 해당 페이지 접근 불가
function checkLogin() {
  if (localStorage.getItem("Token")) {
    location.href = "./home.html";
  }
}
checkLogin();