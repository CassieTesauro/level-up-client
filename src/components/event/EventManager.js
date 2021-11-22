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


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~ FOR THE CUSTOM ACTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


export const leaveEvent = eventId => {
    return fetch(`http://localhost:8000/events/${ eventId }/signup`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        //no response because it's a delete.  If you add the res line, you get an error.
        .then(getEvents)
}

export const joinEvent = eventId => {
    return fetch(`http://localhost:8000/events/${ eventId }/signup`, {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
        .then(getEvents)
}



// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// // ~~~~ FOR THE CUSTOM ACTION OLD VERSION WITH NOTES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//     // join event is for our custom action 'signup' (the POST if statement) in server side views>event.py
//     // The custom action is: the user can sign up or cancel their attendance in an event using this url:
//     // http://localhost:8000/events/2/signup
//     // where 2 is will be the event's pk; signup is the custom event's name.  Whatever we name it, that's what will appear here in the url 

// export const joinEvent = eventId => {                                       //the eventId parameter refers to the id of the event the user is joining.  
//     return fetch(`http://localhost:8000/events/${ eventId }/signup`, {      //you can see the eventId argument will be passed into the url for the custom event.
//                                                                             //that url has the route to our custom event
//         method: "POST",                                                     //POST will add the user who clicks 'join' to the event attendees 
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("lu_token")}`    //authorize as the currently logged in user
//         }                                                                   //We don't need a body in this POST because all we need is the user, and we're getting that from the header
//     })
//         .then(response => response.json())                                  //invoke .json on the response 
// }

//     // Now we need the 'join event' button in eventlist.js