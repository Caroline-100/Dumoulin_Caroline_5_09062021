let body = localStorage.getItem("contact");
body = JSON.parse(body);
fetch("http://localhost:3000/api/teddies/order", {
  method: "POST",
  body: JSON.stringify(body),
  headers: { "Content-Type": "application/json;charset=utf-8" },
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    numberOrder = document.querySelector(".order");
    numberOrder.innerHTML = `    <p>
    Hello ${json.contact.firstName}  
    ${json.contact.lastName} 
    this is your id order ${json.orderId} 
    the price is ${localStorage.getItem("total")} € 
    </p> <p> You will receive your order shortly check your emails to track the order `;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
