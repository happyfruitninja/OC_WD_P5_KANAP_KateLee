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
  const productTitlePrice = document.querySelector("item__content__titlePrice");
  let productTitle = "";
  let productPrice = "";

  //  product description
  const productDescription = document.getElementById("description");
  productDescription.textContent = "${product.description}";

  //  product color options
  const productColor = document.getElementById("colors");
  let colorOptions = [];
  for (let color of colors) {
    console.log(color);
  }
  colorOptions.innerHTML += `<option value="${product.colors[color]}">${product.colors[color]}</option>`;
}
