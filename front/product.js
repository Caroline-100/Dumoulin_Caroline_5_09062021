"use strict";
// urlInstance take url of document
let urlInstance = new URL(document.URL);

// teddyId take Id of l URL of document
const teddyId = urlInstance.searchParams.get("id");

// elementTexte prend par l id la balise HTML p, corresdant a l'id textELement
const elementIMG = document.getElementById("textELement");
const elementDescription = document.querySelector(".textDescription");
const elementTexte = document.querySelector("figcaption");

// elementTexte prend par la classe la balise HTML p, corresdant a la classe square
const elementSquareColors = document.querySelector(".square");

// appel l api teddies avec le teddie choisi par l user l id dans la barre de recherche
fetch(`http://localhost:3000/api/teddies/${teddyId}`)
  .then((response) => {
    return response.json();
  })
  .then((teddies) => {
    document.querySelector("h1").innerText = `${teddies.name}`;
    // Dans l element html j ajoute un bloc html qui correspond au information du teddie a qui appartient l id
    elementIMG.innerHTML = `
    <img src="${teddies.imageUrl}"alt="..." width="600px height="300px">
<p class="price"><strong>${teddies.price / 100} €<strong></p>
`;
    elementDescription.innerHTML = `
    <p>${teddies.description}</p>`;
    // j inialise des boutons de couleurs l'user pourra des a present choisir la couleur de son teddi
    let buttonTeddiesColor = "";
    /* j itere sur l'array de couleurs pour avoir les hexadecimal couleurs pour les background des bouttons
    et le nom des couleurs pour le texte */
    for (let color of teddies.colors) {
      // creation des bouton
      buttonTeddiesColor += `
        <button class= "${color[0]}" style=
        "background-color: ${color[1]};"
        >${color[0]}</button>`;
    }

    // mise en place des boutons dans un element html present sur la page html
    elementSquareColors.innerHTML = buttonTeddiesColor;
    // dans le localStorage je recupere l ancienne valeur
    let valuelocalColor = localStorage.getItem("color");
    // si la valeur est null alors j initialise une valeur un array vide pour accueillir l ensemble des valeurs,
    // evite l erreur de vouloir recuperer la valeur null par defaut quand le localStorage est vide
    if (valuelocalColor === null) {
      /*dans la cle "color" : j ajoute un array vide que je stringify pour que la valeur soit une string car le localStorage
      n accepte que des strings */
      localStorage.setItem("color", JSON.stringify([]));
      /* getItem me permet de recuperer la valeur que je viens d initialiser, valuelocalColor est la valeur presente avec la cle color
      dans le localStorage */
      valuelocalColor = localStorage.getItem("color");
    }
    // convertis un objet json notation string en objet, dans le cas present un array
    let arrayStorecolors = JSON.parse(valuelocalColor);

    //j itere sur l array des couleurs de l api qui retour des nombres
    for (let numbersColorsByTeddy in teddies.colors) {
      /* pour chaque avec la couleur qui correspond a la couleur d un teddie 
      je recupere ces elements */
      let buttonsColor = document.querySelector(
        // dans cet array d array je ne recupere que les noms des couleurs
        `.${teddies.colors[numbersColorsByTeddy][0]}`
      );

      let elementArticleBasket = document.querySelector(
        "#number_element_basket"
      );
      elementArticleBasket.textContent = localStorage.getItem("number");
      // je cree un event sur le bouton de couleurs, la cible va me le nom des classes de chacun de ces element
      // qui correspond a la couleur du boutton
      buttonsColor.addEventListener("click", (event) => {
        let currentItem = event.target.className;

        // arrayStorecolors est l ancienne valeurs si la valeur est null alors un array est ajouter dans cette array j ajoute la
        // nouvelle valeur le nouveau clic et j ajoute l idee
        arrayStorecolors.push([currentItem, `${teddyId}`]);
        // dans le local storage j initialise au tableau qui detiend les ancienne valeur et  la nouvelle
        localStorage.setItem("color", JSON.stringify(arrayStorecolors));
        localStorage.setItem("number", arrayStorecolors.length);
        let elementArticleBasket = document.querySelector(
          "#number_element_basket"
        );
        elementArticleBasket.textContent = localStorage.getItem("number");
      });
    }
  });
