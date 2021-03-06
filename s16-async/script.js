"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

// Get Country Function
// const getCountryData = function (country) {
//     const request = new XMLHttpRequest(); // Old Way

//     request.open("GET", `https://restcountries.com/v2/name/${country}`);
//     request.send();

//     request.addEventListener("load", function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         const html = `
//     <article class="country">
//         <img class="country__img" src="${data.flag}" />
//         <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//                 +data.population / 1000000
//             ).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//                 data.currencies[0].name
//             }</p>
//         </div>
//     </article>
//     `;

//         countriesContainer.insertAdjacentHTML("beforeend", html);
//         countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData("usa");
// getCountryData("ireland");
// getCountryData("japan");

// Get Country and Neighbour
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

// const getCountryAndNeighbour = (country) => {
//     const request = new XMLHttpRequest();
//     request.open("GET", `https://restcountries.com/v2/name/${country}`);
//     request.send();

//     request.addEventListener("load", function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         // Render country 1
//         renderCountry(data);

//         // Get neighbour country 2
//         const [neighbour] = data.borders;

//         if (!neighbour) return;

//         const request2 = new XMLHttpRequest();
//         request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener("load", function () {
//             const data2 = JSON.parse(this.responseText);
//             console.log(data2);

//             renderCountry(data2, "neighbour");
//         });
//     });
// };

// getCountryAndNeighbour("usa");

// const request = fetch(`https://restcountries.com/v2/name/portugal`);
// console.log(request);

// const getCountryData = (country) => {
//     fetch(`https://restcountries.com/v2/name/${country}`)
//         .then(function (response) {
//             console.log(response);
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             renderCountry(data[0]);
//         });
// };

// getCountryData("portugal");

const getCountryData = (country) => {
    // Country 1
    getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
        .then((data) => {
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];

            if (!neighbour) {
                throw new Error("No neighbour found");
            }

            if (!neighbour) return;

            // Country 2
            return getJSON(
                `https://restcountries.com/v2/alpha/${neighbour}`,
                "Country not found",
            );
        })
        .then((data) => renderCountry(data, "neighbour"))
        .catch((err) => {
            console.error(`Error: ${err}`);
            renderError(`Something went wrong ${err.message} Try again`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1; // then happens when promise is fulfilled, catch happens when promise is not fulfilled, finally happens regardless promise is fulfilled or not (e.g. spinner)
        });
};

btn.addEventListener("click", function () {
    getCountryData("portugal");
});

// getCountryData("japan");

// Coding challenge 1

const whereAmI = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
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

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

// Event Loop in Practice
console.log("Test Start"); // 1

setTimeout(() => console.log("0 sec timer"), 0); // 4 because it is put in call back queue

Promise.resolve("Resolved Promise 1").then((res) => console.log(res)); // 3 because it is put in microtasks queue
Promise.resolve("Resolved promise 2").then((res) => {
    for (let i = 0; i < 100; i++) {} // This makes delay to console.log(res) below and until this microtasks finishes, setTimeout console.log wont'be executed
    console.log(res);
});

console.log("Test End"); // 2
