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
    console.log(color);
    optionColors += `
    <option value="${color}">${color}</option>
    `;
    colors.innerHTML = optionColors;
  }
}
