// Exporting Module
console.log("Exporting Module");

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added`);
};

const totalPrice = 235;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq }; // As tq is to change the variable name on export

export default function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added`);
}
