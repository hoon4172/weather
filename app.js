window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=8b3210f5312aa6831a127aad3906f6cd&units=metric`
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp } = data.main;
                    const { description ,icon} = data.weather[0];
                    //set DOM Elements from the api
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = data.name;
                    //setIcon
                    //const icon = "partly-cloudy-night";
                    let con;
                    switch (icon) {
                        case '01d':
                            con = "CLEAR_DAY";
                            break;
                        case '02d':
                            con = "PARTLY_CLOUDY_DAY";
                            break;
                        case '03d':
                            con = "CLOUDY";
                            break;
                        case '04d':
                            con = "CLOUDY";
                            break;
                        case '09d':
                            con = "SLEET";
                            break;
                        case '10d':
                            con = "RAIN";
                            break;
                        // case '11d':
                        //     con = "FOG";
                        //     break;
                        case '13d':
                            con = "SNOW";
                            break;
                        case '50d':
                            con = "FOG";
                            break;
                        case '01n':
                            con = "CLEAR_NIGHT";
                            break;
                        case '03n':
                            con = "PARTLY_CLOUDY_NIGHT";
                            break;
                       
                    }
                    console.log(icon);
                    setIcons(con, document.querySelector('.icon'))
                })
        })
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
