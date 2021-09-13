// launch the server => backend % node server.js
// fetch all teddies
fetch("http://localhost:3000/api/teddies")
  .then((response) => {
    // call API.
    console.log("response", response);
    // condition if false then return an error otherwise return the response, it takes
    // as input and parsing it to produce an object Javascript
    if (!response.ok) {
      console.error(response);
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    return response.json();
  })
  // ******Party One****** // I show the list product with all description*****
  .then((teddies) => {
    // "row" is a block div for show each articles
    let elementSection = document.querySelector(".row");
    // teddiesCardsHtml is a string empty
    let teddiesCardsHtml = "";
    // i loop over each teddie
    for (let teddie of teddies) {
      // *****Party Two***** //********/ I modifie the URL product, i add the Id in the URL, id choose by the user*****
      // i create a new instance url (object) from the product page url

      let urlInstance = new URL("http://127.0.0.1:5502/front/product.html");
      // In url, i add selected id by the user.
      urlInstance.searchParams.set("id", teddie._id);
      //*****End of Party Two ******//
      // in the file Teddy.js, I changed the data color [[ name color,hexadecimal color]]
      // FORMAT IN FILE Teddy.js
      // colors: [["Pale-Brown", "#987654"],["Dark-brown", "#654321"],["White", "#FFFFFF"]]
      let tedColor = [];
      // i loop over the teddies javascript object
      for (let ted of teddie.colors) {
        tedColor.push(ted[0]);
        console.log(tedColor);
      }
      //  i create a card for each teddie of api
      teddiesCardsHtml += `
    <a href=${urlInstance.href} class="textCard">
      <div class="card mb-4">
      <div class="row no-gutters">
        <article class="col-md-4">
          <img src="${
            teddie.imageUrl
          }" alt = "image bear Teddies" class="card-img" />
        </article>
        <div class="col-md-8">
          <div class="cards">
            <h5 class="card-title">Name : ${teddie.name}</h5>
            <p class="card-text">Cost : ${teddie.price / 100} €</p>
            <p class="card-text">Choose your color : ${tedColor} </p>
            <p class="card-text">Description : ${teddie.description}</p>
            <p class="card-text">Product Id ${teddie._id}</p>
          </div>
        </div>
      </div>
    </div>
  </a>
      `;
    }
    // i show the articles of plush on the homepage
    elementSection.innerHTML = teddiesCardsHtml;
    // *******End of Party One******//
    //******* */ Party Three // i display the number of articles in the basket*****
    // show the number articles choose by the user
    let elementArticleBasket = document.querySelector("#number_element_basket");
    elementArticleBasket.textContent = localStorage.getItem("number");
    //***** End of Party Three********//
  })
  // catch error
  .catch((error) => {
    console.error(error, response.status);
  });
