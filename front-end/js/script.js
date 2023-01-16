//BRINING IN DATA FROM BACK-END -> this shows the objects in console

fetch("http://localhost:3000/api/products/")
  .then((data) => {
    return data.json();
  })
  .then((products) => {
     console.log(products);
  });

console.log("hi");
const productCards = document.getElementById("items");
console.log(productCards);

// ACCESSING PRODUCT INFO
//TODO: wrap all of the code below into a function called "insertProducts(products)"
function insertProducts(products) {
  //TODO: declare productCards variable and set initially to empty string const (ex.productCards = "")
  const productCard = ""; //KATE what is this and why do I need this?
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(product); //KATE console won't show populated the loop. it shows a flash but disappears

    //TODO: declare a variable that is going to be a string for the commented out html in index page // KATE I don't understand this, "a string"?

    const productElement = document.createElement('article');
    
    //  NOTE: use template string - check out the link from Scott (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
    //  NOTE: add expression${} for each part of html that changes from product to product - dot notation ex. product.name =

    //TODO: append the current productsCards productCards =+ productCard
    productCards.append(productCard);
    productCard.append(article);

    //TODO: set innerHTML section element to productCards string (ex.section.innerHTML = productCards)

    productCards.innerHTML = `
    <a href = "./product.html?id=${product._id}"></a>
    <img src= "../../back-end/images/${product.imageUrl}" alt="${product.altTxt}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
     `;
  }
}

/*
// METHOD 1 - USING appendChild //this method is more secure but slower than using element.innterHTML();
// insert all elements of product card in section element
productCard.textContent = "product card";
article.textContent = "article";

section.appendChild(productCard);
productCard.appendChild(article);
article.append(image, h3, p);

productCard.setAttribute("href", "./product.html?id=${href}");
image.setAttribute("src", "../../back-end/images/${image}");
h3.setAttribute("class", "productName");
p.setAttribute("class", "productDescription");
*/
