"use strict";
// i create a new instance url (object)
// i set url of current document
let urlInstance = new URL(document.URL);

// teddyId, i take Id of l URL of current document
const teddyId = urlInstance.searchParams.get("id");

// textELement , i get element html by it id name
const elementIMG = document.getElementById("textELement");
// textDescription, i get element html by it class name
const elementDescription = document.querySelector(".textDescription");

// elementSquareColors, i get element html by it class name
const elementSquareColors = document.querySelector(".square");

// i call API teddies with it idproduct in search barre
fetch(`http://localhost:3000/api/teddies/${teddyId}`)
  .then((response) => {
    return response.json();
  })
  .then((teddies) => {
    // change title by teddies name
    document.querySelector("h1").innerText = `${teddies.name}`;
    // In html Element i add a block of html image and text description
    // i add an image, url of image, the price and the description are in api
    elementIMG.innerHTML = `
    <img src="${teddies.imageUrl}" class="img-fluid" alt="photo ours">
<p class="price"><strong>${teddies.price / 100} €<strong></p>
`;
    elementDescription.innerHTML = `
    <p class="fw-light">${teddies.description}</p>`;
    // I initialize colored buttons,  the user can choose the color of his teddie
    let buttonTeddiesColor = "";
    // I iterate over the array of colors to get the hexadecimal colors for the background of the buttons
    // and the name of the colors for the text
    for (let color of teddies.colors) {
      // creating buttons
      buttonTeddiesColor += `
      <a href="./panier.html">
        <button class= "${color[0]}" style=
        "background-color: ${color[1]}; "
        >${color[0]}</button>
        </a>`;
    }

    // setting up the buttons in an html element present on the html page
    elementSquareColors.innerHTML = buttonTeddiesColor;
    // in the localStorage i retrieve the old value
    let valuelocalColor = localStorage.getItem("color");
    // if the localstorage return null i add an empty array
    if (valuelocalColor === null) {
      localStorage.setItem("color", JSON.stringify([]));
      // i retrieve the value in localStorage, the array empty
      valuelocalColor = localStorage.getItem("color");
    }
    // in the localstorage the values are in format string, i change for get an array of colors
    let arrayStorecolors = JSON.parse(valuelocalColor);
    // i loop over the array of colors of API which returns the numbers of colors for each teddies
    for (let numbersColorsByTeddy in teddies.colors) {
      console.log(numbersColorsByTeddy);
      // i retrieve only the name of colors
      let buttonsColor = document.querySelector(
        `.${teddies.colors[numbersColorsByTeddy][0]}`
      );

      let elementArticleBasket = document.querySelector(
        "#number_element_basket"
      );
      elementArticleBasket.textContent = localStorage.getItem("number");
      // i create an event on button of colors, when the buttons is clicked i add in the localstorage the current color and id product
      buttonsColor.addEventListener("click", (event) => {
        // classname is the name of colors
        let currentItem = event.target.className;
        // i add old values with currentvalue in array empty
        arrayStorecolors.push([currentItem, `${teddyId}`, teddies.price]);
        // in the localStorage, i update the array whose content old value and currrent value
        localStorage.setItem("color", JSON.stringify(arrayStorecolors));

        localStorage.setItem("number", arrayStorecolors.length);
        let elementArticleBasket = document.querySelector(
          "#number_element_basket"
        );
        // i display the current number of article in the basket
        elementArticleBasket.textContent = localStorage.getItem("number");
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });
