Ce fichier JWDP5 d'origine donné par OpenClassrooms à cloner pour ce projet :
le lien vers le fichier git JWDP5 : https://github.com/OpenClassrooms-Student-Center/JWDP5

# FILE JWDP5/models/Teddy.js

J'ai modifié l'array de 'colors' dans le dossier backend :

# FOLDER JWDP5/models/Teddy.js

ci dessous ce README à partir de

'const teddies = [
{
colors: [...'

# 1. On peut voir les modification faites au fichier. voici un exemple de la structure

example : [[colorName, colorCodeHexadecimal], [colorName, colorCodeHexadecimal]...];

# J'ai tenté de mettre le dossier dans mon github 'JWDP5/models/Teddy.js'. Je n'ai pu aboutir à cette requête.

# 2. Attention ! Si vous faites un copier-coller dans ce README à partir de const teddies

Lorsque j'ai sauvegarder un back-slash s'est ajouté. '\_id'. Pour éviter toute erreur il faut supprimer ce back-slash. Et faire les modifications sur le folder backend.

ex :' \_id: "5be9c8541c9d440000665243",'

const teddies = [
{
colors: [
["Tan", "#d2b48c"],
["Chocolate", "#d2691e"],
["Black", "#000000"],
["White", "#FFFFFF"],
],
\_id: "5be9c8541c9d440000665243",
name: "Norbert",
price: 2900,
imageUrl: "teddy_1.jpg",
description:
"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
},
{
colors: [
["Pale-Brown", "#987654"],
["Dark-brown", "#654321"],
["White", "#FFFFFF"],
],
// colors: ["Pale-brown", "Dark-brown", "White"],
\_id: "5beaa8bf1c9d440000a57d94",
name: "Arnold",
price: 3900,
imageUrl: "teddy_2.jpg",
description:
"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
},
{
colors: [["Brown", "#964B00"]],
\_id: "5beaaa8f1c9d440000a57d95",
name: "Lenny and Carl",
price: 5900,
description:
"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
imageUrl: "teddy_3.jpg",
},
{
colors: [
["Brown", "#964B00"],
["Blue", "#0000FF"],
["Pink", "#FFC0CB"],
],
// colors: ["Brown", "Blue", "Pink"],
\_id: "5beaabe91c9d440000a57d96",
name: "Gustav",
price: 4500,
imageUrl: "teddy_4.jpg",
description:
"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
},
{
colors: [
["Beige", "#F5F5DC"],
["Tan", "#d2b48c"],
["Chocolate", "#d2691e"],
],
// colors: ["Beige", "Tan", "Chocolate"],
\_id: "5beaacd41c9d440000a57d97",
name: "Garfunkel",
price: 5500,
description:
"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
imageUrl: "teddy_5.jpg",
},
];

exports.find = () => {
return new Promise((resolve, reject) =>
resolve(JSON.parse(JSON.stringify(teddies)))
);
};

exports.findById = (id) => {
return new Promise((resolve, reject) =>
resolve(
JSON.parse(JSON.stringify(teddies)).find((teddy) => teddy.\_id == id)
)
);
};
