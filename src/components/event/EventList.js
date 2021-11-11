import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"


export const EventList = () => {    //Make an exportable function to grab, store, and display a list of all events in the database
    const [events, setEvents] = useState([])        //make a state variable to hold the list of events that you import form getEvents
                                                 //make a set function to set the list of events in the variable.
                                                 // call useState to make the magic happen.
                                                 //make the initial state/data stored in variable 'events' be an empty array
                                                 //aka in tech lingo set the default event state to an empty array

                                                
                                                
                                                 
                                                 
    useEffect(() => {                                           //make a useEffect.  Pass it a function as its first parameter [the ()=>{} part]
        getEvents().then(eventsData => setEvents(eventsData))   //in the 1st parameter function: call the get events function
    }, [])                                                          //add a .then so you can take the event data coming back from the server side and
                                                                   //call setEvents to pass that event data into the events variable
                                                                   //make the second parameter an empty array so this useEffect only runs when the component loads

        //The return is the JSX that contains a list of all the events we now have stored in the variable 'events'.  
        //It will map through all of the events
    
    return(
        <article>
            {
                events.map(event => (
                    <section>
                        <p>Event Description: {event.description}</p>
                        <p>Event Date: {event.date}</p>
                        <p>Event Time: {event.time}</p>
                    </section>
                ))
            }
        </article>
    )

}                                                                 

//So now, we've built the event manager, we've built the events list component, now we need to add a route to the events list in application views