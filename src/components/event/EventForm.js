import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getGames } from "../game/GameManager"  //out of event folder, into game folder
import { createEvent } from "./EventManager"

export const EventForm = () => {
    const history = useHistory()
    const [currentEvent, setEvent] = useState({})
    const [ games, setGames ] = useState([])

    useEffect(() => {  //get all the games from the API we can choose one for the event.  Import the getGames from game manager
       getGames().then(gamesData => setGames(gamesData)) //Since we imported it, we can call getGames, make a useState for games and setGames in this module, and use '.then' to set the games state so we have it on this module.
    }, [])

    const changeEventState = (domEvent) => {  
        const copyEvent = {...currentEvent} //make a copy of the current event so we can make changes to the copy
        copyEvent[domEvent.target.name] = domEvent.target.value//we'll just update whatever field has the same key as the name field on the input field.  domEvent is just a parameter, it could be called anything
        setEvent(copyEvent)//once the updates have happened, we invoke setEvent and pass in the event copy with the changes
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
           
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                   <input value={currentEvent.description} type="text" onChange={changeEventState} name="description"></input>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                   <input value={currentEvent.time} type="time" onChange={changeEventState} name="time"></input>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                   <input value={currentEvent.date} type="date" onChange={changeEventState} name="date"></input>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    createEvent(currentEvent).then(() => history.push('/events')) //When the button is clicked, call the createEvent function we imported from EventManager.js 
                                                                                  //and pass in the updated copy of the event we stored in the useState as currentEvent
                                                                                  //after createEvent is done, redirect tne user to the event list.
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
