//make a new fetch call that will grab all the events from the database

export const getEvents = () => {
    return fetch('http://localhost:8000/events', { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`  //add authorization header, set value as interpolated user's auth token, lets server know it's a real user trying to access database                                                                                                                                           
        }
    })
        .then(res => res.json())  //add a .then to turn the response into json.  
                                  //Don't forget to invoke .json by adding the ()
}

//Go to EventList.js and import react, useeffect,usestate from react and getEvents from here, then return a map of the events

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {  //same url as the get.  The difference is the method POST and needed headers for POST
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,  //so the server knows who's logged in
            "Content-Type": 'application/json'  //so the server knows what kind of data we're passing it
        },
        body: JSON.stringify(event)  //since it's a POST, we have to send  the body
    })
        .then(getEvents)
}