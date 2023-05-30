fetch("http://localhost:3000/api/products/order/confirmation")
  .then((data) => {
    return data.json();
  })
  .then((order) => {
    insertOrder(order);
  });

function insertOrder(order) {
  const found = order.find((order) => {
    return orderId === order.Id;
  });
  console.log(found);

  const orderId = document.getElementsByClassName("confirmation");
  orderId = found.orderId;
  orderId.innerHTML = `<p>Order confirmed! <br>Your order number is: <span id="orderId">${order.id}</span></p>`;
}
