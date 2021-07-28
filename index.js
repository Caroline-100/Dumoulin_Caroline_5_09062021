// launch the server => JWDP5 % node server.js
// fetch permet de faire une promesse appel l api teddies
fetch("http://localhost:3000/api/teddies")
  .then((response) => {
    /*condition pour check si la reponse a l appel de l api est OK
    utilisation de promesse pour verifier de maniere asynchrone
    la chargement des donnes de l api et si le chargement est bon 
    faire les les autres action.
    et si il y a un problème "catch" stoppera le programme à cet endroit
    et log l erreur presente
    */
    console.log("response", response);
    if (response.ok) {
      return response.json();
    } else {
      console.error(response);
      // log l erreur avec message + quel type d erreur par le status
      throw new Error(`Fetch failed with status ${response.status}`);
    }
  })

  .then((teddies) => {
    console.log(teddies);
    /* querySelector permet de prendre un element html en precisant le 
    type de ma recherche(class,id,element html...), ".row"dans la page index*/
    let elementSection = document.querySelector(".row");
    // get element html by id
    let elementTitle = document.getElementById("title");
    // the  syntax in the console.log,  log id' s html
    // console.log({ elementTitle });
    // Avec innerText je modifie dynamiquement le text de l element html du titre
    elementTitle.innerText = `Teddies`;

    // je declare une variable teddiesCardsHtml que j initialise a une string vide
    let teddiesCardsHtml = "";

    // j itere sur chacun des ours
    for (let teddie of teddies) {
      // je cree un nouveau instance url (url est un objet )
      let urlInstance = new URL("http://127.0.0.1:5501/product.html");
      /* j ajoute a l instance de l url un id venant de l api teddies
      a l aide searchParams me permet d utiliser et de construire l url querystring , set me permet d ajouter une query string */
      console.log(urlInstance);
      urlInstance.searchParams.set("id", teddie._id);
      // apres les changement sur le fichiers json. [#hexacolor, namecolor] je devais iterer pour recuper le namecolor.
      let tedColor = [];
      for (let ted of teddie.colors) {
        tedColor.push(ted[0]);
      }
      // console.log(tedColor);
      /* j'initialise la string vide avec des template string Dans cette variable,
          Je cree un bloc html qui me permet d'avoir une carte sous forme de liste pour chacun de mes ours 
          avec les informations que me fournis l objet teddies */
      teddiesCardsHtml += `
    <a href=${urlInstance.href} class="textCard">
      <div class="card mb-4">
      <div class="row no-gutters">
        <article class="col-md-4">
          <img src="${teddie.imageUrl}" class="card-img" />
        </article>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Name : ${teddie.name}</h5>
            <p class="card-text">cost :${teddie.price / 100} €</p>
            <p class="card-text">Choisisez une couleur : ${tedColor}</p>
            <p class="card-text">Description : ${teddie.description}</p>
            <p class="card-text">id :${teddie._id}</p>
          </div>
        </div>
      </div>
    </div>
  </a> 
      `;
    }
    // j utilise l'élémet html pour lui ajouter le bloc html au dessus
    elementSection.innerHTML = teddiesCardsHtml;
    let elementArticleBasket = document.querySelector("#number_element_basket");
    elementArticleBasket.textContent = localStorage.getItem("number");
  })
  // une erreur est log sur il y a un problème
  .catch((error) => {
    console.error(error);
  });
