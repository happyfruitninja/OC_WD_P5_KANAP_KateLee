// TODO grabUrl orderId from the url 
const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get(result.orderId);

//TODO insert orderId into page

 const confNo = document.getElementById("orderId").innerHTML(`${orderId}`);