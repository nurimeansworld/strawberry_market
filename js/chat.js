//C01 채팅목록-> C02 채팅방 넘어가기-------------------
const chatList = document.querySelector('.chat-list');

function nextPageChat() {
    window.location.href = "./chatroom.html";
}

chatList.addEventListener('click', nextPageChat);

