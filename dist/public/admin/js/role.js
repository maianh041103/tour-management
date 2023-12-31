//Update view permission
const updateViewPermission = () => {
  let dataPermissions = document.querySelector("[data-permission]").getAttribute("data-permission");
  dataPermissions = JSON.parse(dataPermissions);
  dataPermissions.forEach((item, index) => {
    let permissions = item.permissions || `[]`;
    permissions = JSON.parse(permissions);
    permissions.forEach(permission => {
      const inputRow = document.querySelector(`[data-name=${permission}]`);
      inputCol = inputRow.querySelectorAll("input")[index];
      inputCol.checked = true;
    })
  });
}
updateViewPermission();

const formChangePermissions = document.querySelector("[form-change-permissions]");
if (formChangePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", (e) => {
    const tablePermissions = document.querySelector("[table-permissions]");
    const listRowData = tablePermissions.querySelectorAll("[data-name]");
    let result = [];
    listRowData.forEach((row, index) => {
      if (row.getAttribute("data-name") == "id") {
        const ids = row.querySelectorAll(['input']);
        ids.forEach(id => {
          result.push({
            id: id.value,
            permissions: []
          })
        })
      } else {
        const dataPermissions = row.querySelectorAll(['input']);
        dataPermissions.forEach((item, index) => {
          if (item.checked == true) {
            const role = row.getAttribute("data-name");
            result[index].permissions.push(role);
          }
        })
      }
    })

    //Gửi data cho BE
    fetch("http://localhost:3000/admin/roles/permissions", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result)
    })

      .then(res => res.json())
      .then(data => {
        if (data.code === 200) {
          updateViewPermission();
          window.location.reload();
          alert("Cập nhật quyền thành công");
        } else {
          alert("Cập nhật quyền thất bại");
        }
      })
  })
} 