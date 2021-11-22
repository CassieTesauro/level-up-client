export const getProfile = () => {
    // TODO: Add the fetch call to the profile resource
    return fetch('http://localhost:8000/profile', { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`  //add authorization header, set value as interpolated user's auth token, lets server know it's a real user trying to access database                                                                                                                                           
        }
    })
        .then(res => res.json())  //add a .then to turn the response into json.  
                                  //Don't forget to invoke .json by adding the ()
}

    
//TEST