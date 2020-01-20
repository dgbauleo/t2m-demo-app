var timeout;
    $("#cidade").keypress(function(){
        $('#lat').val("");
        $('#lng').val("");
        $('#buscar').attr("disabled", true);
        $("div[role='alert']").addClass('d-none');

        if(timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    
        timeout = setTimeout(function(){
            let cidade = $('#cidade').val();

            $.get(`https://api.opencagedata.com/geocode/v1/json?q=${cidade}&key=0d1b75a9bbd547aa819f0bc637bfd433`, function(r){
                if(r.total_results == 0) {
                    $("div[role='alert']").removeClass('d-none');
                    return;
                }

                let lat = r.results[0].geometry.lat;
                let lng = r.results[0].geometry.lng;

                $('#lat').val(lat);
                $('#lng').val(lng);

                $('#buscar').removeAttr("disabled");
            });
        }, 750)
    });