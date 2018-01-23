let yourLocation = document.getElementById("yourLocation");

yourLocation.addEventListener("click", getLocation);


function getLocation() {
    var ua = navigator.userAgent.toLowerCase(),
    isAndroid = ua.indexOf("android") > -1,
    geoTimeout = isAndroid ? '15000' : '1000';
    
    function success(location){
        document.getElementById("location").value = location.coords.latitude + ", " + location.coords.longitude;
    }
    
    function error (err){
        console.log(err);
    }
        
    if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true, maximumAge: 3000, timeout:geoTimeout});
    } else {
        error("Location services must be enabled to use this");
    }
    
}
