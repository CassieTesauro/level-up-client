//make a new fetch call that will grab all the events from the database
export const getEvents = () => {
    return fetch("http://localhost8000/events", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`  //add authorization header
                                                                          //set value as interpolated user's auth token
                                                                          //lets server know it's a real user trying to access database
        }
    })
        .then(res => res.json())  //add a .then to turn the response into json.  
                                  //Don't forget to invoke .json by adding the ()
}


