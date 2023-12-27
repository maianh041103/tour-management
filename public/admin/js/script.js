const listCloseAlert = document.querySelectorAll("[close-alert]");
if (listCloseAlert) {
  listCloseAlert.forEach(button => {
    button.addEventListener("click", (e) => {
      const messageAlert = document.querySelector("[show-alert]");
      messageAlert.classList.add("alert-hidden");
    })
  })
}

const messageAlert = document.querySelector("[show-alert]");
if (messageAlert) {
  const dataTime = messageAlert.getAttribute("data-time");
  setTimeout(() => {
    messageAlert.classList.add("alert-hidden");
  }, dataTime)
}