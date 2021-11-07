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
    // countriesContainer.style.opacity = 1;
};

const renderError = (msg) => {
    countriesContainer.insertAdjacentText("beforeend", msg);
    // countriesContainer.style.opacity = 1;
};

const getJson = function (url, errorMsg = "Something went wrong") {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(`${errorMsg} ${response.status}`);
        }
        return response.json();
    });
};

/*
const getCountryAndNeighbour = function (country) {
    // AJAX Call Country 1
    const request = new XMLHttpRequest(); // Old Way

    request.open("GET", `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        // Render Country 1
        renderCountry(data);

        // Get Neighbour Country 2
        const [neighbour] = data.borders;

        if (!neighbour) return;

        // AJAX Call Country 2
        const request2 = new XMLHttpRequest();

        // prettier-ignore
        request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
        request2.send();

        request2.addEventListener("load", function () {
            const data2 = JSON.parse(this.responseText);
            renderCountry(data2, "neighbour");
        });
    });
};

// getCountryAndNeighbour("germany");
getCountryAndNeighbour("usa");
*/

// const request = fetch(`https://restcountries.com/v2/name/portugal`);
// console.log(request);

// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v2/name/${country}`)
//         .then((response) => {
//             console.log(response);
//             return response.json();
//         })
//         .then((data) => {
//             console.log(data);
//             renderCountry(data[0]);
//         });
// };

// getCountryData("portugal");

/*
// getCountryData function before refactoring
const getCountryData = (country) => {
    fetch(`https://restcountries.com/v2/name/${country}`)
        .then((response) => {
            console.log(response);
            if (!response.ok) {
                throw new Error(`Country not found ${response.stats}`);
            }
            return response.json();
        })
        .then((data) => {
            renderCountry(data[0]);
            // const neighbour = data[0].borders[0];
            const neighbour = "dafdkkale";

            if (!neighbour) return;

            return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Country not found ${response.status}`);
            }
            return response.json();
        })
        .then((data) => renderCountry(data, "neighbour"))
        .catch((err) => {
            // To catch errors happening anywhere and catch returns promise
            console.log(`Error ${err} 🤯`);
            renderError(`Something went wrong... ${err.message}. Try again!`);
        })
        .finally(() => {
            // Always happens (e.g. spinner). then = only when promise is fulfilled, catch = only when promise isn't fulfilled
            countriesContainer.style.opacity = 1;
        });
};
*/

const getCountryData = function (country) {
    getJson(`https://restcountries.com/v2/name/${country}`, "Country Not Found")
        .then((data) => {
            renderCountry(data[0]);

            if (!neighbour) return;

            return getJson(
                `https://restcountries.com/v2/alpha/${neighbour}`,
                "Country Not Found",
            );
        })
        .then((data) => renderCountry(data, "neighbour"))
        .catch((err) => {
            console.log(`${err} 🥺`);
            renderError(`Something went wrong: ${err.message}, Try again`);
        })
        .finally(() => (countriesContainer.getElementsByClassName.opacity = 1));
};

btn.addEventListener("click", () => {
    getCountryData("italy");
});

getCountryData("fadafd");
