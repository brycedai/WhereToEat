let yourLocation = document.getElementById("yourLocation");

yourLocation.addEventListener("click", getLocation);


function getLocation() {
    if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(function(location) {
            document.getElementById("location").value = location.coords.latitude + ", " + location.coords.longitude;
        });
    } 
    
}
