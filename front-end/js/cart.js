// fetch all product objects
fetch("http://localhost:3000/api/products/")
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    insertCart(products);
  });

//connect html to the items in cart
const sectionCartItem = document.getElementById("cart__items");
//insert cartItem cards into the page using loop (through the cart array).
function insertCart(products) {
  let cartItemCards = "";
  let cart = JSON.parse(window.localStorage.getItem("cart")) || [];
  console.log(cart);
  for (let cartItem of cart) {
    //get the product from product's array for current cartItem.id
    const found = products.find((product) => {
      return product._id === cartItem.productId;
    });
    console.log(found);
    const cartArticle = document.createElement("article");
    cartArticle.classList.add("cart__item");
    cartArticle.dataset.id = found._id;
    cartArticle.dataset.color = cartItem.color;
    //create a template literal of cart item article
    cartArticle.innerHTML = `
            <div class="cart__item__img">
              <img src="${found.imageUrl}" alt="${found.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${found.name}</h2>
                <p>${cartItem.color}</p>
                <p>€${found.price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Delete</p>
                </div>
              </div>
            </div>        
    `;

    //add a change eventListener to the input field for quantity
    let itemQuantity = cartArticle.querySelector(".itemQuantity");
    itemQuantity.addEventListener("change", ($event) => {
      let cart = JSON.parse(window.localStorage.getItem("cart")) || [];
      const clickedElement = $event.target;
      const newQuantity = parseInt(clickedElement.value);

      //need to get dataset.color from closest article and ask to getCartItem
      const productId = clickedElement.closest("article").dataset.id;
      const productColor = clickedElement.closest("article").dataset.color;
      const matchingItem = getCartItem(cart, productId, productColor);

      //delete from localStorage after getCartItem
      const cartItemToChange = getCartItem(cart, productId, productColor);
      console.log(newQuantity);
      const changedQuantity = newQuantity - cartItemToChange.quantity;

      //use the same format for delete eventlistner
      updateTotalQuantity(changedQuantity);
      cartItemToChange.quantity = newQuantity;

      //update the total price
      updateTotalPrice(changedQuantity, found.price);
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    //add a click eventListener to delete <p> tag
    const deleteItem = cartArticle.querySelector(".deleteItem");
    deleteItem.addEventListener("click", ($event) => {
      let cart = JSON.parse(window.localStorage.getItem("cart")) || [];
      //remove item from browser
      const deleteLink = $event.target;
      const elementToDelete = deleteLink.closest("article");
      elementToDelete.remove();

      //remove item from local storage
      const dataId = elementToDelete.dataset.id;
      const dataColor = elementToDelete.dataset.color;
      console.log(`dataID = ${dataId}, dataColor = ${dataColor}`);
      let quantityDeleted;
      const filtered = cart.filter((cartItem) => {
        let canKeep;
        if (cartItem.productId === dataId && cartItem.color === dataColor) {
          quantityDeleted = cartItem.quantity;
          canKeep = false;
        } else {
          canKeep = true;
        }
        return canKeep;
      });
      console.log(filtered);
      localStorage.setItem("cart", JSON.stringify(filtered));

      //update totals using the functions already present
      updateTotalQuantity(-quantityDeleted);

      //update total price when an item is deleted
      updateTotalPrice(quantityDeleted, -found.price);
    });

    sectionCartItem.appendChild(cartArticle);

    updateTotalQuantity(cartItem.quantity);
    updateTotalPrice(cartItem.quantity, found.price);
  }
}

//function to get products that match 3 properties of cartItems against the properties of objects
function getCartItem(cart, productId, productColor) {
  console.log(productId);
  console.log(productColor);
  console.log(cart);
  const found = cart.find((cartItem) => {
    return cartItem.productId === productId && cartItem.color === productColor;
  });
  return found;
}

//funtion to update total quantity
//NOTE total quantity and total price -> update the running totals on the page not on localstorage/backend
function updateTotalQuantity(quantity) {
  let currentQuantity =
    parseInt(document.getElementById("totalQuantity").innerText) || 0;
  currentQuantity += quantity;

  totalQuantity.innerText = currentQuantity;
  console.log(totalQuantity);
}

//function to update total price
function updateTotalPrice(quantity, price) {
  let currentPrice =
    parseInt(document.getElementById("totalPrice").innerText) || 0;

  currentPrice += price * quantity;
  totalPrice.innerText = currentPrice;
  console.log(currentPrice);
}

//set up validation conditions for each user input field
const expName = /^[a-zA-Z\s_-]+$/;
const expEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const expAdd = /^[a-zA-Z0-9\s,.'_-]+$/;
const firstName = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameErrorMsg");
const lastName = document.getElementById("lastName");
const lastNameError = document.getElementById("lastNameErrorMsg");
const address = document.getElementById("address");
const addressError = document.getElementById("addressErrorMsg");
const city = document.getElementById("city");
const cityError = document.getElementById("cityErrorMsg");
const email = document.getElementById("email");
const emailError = document.getElementById("emailErrorMsg");

//create a reusable help functions to reduce repeating codes
function addEventListenerForContactInfoField(inputElement, messageElement, message, regEx){
  inputElement.addEventListener("change", ($event) => {
    const contactInfoValue = $event.target.value;
    messageElement.innerHTML="";
    //test user input against regex for firstname
    if(regEx.test(contactInfoValue)){
      inputElement.value = contactInfoValue;
      //if test failed - send errorMsg
    } else {
      messageElement.innerHTML= message;
    }
  });
}
addEventListenerForContactInfoField(firstName, firstNameError, "Please enter valid first name!", expName);
addEventListenerForContactInfoField(lastName, lastNameError, "Please enter valid last name1", expName);
addEventListenerForContactInfoField(address, addressError, "Please enter valid address!", expAdd);
addEventListenerForContactInfoField(city, cityError, "Please enter valid city!", expName);
addEventListenerForContactInfoField(email, emailError, "Please enter valid email!", expEmail);

//validate order form
document.getElementById("order").addEventListener("click", ($event) => {
  $event.preventDefault();
  if (validateFields()) {
    // get productIds from local storage using the array map
    const cart = JSON.parse(localStorage.getItem("cart"));
    const productIds = cart.map((cartItem) => {
      // finish this but rename variable to "products" which will hold an array of product ids
      return cartItem.productId;
    });

    //products is an array of product ids from the user's cart stored in local storage and you can use the "product" array created above
    const order = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: productIds,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };

    //fetch orderId and redirect user to confirmation page
    fetch("http://localhost:3000/api/products/order", options)
      .then((data) => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
      })
      .then((result) => {
        console.log(result.orderId);

        //clear out cart in localStorage
        localStorage.clear();

        //redirect to the confirmation page sending the orderId in the Url
        location.assign(`./confirmation.html?id=${result.orderId}`);
      });
  }
});

//function to validate all user inputs once user fills out all input fields
function validateFields() {
  const validated = true;
  if (!expName.test(firstName.value)) {
    firstNameError.innerHTML = "Please enter valid firstName";
    validated = false;
  }
  if (!expName.test(lastName.value)) {
    lastNameError.innerHTML = "Please enter valid lastName";
    validated = false;
  }
  if (!expAdd.test(address.value)) {
    addressError.innerHTML = "Please enter valid address";
    validated = false;
  }
  if (!expAdd.test(city.value)) {
    cityError.innerHTML = "Please enter valid city";
    validated = false;
  }
  if (!expEmail.test(email.value)) {
    emailError.innerHTML = "Please enter valid email";
    validated = false;
  }
  return validated;
}
