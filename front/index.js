// launch the server => JWDP5 % node server.js
// fetch all teddies
fetch("http://localhost:3000/api/teddies")
  .then((response) => {
    //  condition pour check si la reponse a l appel de l api est OK
    //   utilisation de promesse pour verifier de maniere asynchrone
    //   la chargement des donnes de l api et si le chargement est bon
    //   faire les les autres action.
    //   et si il y a un problème "catch" stoppera le programme à cet endroit
    //   et log l erreur presente

    console.log("response", response);
    if (!response.ok) {
      console.error(response);
      // log l erreur avec message + quel type d erreur par le status
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    return response.json();
  })

  .then((teddies) => {
    // querySelector return the first Element within the document that matches
    // the specified selector (class,id,element html...), ".row"dans homepage*/
    let elementSection = document.querySelector(".row");
    // get element html by id
    let elementTitle = document.getElementById("title");
    // the  syntax in the console.log,  log id' s html

    // with innerText i modifie the text of html title element
    elementTitle.innerText = `Teddies`;

    // teddiesCardsHtml is a string empty
    let teddiesCardsHtml = "";

    //i loop over each teddie
    for (let teddie of teddies) {
      // i create a new instance url (object)
      let urlInstance = new URL("http://127.0.0.1:5501/front/product.html");
      /* j ajoute a l instance de l url un id venant de l api teddies
      a l aide searchParams me permet d utiliser et de construire l url querystring , set me permet d ajouter une query string */
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
            <p class="card-text">Choose your color : ${tedColor}</p>
            <p class="card-text">Description : ${teddie.description}</p>
            <p class="card-text">id :${teddie._id}</p>
          </div>
        </div>
      </div>
    </div>
  </a> 
      `;
    }
    // i used html element for add bloc html above
    elementSection.innerHTML = teddiesCardsHtml;
    let elementArticleBasket = document.querySelector("#number_element_basket");
    elementArticleBasket.textContent = localStorage.getItem("number");
  })
  // catch error
  .catch((error) => {
    console.error(error);
  });
