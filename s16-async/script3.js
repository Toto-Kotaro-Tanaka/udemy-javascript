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
        console.log(dataGeo);

        // fetch(`https://restcountries.com/v2/name/${country}`).then((res) =>
        //     console.log(res),
        // ); // Below is same as this
        const res = await fetch(
            `https://restcountries.com/v2/name/${dataGeo.country}`,
        );

        if (!res.ok) throw new Error(`Problem getting country`);
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log(err.message);
        renderError(`Something went wrong ${err.message}`);
    }
};

whereAmI();
whereAmI();
whereAmI();
whereAmI();
console.log("this is first");

// try {
//     let y = 1;
//     const x = 2;
//     y = 3;
// } catch (err) {
//     alert(err.message);
// }
