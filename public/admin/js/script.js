//Nút tắt thông báo
const listCloseAlert = document.querySelectorAll("[close-alert]");
if (listCloseAlert) {
  listCloseAlert.forEach(button => {
    button.addEventListener("click", (e) => {
      const messageAlert = document.querySelector("[show-alert]");
      messageAlert.classList.add("alert-hidden");
    })
  })
}
//End nút tắt thông báo

//Set thời gian tắt thông báo
const messageAlert = document.querySelector("[show-alert]");
if (messageAlert) {
  const dataTime = messageAlert.getAttribute("data-time");
  setTimeout(() => {
    messageAlert.classList.add("alert-hidden");
  }, dataTime)
}
//End set thời gian tắt thông báo

//Preview-image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
  if (uploadImageInput) {
    uploadImageInput.addEventListener("change", (e) => {
      const [file] = e.target.files;
      if (file) {
        uploadImagePreview.src = URL.createObjectURL(file);
      }
    })
    const buttonDeleteImage = uploadImage.querySelector("[delete-image]");
    if (buttonDeleteImage) {
      buttonDeleteImage.addEventListener("click", e => {
        e.preventDefault();
        uploadImagePreview.src = "";
      })
    }
  }
}
//End preview-image

//Button delete
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete) {
  buttonsDelete.forEach(button => {
    button.addEventListener("click", e => {
      const check = confirm("Bạn có chắc chắn muốn xóa?");
      if (check) {
        const categoryId = button.getAttribute("data-id");
        fetch(`http://localhost:3000/admin/categories/delete/${categoryId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })

          .then(res => res.json())
          .then(data => {
            if (data.code === 200) {
              alert("Xóa thành công");
              location.reload()
            } else {
              alert("Xóa thất bại");
            }
          })
      }
    })
  })
}
//End button delete

//Button change status
const buttonsChangeStatus = document.querySelectorAll("[data-status]");
if (buttonsChangeStatus) {
  buttonsChangeStatus.forEach(button => {
    button.addEventListener("click", e => {
      const dataStatus = button.getAttribute("data-status");
      const dataId = button.getAttribute("data-id");
      fetch(`http://localhost:3000/admin/categories/change-status?id=${dataId}&status=${dataStatus}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })

        .then(res => res.json())
        .then(data => {
          if (data.code === 200) {
            location.reload()
          }
        })
    })
  })
}
//End button change status

