//TODO get the product id from the url parameters (milestone 5 resource)
//TODO use fetch API to get the product info for the product id -> copy the id number and add it to the url address at the end.  
//TODO create a function - getElementByID etc to update. use the comments(product.html) in this function

const url = "http://localhost:5500/front-end/html/product.html/product.html";
let paramId = "";
let queryString = new URLSearchParams(paramsId);

for (let param of searchParams) {
    console.log(paramId);
}

//FIXME - fetch element?
fetch("http://localhost:3000/api/products/")
  .then((data) => {
    return data.json();
  })
  .then((paramId) => {
    insertProducts(paramId);
  });

  url${paramId}


  TODO - connect html to the product details
  const productImage= document.getElementByClassName("item_image");
  productImage.innerHTML = `<img src="${product.imageURL}" alt="${product.altTxt}">`

  const productTitlePrice = document.getElementByClassName("item__content__titlePrice");
  for(element of elements) {
    let productTitlePrice = "";
    productTitlePrice += `
    <h1>${product.name}</h1>
    <p>Prix: ${product.price}</p>
    `
  }
  

  const productDescription = document.getElementByID("description");
  productDescription.innerHTML = '<p>${product.description}</p>';