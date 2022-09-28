/* BRINING IN DATA FROM BACK-END -> this show the objects in console*/
fetch("http://localhost:3000/api/products/")
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    console.log(products);
  });

console.log("hi");

// ACCESSING PRODUCT INFO
// get section and create product card that contains an article of heading, image, description
// give each element of a product attributes - element.setAttribute('name', 'value')

const section = document.getElementById("items");
const href = "./product.html?id=107fb5b75607497b96722bda5b504926";


const productCard = document.createElement("a");
productCard.setAttribute(
  "href",
  "./product.html?_id="
);

const image = document.createElement("img");
image.setAttribute("src", "../../back-end/images/kanap01.jpeg" );


const article = document.createElement("article");
const h3 = document.createElement("h3");
const p = document.createElement("p");

// METHOD 1 - USING appendChild
// insert all elements of product card in section element
productCard.textContent = "hello hello";
section.appendChild(productCard);
productCard.appendChild(article);
article.append(image, h3, p);


//*****NOTE TO MYSELF - to set up a "const href" I need to be able grab the ID number of each producct and add it to ./prodcut.html?id query - watch tut for for each loop and how to attach variables at the end of an recurring path*****

/*
METHOD 2 - USING element.innerHTML();

section.innerHTML(`
<a href="./product.html?id=a6ec5b49bd164d7fbe10f37b6363f9fb">Hello world
</a>
`);

OR

section.innerHTML = `
<a href="${href}">
<article>
  <img src="${image}" alt="Photo of a pink sofa, three seats">
  <h3 class="productName">Kanap Sinopé</h3>
  <p class="productDescription">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "altTxt": "Photo of a blue sofa, two seats</p>
</article>
</a>`;

*/
