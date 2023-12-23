fetch("http://localhost:3000/cart/list-json", {
  method: "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  body: localStorage.getItem("cart")
})

  .then(res => res.json())

  .then(data => {
    let tours = data.data;
    let text;
    if (tours) {
      //In giao diện
      const listTour = document.querySelector("[list-tour]");
      text = tours.map((tour, index) => {
        return `
          <tr>
            <td>
              ${index + 1}
            </td>
            <td>
              <img src="${tour?.images[0]}", alt=${tour.title} width="80px">
            </td>
            <td>
              <a href="/tours/detail/${tour.slug}">${tour.title}</a> 
            </td>
            <td>${tour.price_special.toLocaleString()}đ</td>
            <td>
              <input
                type="number"
                name="quantity"
                value= ${tour.quantity}
                min="1"
                item-id="${tour.id}"
                style="width:60px"
              >
            </td>
            <td>${tour.total}</td>
            <td>
              <button 
                btn-delete="${tour.id}"
                class="btn btn-sm btn-danger">
                Xóa
              </button>
            </td>
          </tr>   
        `
      })
      listTour.innerHTML = text.join("");

      //Cập nhật tổng tiền
      const total = tours.reduce((calc, item) => {
        return calc + item.total;
      }, 0)
      const totalPrice = document.querySelector("[total-price]");
      totalPrice.innerHTML = total.toLocaleString();
    }
  })