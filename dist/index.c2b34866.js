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
// import add, { cart } from "./shoppingCart.js";
// add("pizza", 3);
// add("apple", 56);
// add("bread", 9);
// console.log(cart); // Import is not a copy of export, that's why there are objects in the array
// console.log("Start Fetching");
// const respo = await fetch("https://jsonplaceholder.typicode.com/posts"); // This blocks the execution
// const data = await respo.json();
// console.log(data);
// console.log("Somthing");
const getLastPost = async function () {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);
    return {
        title: data[0].title,
        text: data[0].body,
    };
};
const lastPost = getLastPost();
console.log(lastPost);
// lastPost.then((last) => console.log(last));
// const lastPost2 = await getLastPost();
// console.log(lastPost2);
const ShoppingCart2 = (function () {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;
    const addToCart = function (product, quantity) {
        cart.push({
            product,
            quantity,
        });
        console.log(
            `This is shopping cart 2: ${quantity} ${product} added to cart`,
        );
    };
    const orderStock = function (product, quantity) {
        console.log(
            `This is shopping cart 2: ${quantity} ${product} ordered from supplier`,
        );
    };
    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity,
    };
})();
ShoppingCart2.addToCart("apple", 2);
ShoppingCart2.addToCart("pizza", 3);
// Common JS Modules
// Export
// export.addToCart2 = function (product, quantity) {
//         cart.push({ product, quantity });
//         console.log(
//             `This is shopping cart 2: ${quantity} ${product} added to cart`,
//         );
//     };
// Import
// const { addToCart2 } = require("./shoppingCart.js")
// import cloneDeep from "../node_modules/lodash-es/";
const state = {
    cart: [
        {
            product: "bread",
            quantity: 5,
        },
        {
            product: "pizza",
            quantity: 4,
        },
    ],
    user: {
        loggedIn: true,
    },
};
const stateClone = Object.assign({}, state);
// const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
// console.log(stateDeepClone); // Good solution
if (module.hot) module.hot.accept();

//# sourceMappingURL=index.c2b34866.js.map
