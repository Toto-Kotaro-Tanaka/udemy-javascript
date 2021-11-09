"use strict";

const btn = document.querySelector(".btn-country");

// Promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//     console.log("Lotter draw is happening...");
//     setTimeout(function () {
//         if (Math.random() >= 0.5) {
//             resolve("You Win");
//         } else {
//             reject(new Error("You didn't Win"));
//         }
//     }, 2000);
// });

// lotteryPromise.then((res) => console.log(res)).catch((err) => console.log(err));

// const wait = function (seconds) {
//     return new Promise(function (resolve, reject) {
//         setTimeout(resolve, seconds * 1000);
//     });
// };

// wait(3)
//     .then(() => {
//         console.log(`I waited for 2 seconds`);
//         return wait(1);
//     })
//     .then(() => console.log(`I waited for 1 second`));

// Promise.resolve("abc").then((x) => console.log(x));
// Promise.reject(new Error("problem")).catch((x) => console.log(x));

const getPosition = () => {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     (position) => resolve(position),
        //     (err) => reject(err),
        // );
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

getPosition().then((pos) => console.log(pos));

const renderCountry = function (data, className = "") {
    // prettier-ignore
    const html = `
            <article class="country ${className}">
                <img class="country__img" src="${data.flag}" />
                <div class="country__data">
                    <h3 class="country__name">${data.name}</h3>
                    <h4 class="country__region">${data.region}</h4>
                    <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
                    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
                </div>
            </article>
            `;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
    countriesContainer.insertAdjacentText("beforeend", msg);
    countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = "Something went wrong") {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(`${erroMsg}(${response.status})`);
        }

        return response.json();
    });
};

const whereAmI = function () {
    getPosition()
        .then((pos) => {
            const { latitude: lat, longitude: lng } = pos.coords;

            return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        })
        .then((response) => {
            if (!response) {
                throw new Error(`Problem with geocodeing ${res.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(`Your are in ${data.city}, ${data.country}`);
            return fetch(
                `https://restcountries.com/v2/name/${data.country}`,
            ).then((res) => {
                if (!res.ok) {
                    throw new Error(`Country not found ${res.status}`);
                }
                return res.json();
            });
        })
        .then((data) => renderCountry(data[0]))
        .catch((error) => console.log(`Error: ${error.message}`));
};

btn.addEventListener("click", whereAmI);
