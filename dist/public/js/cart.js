//Bắt sự kiện cho nút xóa
const addEventButtonDel = () => {
  const listBtnDel = document.querySelectorAll("[btn-delete]");
  listBtnDel.forEach(item => {
    item.addEventListener("click", (e) => {
      const tourId = item.getAttribute("btn-delete");
      const cart = JSON.parse(localStorage.getItem("cart"));
      const newCart = cart.filter(item => {
        return item.tourId != tourId
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      draw();
    })
  })
}

//Cập nhật số lượng trên mini cart
const updateQuantityInMiniCart = () => {
  const miniCart = document.querySelector("[mini-cart]");
  const cart = JSON.parse(localStorage.getItem("cart"));
  const quantity = cart.reduce((calc, item, index) => {
    return calc + item.quantity;
  }, 0)
  miniCart.innerHTML = `(${quantity})`;
}

//Sửa số lượng trong giỏ hàng
const updateQuantityInput = () => {
  const inputQuantity = document.querySelectorAll("[item-id]");
  inputQuantity.forEach(item => {
    item.addEventListener("change", e => {
      const tourId = item.getAttribute("item-id");
      const quantity = parseInt(item.value);
      let cart = JSON.parse(localStorage.getItem("cart"));
      const index = cart.findIndex(item => {
        return item.tourId == tourId;
      })
      cart[index]["quantity"] = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      draw();
    })
  })
}

//Vẽ lại giao diện
const draw = () => {
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

        addEventButtonDel();
        updateQuantityInMiniCart();
        updateQuantityInput();
      }
    })
}

draw();

//Đặt hàng
const formOrder = document.querySelector("[form-order]");
if (formOrder) {
  formOrder.addEventListener("submit", e => {
    e.preventDefault();
    const fullName = e.target.elements.fullName.value;
    const phone = e.target.elements.phone.value;
    const note = e.target.elements.note.value;

    const cart = JSON.parse(localStorage.getItem("cart"));

    const data = {
      info: {
        fullName: fullName,
        phone: phone,
        note: note
      },
      cart: cart
    }

    fetch("http://localhost:3000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })

      .then(res => res.json())
      .then(data => {
        if (data.code === 200) {
          localStorage.removeItem("cart");
          window.location.href = `/order/success?orderCode=${data.orderCode}`;
        } else {
          alert("Đặt hàng thất bại");
        }
      })
  })
}
//End đặt hàng