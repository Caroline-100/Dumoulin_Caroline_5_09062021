"use strict";

// count number of spaces
function countEspace(word, error) {
  for (let letter of word) {
    if (letter == " ") {
      error.innerText = "there is space in a field";
    }
  }
}

// if name content number return error
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
// create an object objectTable
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
  .then((response) => {
    // condition if not ok return an error otherwise return the response, it takes
    // as input and parsing it to produce an object Javascript
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    return response.json();
  })

  .then((teddie) => {
    // get values on localStorage for display in the table
    let getColorID = localStorage.getItem("color");
    let arrayColorID = JSON.parse(getColorID);

    // pour chaque element de mon array j ajoute les object dans un object

    // Chaque valeur de l array contient la couleur et l id de l ours j itere sur chacune des valeur
    if (arrayColorID === null) {
      document.querySelector(
        ".choice_user"
      ).innerHTML = ` <p>  Vous panier est vide</p>`;
    } else {
      const number = objectTable.resultCounter;
      console.log(number);
      for (let IdColorsElement of arrayColorID) {
        // j initiale le nom de la couleur dans un paragraphe que j ajoute dans une colonne de mon tableau
        objectTable.stringColor.push(IdColorsElement[0]);
        // j initiale le id de l ours dans un paragraphe que j ajoute dans une colonne de mon tableau
        objectTable.stringId.push(IdColorsElement[1]);
        // j itere sur mes ours
        for (let ted of teddie) {
          /*dans le IdColorsElement[1], il y a la
           l id de l ours choisi par l user et stocke dans le localStorage 
          si cette valeur est identique a l un des id des teddie present dans l api teddie, alors j affiche son prix et en euro
          je fais la somme de tout ces teddies avec leurs prix correspondant */
          // console.log(typeof objectTable.resultCounter);
          console.log(IdColorsElement);
          if (IdColorsElement[1] === ted._id) {
            objectTable.counter += 1;
            objectTable.resultCounter.push(`${objectTable.counter}`);
            //  count number of articles

            // // teddies's price
            objectTable.price.push(ted.price / 100);
            // //add name in objectTable
            objectTable.stringName.push(ted.name);
            // // sum all articles
            objectTable.sum += ted.price / 100;
            console.log(objectTable.sum);
          }
        }
      }
      let teddiesLinesTable = "";
      console.log("sum", objectTable.sum);
      // <td style="color:white">${objectTable.stringId[parseInt(res - 1)]}</td>
      for (let res of objectTable.resultCounter) {
        teddiesLinesTable += `<tr class="colArticle">
        <td style="color:white">${res}</td>
        <td style="color:white">${
          objectTable.stringName[parseInt(res - 1)]
        }</td>
        <td style="color:white">${
          objectTable.stringColor[parseInt(res - 1)]
        }</td>
        <td class="Price" style="color:white">${
          objectTable.price[parseInt(res - 1)]
        }</td>
        </tr>`;
      }
      document.querySelector("tbody").innerHTML = teddiesLinesTable;
    }
    // setting up the table
    if (objectTable.sum === 0) {
      document.querySelector(
        ".choice_user"
      ).innerHTML = ` <p class="messageCommand">  No commands</p>`;
    }
    const articleLine = document.querySelector("tbody");
    let tdTotal = document.querySelector("#total");

    tdTotal.innerHTML = objectTable.sum + " €";
    articleLine.addEventListener("click", (event) => {
      let currentValueSelect = event.target.value;
      // articleLine.childNodes[parseInt(currentValueSelect - 1)].style.display =
      //   "none";

      console.log(currentValueSelect);
      console.log(articleLine.childNodes[parseInt(currentValueSelect - 1)]);

      let arraytoDelete = JSON.parse(localStorage.getItem("color"));

      let newarray = arraytoDelete.splice(1);

      // objectTable.sum -= parseInt(currentValueSelectprice.innerHTML);

      localStorage.setItem("color", JSON.stringify(newarray));
      if (objectTable.sum === 0) {
        localStorage.setItem("color", "[]");
        localStorage.removeItem("number");
        localStorage.removeItem("lastName");
        localStorage.removeItem("firstName");
        localStorage.removeItem("address");
        localStorage.removeItem("email");
        localStorage.removeItem("city");
      }
      location.reload();
    });
    console.log(objectTable.sum);

    // objectTable.sum -= objectTable.price;
    // tdTotal.innerHTML = `ffd${(objectTable.sum -= objectTable.price)}`;

    // tdTotal.innerHTML = objectTable.sum - objectTable.price;

    localStorage.setItem("total", objectTable.sum);
    if (objectTable.sum === 0) {
      localStorage.removeItem("number");
    }
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
