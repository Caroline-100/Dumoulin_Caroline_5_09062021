"use strict";
// if the field contains numbers return error
function validateNotNumber(word, error, input) {
  for (let letter of word) {
    if (!isNaN(letter)) {
      error.innerText =
        "there is a problem, this field need content only letters";
    } else {
      error.innerText = "";
    }
  }
}
let amout = 0;
let stringId = [];
let currentData;
let resultamout = [];
let sum = 0;
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
    // get values on localStorage
    let getColorID = localStorage.getItem("color"); // [["Black","5be9c8541c9d440000665243",2900]]
    let arrayColorID = JSON.parse(getColorID);
    // if my basket is empty a message is display
    if (arrayColorID === null) {
      document.querySelector(
        ".choice_user"
      ).innerHTML = ` <p>  Your basket is empty </p>`;
    } else {
      // i create an array for each article, i use it for create my table of articles
      const article = [];
      for (let IdColorsElement of arrayColorID) {
        // i loop over the teddie
        for (let ted of teddie) {
          if (IdColorsElement[1] === ted._id) {
            amout += 1;
            //  count number of articles
            resultamout.push(`${amout}`);

            // sum all articles
            sum += ted.price / 100;

            article.push({
              plushNumber: amout,
              plushName: ted.name,
              plushColor: IdColorsElement[0],
              plushPrice: IdColorsElement[2],
            });
          }
        }
      }
      let teddiesLinesTable = "";
      // template articles in table
      article.map((art) => {
        teddiesLinesTable += `<tr class="colonneArticle">
        <td class="resizeTd deleteProduct" style="color:white">
        <span><i class="fas fa-trash-alt" data-id="${art.plushNumber}"></i></td>
        <td class="resizeTd" style="color:white"></span>
        ${art.plushName}</td>
        <td class="resizeTd" style="color:white">${art.plushColor}</td>
        <td class="resizeTd" class="Price" style="color:white">${
          art.plushPrice / 100
        }</td>
        </tr>`;
      });
      //display template table article
      document.querySelector("tbody").innerHTML = teddiesLinesTable;
    }
    // setting up the table
    if (sum === 0) {
      document.querySelector(
        ".choice_user"
      ).innerHTML = ` <p class="messageOrder">  No orders </p>`;
      localStorage.removeItem("number");
    }
    // A partir de mon tableau, je cree une possibilité de supprimer les éléments
    const tableArticle = document.querySelector("tbody");
    let tdTotal = document.querySelector("#total");
    tdTotal.innerHTML = sum + " €";
    let colonneArticle = document.querySelectorAll(".colonneArticle");

    for (let index of colonneArticle) {
      index.addEventListener("click", (event) => {
        let arraytoDelete = JSON.parse(localStorage.getItem("color"));
        let data = event.target.getAttribute("data-id");
        let numberData = parseInt(data) - 1;

        delete arraytoDelete[numberData];
        let newArray = arraytoDelete.filter(function (el) {
          return true;
        });

        localStorage.setItem("color", JSON.stringify(newArray));

        location.reload();
      });
    }
    localStorage.setItem("total", sum);
  })
  // FORM **************
  .then((teddie) => {
    //return message error
    const pErrorMail = document.querySelector("#errorMail");
    const pErrorAddress = document.querySelector("#errorAddress");
    const pErrorCity = document.querySelector("#errorCity");
    const pErrorLastName = document.querySelector("#errorlastName");
    const pErrorFirstName = document.querySelector("#errorFirstName");

    // inputs;
    const inputLastName = document.querySelector("#lastName");
    const inputFirstName = document.querySelector("#firstName");
    const inputEmail = document.querySelector("#email");
    const inputAddress = document.querySelector("#address");
    const inputCity = document.querySelector("#city");

    // listen activities of the field, check if the field is correct format
    inputFirstName.addEventListener("input", (event) => {
      validateNotNumber(event.target.value, pErrorFirstName, inputFirstName);
      let valueInput = `${event.target.value}`;
      localStorage.setItem("firstName", valueInput);
    });
    inputLastName.addEventListener("input", (event) => {
      validateNotNumber(event.target.value, pErrorLastName, inputLastName);
      let valueInput = `${event.target.value}`;
      localStorage.setItem("lastName", valueInput);
    });

    inputAddress.addEventListener("input", (event) => {
      let valueInput = `${event.target.value}`;
      localStorage.setItem("address", valueInput);
    });
    inputCity.addEventListener("input", (event) => {
      validateNotNumber(event.target.value, pErrorCity, inputCity);
      let valueInput = `${event.target.value}`;
      localStorage.setItem("city", valueInput);
    });
    inputEmail.addEventListener("input", (event) => {
      let valueInput = `${event.target.value}`;
      let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (valueInput.match(emailformat)) {
        pErrorMail.innerText = " ";
      } else {
        pErrorMail.innerText = "email is not a correct format ";
      }
      localStorage.setItem("email", valueInput);
    });

    for (const color of JSON.parse(localStorage.getItem("color"))) {
      const colorId = color[1];
      stringId.push(colorId);
    }

    document.querySelector("#order").addEventListener("click", () => {
      currentData = {
        contact: {
          firstName: localStorage.getItem("firstName"),
          lastName: localStorage.getItem("lastName"),
          address: localStorage.getItem("address"),
          city: localStorage.getItem("city"),
          email: localStorage.getItem("email"),
        },
        products: stringId,
        //  localStorage.getItem("color"),
      };
      localStorage.setItem("contact", JSON.stringify(currentData));
    });
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
