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
    //   const found = cart.find((element) => {
    //  return element.color === selectedColor && element.productId productId;
  // }); 
    const cartArticle = document.createElement("article");
    cartArticle.classList.add("cart__item");
     //TODO enter expression using ${}
    cartItemCards += `
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
              <img src="../images/product01.jpg" alt="Photo of a sofa">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>Name of the product</h2>
                <p>Green</p>
                <p>€42.00</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Delete</p>
                </div>
              </div>
            </div>
          </article>
    `;
    
    //TODO update total price and total quantity for current cartItem - we need a number to do arithmatic calculation ie) const selectedQuantity = parseInt(quantityElement.value);
  }
  sectionCartItem.innerHTML = cartItemCards;
}
