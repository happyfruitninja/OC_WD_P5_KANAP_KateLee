const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

//fetch productId of selected item
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    insertProduct(product);
  });

// use productId to find product details and to connect to html
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

// eventListener to carry info to Cart page
const cartButton = document.getElementById("addToCart");
cartButton.addEventListener("click", () => {
  //get selected color and quantity
  const colorElement = document.getElementById("colors");
  console.log(colorElement.value);
  const selectedColor = colorElement.value;
  const quantityElement = document.getElementById("quantity");
  const selectedQuantity = parseInt(quantityElement.value);
  console.log(quantityElement.value);
  console.log(productId);

  //retrieve cart from local storage
  //if cart is undefined, set it to an empty array
  let cart = JSON.parse(window.localStorage.getItem("cart")) || [];
  console.log(cart);

  const found = cart.find((element) => {
    return element.color === selectedColor && element.productId === productId;
  });
  console.log(found);
  if (found) {
    // if cart already has item with same id and color, just change quantity using JS. quantity only adds - changing(adding or subtracting quantity) happens in cart page
    found.quantity += selectedQuantity;
  } else {
    //else add new item to cart with selected id, color and quantity
    cart.push({
      productId: productId,
      color: selectedColor,
      quantity: selectedQuantity,
    });
    console.log(cart);
  }

  // setItem triggers data to be stored in localStorage
  window.localStorage.setItem("cart", JSON.stringify(cart));
  alert("cart item added successfully");
});