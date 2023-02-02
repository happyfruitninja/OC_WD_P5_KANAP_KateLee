//TODO create a function - getElementByID etc to update. use the comments(product.html) in this function

const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

//FIXME - fetch element?
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    insertProduct(product);
  });

function insertProduct(product) {
  const productImage = document.querySelector(".item__img");
  productImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
}

//TODO - connect html to the product details
/*
  const productImage = document.querySelector(".item__img");
 
  productImage.innerHTML = `<img src="${product.imageURL}" alt="${product.altTxt}">`

  const productTitlePrice = document.getElementsByClassName("item__content__titlePrice");
  for(element of elements) {
    let productTitlePrice = "";
    productTitlePrice += `
    <h1>${product.name}</h1>
    <p>Prix: ${product.price}</p>
    `
  }
  

  const productDescription = document.getElementByID("description");
  
  productDescription.innerHTML = '<p>${product.description}</p>';
  */
