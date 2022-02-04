///C01 채팅목록-> C02 채팅방 넘어가기
const ChatList = document.querySelector('.chat-list');

function nextPageChat() {
    window.location.href ="./C02.html";
}

ChatList.onclick = nextPageChat;
