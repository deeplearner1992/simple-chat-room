window.onload = () => {
    initSendMessageForm();
  };
  
  function initSendMessageForm() {
    document.getElementById("send-message").addEventListener("submit", async function (e) {
      e.preventDefault();
      const form = e.target;
  
      const formObject = {};
      formObject.message = form.message.value;
      console.log(formObject);
  
      const resp = await fetch("/message", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formObject),
      });
  
    //   if (resp.status === 200) {
    //     window.location.href = "index.html";
    //   } else {
    //     const data = await resp.json();
    //     alert(data.message);
    //   }
    });
  }


const socket = io.connect()

socket.on('receive',(msg)=>{
    console.log(msg);
    document.getElementById("chatbox").innerHTML += `${msg}<br>`;
});

document.getElementById("demo").addEventListener("click", myFunction);

function myFunction() {
//   document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
  socket.emit("test", "testing");
}