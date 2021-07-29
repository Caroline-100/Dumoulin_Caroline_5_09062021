"use strict";
// si le mot n est pas plus grand ou egale a 2 le champs est rouge,
// si il est correct le champ est vert

function displayArticleTable(table, object) {
  for (let element in object) {
    table.innerHTML += ` <p class="squaresDelete" >${object[element]}</p>`;
  }
}
// count le nombre d espace
function countEspace(word, error) {
  for (let letter of word) {
    if (letter == " ") {
      error.innerText = "there is space in a field";
    }
  }
}
// si dans le nom a un chiffre il y a une erreur
function validateNotNumber(word, error, input) {
  if (!isNaN(word)) {
    console.error("nb error");
  }
  for (let letter of word) {
    if (!isNaN(letter)) {
      error.innerText = "error NUMBER";
      input.style.backgroundColor = "red";
    }
  }
}
//appel de l api avec de faire d autre action sur la page mise en place d une promesse
let objectTable = {
  stringColor: [],
  stringId: [],
  stringName: [],
  price: [],
  sum: 0,
  counter: 0,
  resultCounter: [],
};
fetch(`http://localhost:3000/api/teddies/`)
  // attente de la reponse
  .then((response) => {
    return response.json();
  })
  // recuperer les valeurs de mon local storage pour les afficher dans un tableau cree dans la page html
  .then((teddie) => {
    let getColorID = localStorage.getItem("color");
    let arrayColorID = JSON.parse(getColorID);

    // pour chaque element de mon array j ajoute les object dans un object

    // Chaque valeur de l array contient la couleur et l id de l ours j itere sur chacune des valeur
    if (arrayColorID === null) {
      document.querySelector(
        ".choice_user"
      ).innerHTML = ` <p>  Vous panier est vide</p>`;
    } else {
      for (let IdColorsElement of arrayColorID) {
        // j initiale le nom de la couleur dans un paragraphe que j ajoute dans une colonne de mon tableau
        objectTable.stringColor.push(IdColorsElement[0]);
        // j initiale le id de l ours dans un paragraphe que j ajoute dans une colonne de mon tableau
        objectTable.stringId.push(IdColorsElement[1]);
        // j itere sur mes ours
        for (let ted of teddie) {
          /*dans le IdColorsElement[1], il y a la l id de l ours choisi par l user et stocke dans le localStorage 
          si cette valeur est identique a l un des id des teddie present dans l api teddie, alors j affiche son prix et en euro
          je fais la somme de tout ces teddies avec leurs prix correspondant */
          if (IdColorsElement[1] === ted._id) {
            //  count number of articles
            objectTable.counter += 1;
            // teddies's price
            objectTable.price.push(ted.price / 100);
            //add name in objectTable
            objectTable.stringName.push(ted.name);
            // sum all articles
            objectTable.sum += ted.price / 100;
            // resultat de chaque compte et l ajout dans une balise paragraphe
            // pour l ajouter dans tableau
            objectTable.resultCounter.push(`   ${objectTable.counter}`);
          }
        }
      }
    }
    // setting up the table
    if (objectTable.sum === 0) {
      document.querySelector(
        ".choice_user"
      ).innerHTML = ` <p class="messageCommand">  No commands</p>`;
    }

    let thcounter = document.getElementById("counter");

    let tdColors = document.querySelector(".co");
    let tdName = document.querySelector(".name");
    let tdPrice = document.querySelector(".prices");
    let tdTotal = document.querySelector("#total");
    let tdId = document.querySelector(".id");

    // add values in column in the table
    displayArticleTable(thcounter, objectTable.resultCounter);
    displayArticleTable(tdName, objectTable.stringName);
    displayArticleTable(tdColors, objectTable.stringColor);
    displayArticleTable(tdId, objectTable.stringId);
    displayArticleTable(tdPrice, objectTable.price);
    tdTotal.innerHTML += `<p>${objectTable.sum}  €<\p>`;

    thcounter.addEventListener("click", (event) => {
      let currentValueSelect = event.target.innerHTML;
      event.target.parentNode.removeChild(event.target);

      let currentValueSelectColor = tdColors.children[currentValueSelect - 1];
      let currentValueSelectId = tdId.children[currentValueSelect - 1];
      let currentValueSelectprice = tdPrice.children[currentValueSelect - 1];
      let currentValueSelectname = tdName.children[currentValueSelect - 1];

      currentValueSelectname.style.display = "none";
      currentValueSelectprice.style.display = "none";
      currentValueSelectId.style.display = "none";
      currentValueSelectColor.style.display = "none";

      let arraytoDelete = JSON.parse(localStorage.getItem("color"));

      let newarray = arraytoDelete.splice(1);

      localStorage.setItem("color", JSON.stringify(newarray));

      objectTable.sum -= parseInt(currentValueSelectprice.innerHTML);
      tdTotal.innerHTML = objectTable.sum + " €";
      if (objectTable.sum === 0) {
        localStorage.setItem("color", "[]");
        localStorage.removeItem("number");
        localStorage.removeItem("lastName");
        localStorage.removeItem("firstName");
        localStorage.removeItem("address");
        localStorage.removeItem("email");
        localStorage.removeItem("city");
      }
    });

    localStorage.setItem("total", objectTable.sum);
  })
  //delete element localStorage
  .then((teddie) => {
    //return message error
    const pErrorMail = document.querySelector("#errorMail");
    const pErrorAddress = document.querySelector("#errorAddress");
    const pErrorCity = document.querySelector("#errorCity");
    const pErrorLastName = document.querySelector("#errorName");
    const pErrorFirstName = document.querySelector("#errorFirstName");

    // inputs;
    const inputLastName = document.querySelector("#lastName");
    const inputFirstName = document.querySelector("#firstName");
    const inputEmail = document.querySelector("#email");
    const inputAddress = document.querySelector("#address");
    const inputCity = document.querySelector("#city");

    inputFirstName.addEventListener("input", (event) => {
      countEspace(event.target.value, pErrorFirstName);

      validateNotNumber(event.target.value, pErrorFirstName, inputFirstName);
      let valueInput = `${event.target.value}`;
      localStorage.setItem("firstName", valueInput);
    });
    inputLastName.addEventListener("input", (event) => {
      countEspace(event.target.value, pErrorLastName);

      validateNotNumber(event.target.value, pErrorLastName, inputLastName);
      let valueInput = `${event.target.value}`;
      localStorage.setItem("lastName", valueInput);
    });

    inputAddress.addEventListener("input", (event) => {
      testAddress(event.target.value, pErrorAddress, inputAddress);
      let valueInput = `${event.target.value}`;
      localStorage.setItem("address", valueInput);
    });
    inputCity.addEventListener("input", (event) => {
      countEspace(event.target.value, pErrorCity);

      validateNotNumber(event.target.value, pErrorCity, inputCity);
      let valueInput = `${event.target.value}`;
      localStorage.setItem("city", valueInput);
    });
    inputEmail.addEventListener("input", (event) => {
      countEspace(event.target.value, pErrorMail);

      validEmail(event.target.value, pErrorMail, inputEmail);
      let valueInput = `${event.target.value}`;
      localStorage.setItem("email", valueInput);
    });

    let currentData = {
      contact: {
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        address: localStorage.getItem("address"),
        city: localStorage.getItem("city"),
        email: localStorage.getItem("email"),
      },
      products: objectTable.stringId,
    };
    document.querySelector("#command").addEventListener("click", () => {
      localStorage.removeItem("color");
      localStorage.removeItem("number");
      localStorage.removeItem("orderId");
      localStorage.removeItem("products");
    });
    localStorage.setItem("contact", JSON.stringify(currentData));
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      body: JSON.stringify(currentData),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("orderId", json.orderId);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
