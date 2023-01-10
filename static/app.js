const socket = io();

const formInput = document.querySelector("form label input[type='text']");
const submitBtn = document.querySelector(".send-button");
const msgDump = document.querySelector("#message-dump");
const username = prompt("Please enter username:", "");

function joinedNotice(user, who = 'oneself') {
    const div = document.createElement("div");
    div.className = 'joined';

    const span = document.createElement("span");
    switch (who) {
        case 'others':
            span.innerText = `Someone joined as "${user}"`;
            break;
        case 'oneself':
            span.innerText = `You have joined as "${user}"`;
            socket.emit('set-user', user);
            break;
    }

    div.appendChild(span);
    msgDump.appendChild(div);
}

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

    // console.log(socket);
    renderMessage(message, 'user');
    socket.emit('send', message);


    formInput.value = "";
});

socket.on("server-message", (dataFromServer) => {
    renderMessage(dataFromServer, 'server');
});

socket.on('user-set', (userData) => {
    joinedNotice(userData, 'others');
});

joinedNotice(username);