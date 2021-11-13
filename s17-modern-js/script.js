// Importing Module
// import {
//     addToCart,
//     totalPrice as price, // To change the name
//     tq,
// } from "./shoppingCart.js";

// addToCart("Bread", 5);
// console.log(price, tq);
console.log("Importing module");

// import * as ShoppingCart from "./shoppingCart.js"; // To import everything

// ShoppingCart.addToCart("tomato", 23);
// console.log(ShoppingCart.totalPrice);

import add, { cart } from "./shoppingCart.js";
add("pizza", 3);
add("apple", 56);
add("bread", 9);

console.log(cart); // Import is not a copy of export, that's why there are objects in the array

// console.log("Start Fetching");
// const respo = await fetch("https://jsonplaceholder.typicode.com/posts"); // This blocks the execution
// const data = await respo.json();
// console.log(data);
// console.log("Somthing");

const getLastPost = async function () {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);

    return { title: data[0].title, text: data[0].body };
};

const lastPost = getLastPost();
console.log(lastPost);

// lastPost.then((last) => console.log(last));

// const lastPost2 = await getLastPost();
// console.log(lastPost2);
