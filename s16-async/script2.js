"use strict";

// Promise
const lotteryPromise = new Promise(function (resolve, reject) {
    console.log("Lotter draw is happening...");
    setTimeout(function () {
        if (Math.random() >= 0.5) {
            resolve("You Win");
        } else {
            reject(new Error("You didn't Win"));
        }
    }, 2000);
});

lotteryPromise.then((res) => console.log(res)).catch((err) => console.log(err));

const wait = function (seconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, seconds * 1000);
    });
};

wait(3)
    .then(() => {
        console.log(`I waited for 2 seconds`);
        return wait(1);
    })
    .then(() => console.log(`I waited for 1 second`));

Promise.resolve("abc").then((x) => console.log(x));
Promise.reject(new Error("problem")).catch((x) => console.log(x));
