const apiKey = ''; //redacted

export const locationIQ = {reverse : function(long, lat){
    return fetch(`https://cors-anywhere.herokuapp.com/https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${long}&format=json`,
    {headers:{Authorization:`Bearer ${apiKey}`}}).then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error('Request was unsuccessful.');
    }).then(jsonResponse => {
        return jsonResponse.address ? jsonResponse.address.city : 'Didnt work'
        })
        .catch(error => {
            console.log(error);
        });
    }
};

