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
