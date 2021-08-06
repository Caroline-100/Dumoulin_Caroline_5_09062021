// launch the server => JWDP5 % node server.js
// fetch all teddies
fetch("http://localhost:3000/api/teddies")
  .then((response) => {
    // call API.
    console.log("response", response);
    // condition if not ok return an error otherwise return the response, it takes
    // as input and parsing it to produce an object Javascript
    if (!response.ok) {
      console.error(response);
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    return response.json();
  })

  .then((teddies) => {
    // querySelector return the first Element within the document that matches
    // the specified selector (class,id,element html...), ".row" in homepage*/
    let elementSection = document.querySelector(".row");
    // return an Element by properties id
    let elementTitle = document.getElementById("title");

    // with innerText i modifie the title of element
    elementTitle.innerText = `Teddies`;

    // teddiesCardsHtml is a string empty
    let teddiesCardsHtml = "";

    //i loop over each teddie
    for (let teddie of teddies) {
      // i create a new instance url (object)
      let urlInstance = new URL("http://127.0.0.1:5501/front/product.html");
      // i add url select by user  in url
      urlInstance.searchParams.set("id", teddie._id);
      // after the changement in file json [#hexacolor, namecolor] i need to iterate for
      // join the colors hexadecimal or name color
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
