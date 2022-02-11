// chat 모달----------------------------------------------------------
const open3 = () => {
    document.querySelector(".modal3").classList.remove("hidden");
}
const close3 = () => {
    document.querySelector(".modal3").classList.add("hidden");
}

document.querySelector(".hidden-menu").addEventListener("click", close3);
document.querySelector(".chat-menu").addEventListener("click", open3);

const btn3 = document.querySelector('.delete-post');
const pop3 = document.querySelector('.dimm');
const out3 = document.querySelector('.cancle-btn');

btn3.addEventListener('click', viewOption);
out3.addEventListener('click', cancleOption);

function viewOption() {
    console.log(pop3);
    pop3.style.display = 'block';
}
function cancleOption() {
    pop3.style.display = 'none';
}