"use strict";
const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const whereAmI = async function () {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // fetch(`https://restcountries.com/v2/name/${country}`).then((res) =>
    //     console.log(res),
    // ); // Below is same as this
    const res = await fetch(
        `https://restcountries.com/v2/name/${dataGeo.country}`,
    );
    const data = await res.json();
    console.log(data);
};

whereAmI();
console.log("this is first");
