//grabUrl orderId from the url
const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("id");

//insert orderId into page
const confNo = (document.getElementById("orderId").innerText = orderId);
