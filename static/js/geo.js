$(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;

            $.get(`https://geocode.xyz/${lat},${lng}?geoit=json`, function(r){
                $('#cidade').val(r.region);
                $('#lat').val(lat);
                $('#lng').val(lng);
            });
        });
    }
});