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

    const cartArticle = document.createElement("article");
    cartArticle.classList.add("cart__item");
    cartArticle.dataset.id = found._id;
    cartArticle.dataset.color = cartItem.color;

    //same as const ie) found = products.find(product => product.productId === cartItem.productId); used where there is one line of code

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

    sectionCartItem.appendChild(cartArticle);

    // TODO update total price and total quantity for current cartItem - we need a number to do arithmatic calculation ie) const selectedQuantity = parseInt(quantityElement.value);

    //  convert string quantity in cartItem into number
    //TODOget the current total off the page + partInt the number string
    //  update the total number on the page with current cartItem quantity
    //get span element with #totalQuantity

    let currentQuantity =
      parseInt(document.getElementById("totalQuantity").innerText) || "";

    currentQuantity = currentQuantity + cartItem.quantity;

    totalQuantity.innerText = currentQuantity;
    console.log(totalQuantity);

    //  use innerText to inject the updated total number between the <span></span> + cartItem.quantity * found.price
    //  repeat process for price

    let price = parseInt(document.getElementById("totalPrice").innerText) || "";
    price += found.price;

    const currentPrice = currentQuantity * price;
    totalPrice.innerText = currentPrice;
    //FIXME TODO currently it's adding the ([0] * totalQuantity * found.price) + ([1] * totalQuantity * found.price)
    // TODO for loop ? to go through each items and get total price for each item and then totalPrice needs to show the total of all totalPrice
    console.log(totalPrice);

    //TODOadd eventListener
    //parseInt -
    // .innerText
  }
}
