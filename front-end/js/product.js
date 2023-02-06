const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    insertProduct(product);
  });

//TODO - connect html to the product details
function insertProduct(product) {
  //  image
  const productImage = document.querySelector(".item__img");
  productImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

  //  product name and price
  let productTitle = document.getElementById("title");
  productTitle.textContent = product.name;
  let productPrice = document.getElementById("price");
  productPrice.textContent = product.price;

  //  product description
  const productDescription = document.getElementById("description");
  productDescription.textContent = product.description;

  //  product color options
  const productColor = document.getElementById("colors");
  let optionColors = "";
  for (let color of product.colors) {
    optionColors += `
    <option value="${color}">${color}</option>
    `;
    colors.innerHTML = optionColors;
  }
}

/*
//TODO  user selects colors
const colorElement = document.getElementById("colors");
let colorPicked = colorElement.addEventListener("onchange", () => {
  console.log("colorPicked");
});

//https://www.youtube.com/watch?v=RS-t3TC2iUo

//TODO  user selects quantity
let quantity = document.getElementById("quantity");
let quantityPicked = quantity.addEventListener("click", () => {
  //quantity picked is stored here?
});
*/

//TODO eventListener to carry info to Cart page
const cartButton = document.getElementById("addToCart");
cartButton.addEventListener("click", () => {
  //TODO get selected color and quantity
  const colorElement = document.getElementById("colors");
  console.log(colorElement.value);
  const quantityElement = document.getElementById("quantity");
  console.log(quantityElement.value);
  console.log(productId);
//TODO get existing cart from local storage(cart) - use JSON.parse to convert string from local storage to JS object(in this case an array)
//TODO if cart is undefined, set it to an empty array
//TODO if cart already has item with same id and color, just change quantity
//TODO else add new item to cart with selected id, color and quantity
//TODO save cart to local storage - use JSON.stringify to convert object back to string
});
//NOTE change quantity string to number before storing into local storage - contains productId, color and quantity selected
//example - "[]" <-this is json representation of an array
//example - '[{"productId":"9345678", "color":"yellow", "quantity":2}]' <- jason with an object, this will be the result after call cartArray function
//use this function JSON.stringify(cart);