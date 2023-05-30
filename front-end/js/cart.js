//insert cartItem cards into the page using loop (through the cart array). keep in mind each item has productId and I need to fetch to grab product details such as description and name (use fetch API from backend) Similar to milestone 3
//NOTE total quantity and total price (TIP: as you are iterating through -> update the running totals on the page not on localstorage/backend)

fetch("http://localhost:3000/api/products/")
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    insertCart(products);
  });

//connect html to the items in cart
const sectionCartItem = document.getElementById("cart__items");
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

      //FIXME need to get dataset.color from closest article and ask to getCartItem. Do this first and then delete item
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

      //update the total price - create updateTotalPrice function same as we create totalQuantity (highlight -> refactor -> global)
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

      //FIXME update total price when an item is deleted

      updateTotalPrice(quantityDeleted, -found.price);
    });

    sectionCartItem.appendChild(cartArticle);

    //update total price and total quantity for current cartItem - we need a number to do arithmatic calculation ie) const selectedQuantity = parseInt(quantityElement.value);

    //  convert string quantity in cartItem into number
    // get the current total off the page + partInt the number string
    //  update the total number on the page with current cartItem quantity
    //get span element with #totalQuantity
    updateTotalQuantity(cartItem.quantity);
    updateTotalPrice(cartItem.quantity, found.price);
  }
}

function getCartItem(cart, productId, productColor) {
  console.log(productId);
  console.log(productColor);
  console.log(cart);
  const found = cart.find((cartItem) => {
    return cartItem.productId === productId && cartItem.color === productColor;
  });
  return found;
}

function updateTotalQuantity(quantity) {
  let currentQuantity =
    parseInt(document.getElementById("totalQuantity").innerText) || 0;
  currentQuantity += quantity;

  totalQuantity.innerText = currentQuantity;
  console.log(totalQuantity);
}

function updateTotalPrice(quantity, price) {
  let currentPrice =
    parseInt(document.getElementById("totalPrice").innerText) || 0;

  currentPrice += price * quantity;
  totalPrice.innerText = currentPrice;
  console.log(currentPrice);
}

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

//firstName field
firstName.addEventListener("change", ($event) => {
  const firstNameValue = firstName.value;
  firstNameError.innerHTML = "";

  if (expName.test(firstNameValue)) {
    firstName.value = firstNameValue;
  } else {
    firstNameError.innerHTML = "Please enter valid first name";
  }
});

//LastName field
lastName.addEventListener("change", ($event) => {
  const lastNameValue = lastName.value;

  lastNameError.innerHTML = "";
  if (expName.test(lastNameValue)) {
    lastName.value = lastNameValue;
  } else {
    lastNameError.innerHTML = "Please enter valid last name";
  }
});

//Address field
address.addEventListener("change", ($event) => {
  const addressValue = address.value;

  addressError.innerHTML = "";
  if (expAdd.test(addressValue)) {
    address.value = addressValue;
  } else {
    addressError.innerHTML = "Please enter valid address";
  }
});

//city field
city.addEventListener("change", ($event) => {
  const cityValue = city.value;

  cityError.innerHTML = "";
  if (expName.test(cityValue)) {
    city.value = cityValue;
  } else {
    cityError.innerHTML = "Please enter valid city";
  }
});

// email field
email.addEventListener("change", ($event) => {
  const emailValue = email.value;

  emailError.innerHTML = "";
  if (expEmail.test(emailValue)) {
    email.value = emailValue;
  } else {
    emailError.innerHTML = "Please enter valid email";
  }
});

document.getElementById("order").addEventListener("click", ($event) => {
  //TODO when the user click order button check all inputs are validated
  const form = document.getElementsByClassName("cart__order__form__question");
  $event.preventDefault();
  if (validateFields()) {
    //TODO get productIds from local storage using the array map
    const order = {
      contact: {
        firstName: firstName.value,
        lastName: "Wayne",
        address: "123 Bat Cave",
        city: "Gotham",
        email: "bruce.wayne@gotham.com",
      },
      products: ["107fb5b75607497b96722bda5b504926"],
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };
    
    fetch("http://localhost:3000/api/products/order", options)
      .then((data) => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
      })
      .then((result) => {
        console.log(result.orderId);
      });

    //TODO get orderId from the response - use array map()

    //TODO clear out cart in localStorage
    //TODO redirect to the confirmation page sending the orderId in the Url - "js how to redirect in JS"
  }
});

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
