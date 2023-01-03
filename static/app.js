const socket = io();

const formValue = document.querySelector("form label input[type='text']").value;
const submitBtn = document.querySelector(".send-button");


submitBtn.addEventListener('click', (e) => {
    socket.emit('send', formValue);
});