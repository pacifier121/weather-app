// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })


document.querySelector('form').addEventListener('submit', (eve) => {
    eve.preventDefault();
    const place = document.querySelector("input").value;
    let url = "http://localhost:3000/weather?city=" + place;
    document.querySelector('#msg-1').innerHTML = "<h5>Loading... </h5>";

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return document.querySelector('#msg-1').innerHTML = "<h4>Error : </h4>" + data.error;
            }
            document.querySelector('#msg-1').innerHTML = "<h4>Forecast : </h4>" + data.forecast;
            document.querySelector('#msg-2').innerHTML = "<h4>Location : </h4>" + data.lattitude + ", " + data.longitude;
        });
    });
});