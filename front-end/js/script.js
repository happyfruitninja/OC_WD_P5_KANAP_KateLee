//fetch products and converted to JSON
fetch("http://localhost:3000/api/products/")
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    insertProducts(products);
  });

//create a function that provides a template literal
const sectionElement = document.getElementById("items");
function insertProducts(products) {
  let productCards = "";
  for (let product of products) {
    console.log(product);
    const productElement = document.createElement("article");
    productCards += `
    <a href = "./product.html?id=${product._id}">
    <article>
    <img src= "${product.imageUrl}" alt="${product.altTxt}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    </article>
    </a>`;
  }
  sectionElement.innerHTML = productCards;
}
