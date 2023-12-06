if (window.XMLHttpRequest)    //  Objet standard
{ 
    xhr = new XMLHttpRequest();     //  Firefox, Safari, ...
} 
else  if (window.ActiveXObject)      //  Internet Explorer
{
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
xhr.onreadystatechange = function() {
    // instructions de traitement de la réponse
   };
   if (xhr.readyState == 4) { 
	// Reçu, OK  
	}
else { 
	// Attendre...
	}

$(document).ready(function () {
    $("#weatherForm").submit(function (event) {
        event.preventDefault();

        if (typeof $ === 'undefined' || typeof $.ajax === 'undefined') {
            console.error('jQuery is not loaded or $.ajax is not defined.');
            return;
        }

        // Récupérer la valeur de la ville depuis le champ de saisie
        var cityName = $("#cityNameInput").val();
        const accessKey = "32c8659c492e2230f70ce6d7fcdcad16";

        // URL de l'API météo avec la ville spécifiée
        var apiUrl =`https://api.weatherstack.com/current?access_key=${accessKey}&query=${cityName}`;

        // Effectuer la requête Ajax
        $.ajax({
            url: apiUrl,
            method: "GET",
            dataType: "json",
            success: function (data) 
            {
                if (data.location && data.location.name) 
                {
                    console.log("data: " + data)
                // Afficher le nom de la ville dans la div "cityNameResult"
                $("#cityNameResult").html("Nom de la ville : " + data.location.name);
                } else {
                $("#cityNameResult").html("Nom de la ville indisponible");
                }

                if (data.location && data.location.localtime) 
                {
                $("#cityHourResult").html("Heure de la ville : " + data.location.localtime);
                } else {
                $("#cityHourResult").html("Heure de la ville indisponible");
                }

                if (data.location && data.current.temperature) 
                {
                    
                $("#cityTemperatureResult").html("Température de la ville : " + data.current.temperature + " °C");
                    if(data.current.temperature < 5)
                    {
                        $("#cityTemperatureResult").css("background-color","#33D1FF");

                    }
                    else if(data.current.temperature > 18)
                    {
                        $("#cityTemperatureResult").css("background-color","#ffff33");
                    }
                    else
                    {
                        $("#cityTemperatureResult").css("background-color","#49FF33");
                    }
                } else {
                $("#cityTemperatureResult").html("Température de la ville indisponible");
                }

                if (data.location && data.current.weather_icons && data.current.weather_icons.length > 0) 
                {
                    var iconUrl = data.current.weather_icons[0];
                $("#cityIconeResult").html("Icône du temps de la ville : <img src='" + iconUrl + "' alt='Icone du temps' />");
                } else {
                $("#cityIconeResult").html("Icône du temps de la ville indisponible");
                }
            },
            error: function (error) {
                console.log("Erreur lors de la requête Ajax :", error);
            }
            
        });
    });
});