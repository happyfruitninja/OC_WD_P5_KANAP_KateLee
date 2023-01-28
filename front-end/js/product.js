//TODO get the product id from the url parameters (milestone 5 resource)
//TODO use fetch API to get the product info for the product id -> copy the id number and add it to the url address at the end.  
//TODO create a function - getElementByID etc to update. use the comments(product.html) in this function

const url = "http://localhost:5500/front-end/html/product.html/product.html";
let paramId = "";
let queryString = new URLSearchParams(paramsId);

for (let param of searchParams) {
    console.log(paramId);
}

fetch("http://localhost:3000/api/products/")
  .then((data) => {
    return data.json();
  })
  .then((paramId) => {
    insertProducts(paramId);
  });

  url${paramId}

  function getElementByID