const socket = io();

const formInput = document.querySelector("form label input[type='text']");
const submitBtn = document.querySelector(".send-button");
const msgDump = document.querySelector("#message-dump");



function renderMessage(message, sender) {
    const div = document.createElement('div');
    const span = document.createElement('span');
    if (sender === 'user') {
        div.className = "user-message-container";
        span.innerText = message;


        div.appendChild(span);
        msgDump.appendChild(div);
        // div.classList.remove("user-message-container");
    } else if (sender === 'server') {
        div.className = "other-message-container";
        span.innerText = message;

        div.appendChild(span);
        msgDump.appendChild(div);
        // break;
    }
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevents the refresh of page due to using button
    const message = formInput.value; // Taking the value of the input field of the form

    console.log(socket);
    renderMessage(message, 'user');
    socket.emit('send', message);


    formInput.value = "";
});

socket.on("server-message", (dataFromServer) => {
    renderMessage(dataFromServer, 'server');
});