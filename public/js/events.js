document.querySelector('form').addEventListener('submit', (eve) => {
    eve.preventDefault();
    const place = document.querySelector("input").value;
    let url = "/weather?city=" + place;
    document.querySelector('#msg-1').innerHTML = "<h5>Loading... </h5>";
    document.querySelector('#msg-2').innerHTML = "";
    document.querySelector('#msg-3').innerHTML = "";
    document.querySelector('#msg-4').innerHTML = "";

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.querySelector('#msg-2').innerHTML = "";
                document.querySelector('#msg-3').innerHTML = "";
                document.querySelector('#msg-4').innerHTML = "";
                return document.querySelector('#msg-1').innerHTML = "<h4>Error : </h4>" + data.error;
            }
            document.querySelector('#msg-1').innerHTML = "<h4>Location : </h4>" + data.place_name + "<br><i>Lat : " + data.lattitude + ",  Long : " + data.longitude + "</i>";
            document.querySelector('#msg-2').innerHTML = "<h4>Forecast : </h4>Today weather will be <strong>" + data.weather + "</strong><br>Temperature around " + data.temperature + " deg C";
            document.querySelector('#msg-3').innerHTML = "<h4>Local Time : </h4>" + data.localtime;
            document.querySelector('#msg-4').innerHTML = "<h4>Humidity : </h4>" + data.humidity + "%";
        });
    });
});