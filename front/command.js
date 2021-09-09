let body = localStorage.getItem("contact");
body = JSON.parse(body);
console.log(body);
// j appelle l api order
// et j envoie les donnees de mon localstorage
fetch("http://localhost:3000/api/teddies/order", {
  method: "POST",
  body: JSON.stringify(body),
  headers: { "Content-Type": "application/json;charset=utf-8" },
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    numberOrder = document.querySelector(".order");
    numberOrder.innerHTML = `<p>
    ${json.contact.lastName} 
    this is your id order ${json.orderId} 
    the price is ${localStorage.getItem("total")} € 
    </p> <p> You will receive your order shortly check your emails to track the order`;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
