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

    numberCommand = document.querySelector(".command");
    numberCommand.innerHTML = `    <p>
    Bonjour ${json.contact.firstName}  
    ${json.contact.lastName} 
    voici votre numerode commande ${json.orderId} 
    le prix total est de ${localStorage.getItem("total")} € 
    </p> <p> Vous recevrais votre commande sous peu verifier vos mails pour suivre la commande `;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Voici votre  numero de commande :</p>
// <p>${}, le montant est de ${} €</p>;
