var imagesThumb = new Swiper(".imagesThumb", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
});

var imagesMain = new Swiper(".imagesMain", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: imagesThumb
  },
});

//Hiện thông báo
const showAlert = () => {
  const alertAddCartSuccess = document.querySelector("[alert-add-cart-success]");
  if (alertAddCartSuccess) {
    alertAddCartSuccess.classList.remove("alert-hidden");
  }
  setTimeout(() => {
    alertAddCartSuccess.classList.add("alert-hidden");
  }, 3000)

  const closeAlert = document.querySelector("[close-alert]");
  closeAlert.addEventListener("click", (e) => {
    alertAddCartSuccess.classList.add("alert-hidden");
  })
}
//End hiện thông báo

//Kiem tra co gio hang chua
const cart = localStorage.getItem("cart");
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}

//Thêm tour vào giỏ hàng
const formAddTourToCart = document.querySelector("[form-add-to-cart]");
if (formAddTourToCart) {
  formAddTourToCart.addEventListener("submit", (e) => {
    e.preventDefault();
    const tourId = parseInt(formAddTourToCart.getAttribute("tour-id"));
    const quantity = parseInt(e.target.elements.quantity.value);

    if (quantity > 0 && tourId) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      const index = cart.findIndex(item => item.tourId === tourId);
      if (index !== -1) {
        cart[index]["quantity"] += quantity;
      }
      else {
        cart.push({
          tourId: tourId,
          quantity: quantity
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      showAlert();
    }
  })
}
//End thêm tour vào giỏ hàng