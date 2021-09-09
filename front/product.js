// "use strict";
// function for create colors buttons
function getColorbuttonsColor(colors) {
  let htmlButton = "";
  for (let color of colors) {
    const colorNameBtn = color[0];
    const colorCodeBtn = color[1];
    htmlButton += `<a href="javascript:void(0);"><button class= "${colorNameBtn}" 
    style="background-color: ${colorCodeBtn}; ">${colorNameBtn}</button></a>`;
  }
  return htmlButton;
}
// i create a new instance from the current url
let urlInstance = new URL(document.URL);
// current teddie id
const teddyId = urlInstance.searchParams.get("id");
// i take the element html figure for show the Image and the Price of  the plush
const elmtImagePricePlush = document.getElementById("imageAndPrice");
// i take the element html article for show the description of the plush
const elementDescription = document.querySelector(".textDescription");
// i take the element html div for group all squares of colors
const elementSquareColors = document.querySelector(".square");
// i call API teddies with it idproduct in search barre
fetch(`http://localhost:3000/api/teddies/${teddyId}`)
  .then((response) => {
    return response.json();
  })
  .then((teddies) => {
    // i change the title by teddies name
    document.querySelector("h1").innerText = `${teddies.name}`;
    // In html Element i add a block of html image and text description
    // i add an image, url of image, the price and the description are in api
    elmtImagePricePlush.innerHTML = `
    <img src="${teddies.imageUrl}" class="img-fluid" alt="photo ours">
<p class="price"><strong>${teddies.price / 100} €<strong></p>
`;
    elementDescription.innerHTML = `
    <p class="fw-light">${teddies.description}</p>`;

    // I initialize colored buttons,  the user can choose the color of his teddie
    let buttonsColorPlush = getColorbuttonsColor(teddies.colors);

    elementSquareColors.innerHTML = buttonsColorPlush;
    // I iterate over the array of colors to get the hexadecimal colors for the background of the buttons
    // and the name of the colors for the text

    for (let color of teddies.colors) {
      const colorName = color[0];
      const colorCode = color[1];

      let buttonsColor = document.querySelector(`.${colorName}`);

      // setting up the buttons in an html element present on the html page
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
      buttonsColor.addEventListener("click", (event) => {
        // classname is the name of colors
        let currentItem = event.target.className;

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
