"use strict";
// if name content number return error
function validateNotNumber(word, error, input) {
  if (!isNaN(word)) {
    console.error("nb error");
  } else {
    error.innerText = "";
  }
  for (let letter of word) {
    if (!isNaN(letter)) {
      error.innerText =
        "there is a problem, this field need content only letters";
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
// const article  = [
// {
//   plushName : ,
//   plushId : ,
//   plushColor: ,
//   plushprice: ,

// }
// ]

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
    // if my basket is  empty a message is display
    if (arrayColorID === null) {
      console.log(objectTable);
      document.querySelector(
        ".choice_user"
      ).innerHTML = ` <p>  Your basket is empty </p>`;
    } else {
      // const number = objectTable.resultCounter;
      // console.log(number);
      const article = [];
      for (let IdColorsElement of arrayColorID) {
        // j initiale le nom de la couleur dans un paragraphe que j ajoute dans une colonne de mon tableau
        // i add color array in my obbjectTable
        console.log(IdColorsElement);
        objectTable.stringColor.push(IdColorsElement[0]);
        // i add id array in my obbjectTable
        objectTable.stringId.push(IdColorsElement[1]);
        // i loop over the teddie
        for (let ted of teddie) {
          if (IdColorsElement[1] === ted._id) {
            // objectTable.counter += 1;
            //  count number of articles, i add in objectTable
            // objectTable.resultCounter.push(`${objectTable.counter}`);
            // teddies's price, i add in objectTable
            objectTable.price.push(ted.price / 100);
            //add name in objectTable, i add in objectTable
            objectTable.stringName.push(ted.name);
            // sum all articles, i add in objectTable
            objectTable.sum += ted.price / 100;
            console.log(objectTable);

            article.push({
              plushName: ted.name,
              plushId: IdColorsElement[1],
              plushColor: IdColorsElement[0],
              plushPrice: IdColorsElement[2],
            });
          }
        }
        console.log(article.length);
      }
      let teddiesLinesTable = "";
      console.log("sum", objectTable.sum);
      const articleDetail = article.map((art) => {
        console.log(art.plushName);

        teddiesLinesTable += `<tr class="colArticle">
        <td class="resizeTd" style="color:white"><i class="fas fa-trash-alt"></i></td>
        <td class="resizeTd" style="color:white">
        ${art.plushName}</td>
        <td class="resizeTd" style="color:white">${art.plushColor}</td>
        <td class="resizeTd" class="Price" style="color:white">${
          art.plushPrice / 100
        }</td>
        </tr>`;
      });

      document.querySelector("tbody").innerHTML = teddiesLinesTable;
    }
    // setting up the table
    if (objectTable.sum === 0) {
      document.querySelector(
        ".choice_user"
      ).innerHTML = ` <p class="messageOrder">  No orders </p>`;
    }

    const tableArticle = document.querySelector("tbody");
    let tdTotal = document.querySelector("#total");
    tdTotal.innerHTML = objectTable.sum + " €";

    tableArticle.addEventListener("click", () => {
      let arraytoDelete = JSON.parse(localStorage.getItem("color"));
      let newarray = arraytoDelete.splice(1);

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
    const pErrorLastName = document.querySelector("#errorlastName");
    const pErrorFirstName = document.querySelector("#errorFirstName");

    // inputs;
    const inputLastName = document.querySelector("#lastName");
    const inputFirstName = document.querySelector("#firstName");
    const inputEmail = document.querySelector("#email");
    const inputAddress = document.querySelector("#address");
    const inputCity = document.querySelector("#city");

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
    document.querySelector("#order").addEventListener("click", () => {
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
