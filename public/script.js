let socket = io();

const msgBox = document.getElementById("message");
const username = document.getElementById("username");
const button = document.getElementById("myButton");

function sendInfo(message) {
    socket.emit("messageComing", message);
    msgBox.value = "";
}

button.addEventListener("click", () => {
    if (username.value.trim() !== "" && msgBox.value.trim() !== "") {
        sendInfo({message: msgBox.value, username: username.value});
    }
});

msgBox.addEventListener("keydown", (event) => {
    if(event.key === "Enter" && username.value.trim() !== "" && msgBox.value.trim() !== "") {
        sendInfo({message: msgBox.value, username: username.value});
    }
});

socket.on("messageComing", (value) => {
    const msg = document.createElement("li");
    msg.textContent = value;

    const theList = document.getElementById("allMsgs");
    theList.append(msg)
});