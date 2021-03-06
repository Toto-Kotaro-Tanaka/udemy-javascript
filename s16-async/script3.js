"use strict";
const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const whereAmI = async function () {
    try {
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;

        const resGeo = await fetch(
            `https://geocode.xyz/${lat},${lng}?geoit=json`,
        );

        if (!resGeo.ok) throw new Error(`Problem getting location data`);
        const dataGeo = await resGeo.json();

        // fetch(`https://restcountries.com/v2/name/${country}`).then((res) =>
        //     console.log(res),
        // ); // Below is same as this
        const res = await fetch(
            `https://restcountries.com/v2/name/${dataGeo.country}`,
        );

        if (!res.ok) throw new Error(`Problem getting country`);
        const data = await res.json();
        return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    } catch (err) {
        console.log(err.message);
        renderError(`Something went wrong ${err.message}`);

        // Reject Promise returned from async function
        throw err;
    }
};

console.log("1. Will get location");
// const city = whereAmI();
// console.log(city);
// whereAmI()
//     .then((city) => console.log(city))
//     .catch((err) => console.err(`2; ${err.message}`))
//     .finally(() => console.log("3. Finished getting location"));

(async function () {
    try {
        const city = await whereAmI();
        console.log(`2: ${city}`);
    } catch (err) {
        console.log(`2. ${err.message}`);
    }
    console.log(`3: Finished getting location`);
})();

const getJSON = function (url, errorMsg = "Something went wrong") {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(`${erroMsg}(${response.status})`);
        }

        return response.json();
    });
};

const get3Countries = async function (c1, c2, c3) {
    try {
        // const [data1] = await getJSON(
        //     `https://restcountries.com/v2/name/${c1}`,
        // );
        // const [data2] = await getJSON(
        //     `https://restcountries.com/v2/name/${c2}`,
        // );
        // const [data3] = await getJSON(
        //     `https://restcountries.com/v2/name/${c3}`,
        // );
        // console.log([data1.capital, data2.capital, data3.capital]);

        const data = await Promise.all([
            getJSON(`https://restcountries.com/v2/name/${c1}`),
            getJSON(`https://restcountries.com/v2/name/${c2}`),
            getJSON(`https://restcountries.com/v2/name/${c3}`),
        ]);
        console.log(data.map((d) => d[0].capital));
    } catch (err) {
        console.log(err);
    }
};

get3Countries("portugal", "canada", "tanzania");

// 3 Other Combinators

// Promise.race
(async function () {
    const res = await Promise.race([
        getJSON(`https://restcountries.com/v2/name/italy`),
        getJSON(`https://restcountries.com/v2/name/egypt`),
        getJSON(`https://restcountries.com/v2/name/mexico`),
    ]);
    console.log(res[0]);
})();

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long`));
        }, s);
    });
};

Promise.race([getJSON(`https://restcountries.com/v2/name/france`), timeout(1)])
    .then((res) => console.log(res[0]))
    .catch((err) => console.log(err));

// Promise.allSettled - New ES2020
Promise.allSettled([
    Promise.resolve(`Success`),
    Promise.reject(`Error`),
    Promise.resolve(`Another Success`),
]).then((res) => console.log(res));

Promise.all([
    Promise.resolve(`Success`),
    Promise.reject(`Error`),
    Promise.resolve(`Another Success`),
])
    .then((res) => console.log(res))
    .catch((res) => console.log(res));

// Promise.any - New ES2021
Promise.any([
    Promise.resolve("Success"),
    Promise.reject("Error"),
    Promise.resolve("Another success"),
])
    .then((res) => console.log(`This is Promise.any: ${res}`))
    .catch((err) => console.log(`This is Promise.any: ${err}`));
