//TODO insert cartItem cards into the page using loop (through the cart array). keep in mind each item has productId and I need to fetch to grab product details such as description and name (use fetch API from backend) Similar to milestone 3
//NOTE total quantity and total price (TIP: as you are iterating through -> update the running totals on the page not on localstorage/backend)

const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((data) => {
    return data.json();
  })
  .then((cartItem) => {
    insertCart(cartItem);
  });

//connect html to the items in cart
const sectionCartItem = document.getElementById("cart__items");
const cartPrice = document.querySelector(".cart__price");

function insertCart(cartItems) {
  for (let cart of cartItems) {
    const cartArticle = document.createElement("article");
    cartArticle.classList.add("cart__item");
    let cartItemCards = "";
    //    image
    //get class cart__item__img and and replace the image using placeholder
    const cartImage = document.querySelector(".cart__item__img");
    cartImage.cartImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altText}">`;
    //    description
    //    product name, color and price
    //    product quantity
  }
  sectionCartItem.innerHTML = cartItemCards;
}


const cartImage = document.querySelector("cart__item__img");