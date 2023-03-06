//TODO insert cartItem cards into the page using loop (through the cart array). keep in mind each item has productId and I need to fetch to grab product details such as description and name (use fetch API from backend) Similar to milestone 3
//NOTE total quantity and total price (TIP: as you are iterating through -> update the running totals on the page not on localstorage/backend)

fetch("http://localhost:3000/api/products/")
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    insertCart(products);
  });

//connect html to the items in cart
const sectionCartItem = document.getElementById("cart__items");
const cartPrice = document.querySelector(".cart__price");

function insertCart(products) {
  let cartItemCards = "";
  let cart = JSON.parse(window.localStorage.getItem("cart")) || [];
  console.log(cart);
  for (let cartItem of cart) {
    //TODO get the product from product's array for current cartItem.id
    const found = products.find((product) => {
      return product._id === cartItem.productId;
    });
    console.log(found);
    //same as const found = products.find(product => product.productId === cartItem.productId); used where there is one line of code

    const cartArticle = document.createElement("article");
    cartArticle.classList.add("cart__item");
    cartArticle.dataset.id = found._id;
    cartArticle.dataset.color = cartItem.color;

    cartArticle.innerHTML = `
            <div class="cart__item__img">
              <img src="${found.imageUrl}" alt="${found.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${found.name}</h2>
                <p>${cartItem.color}</p>
                <p>€${found.price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Delete</p>
                </div>
              </div>
            </div>        
    `;

    //TODO update total price and total quantity for current cartItem - we need a number to do arithmatic calculation ie) const selectedQuantity = parseInt(quantityElement.value);

    //TODOget the current total off the page + partInt the number string
    //  update the total number on the page with current cartItem quantity
    //  use innerText to inject the updated total number  between the <span></span> + artItem.quantity * found.price
    //  repeat process for price
    // const selectedQuantity = parseInt(.value);
    // const selectedPrice = parseInt(priceElement.value);
    // const totalQuantity = 0;
    // const totalPrice = 0;

    sectionCartItem.appendChild(cartArticle);
  }
}

//TODOadd eventListener
//parseInt -
// .innerText
