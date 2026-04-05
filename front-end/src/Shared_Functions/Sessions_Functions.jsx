//This file has global functions to be used related to user session management

import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Nav/Navbar";

async function validateUserPermission(webpage_role){ 
    //This function is to be called as soon as a webpage loads, this function must be the first function running when a webpage loads
    //This function returns true if the user is permitted to use the webpage 
    //webpage_role means which role has access to the webpage in which this function was called, e.g; all sub_manager webpages 
    //..(dashboard, assign courses, assign inventory, etc) will send "sub_manager" to this function

    const res = await fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/session/validateAccountRole", {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({webpage_role: webpage_role}),
    })
    
    const textRes = await res.text();

    if (textRes == "permission_granted"){
        return true;
    }
    else if (textRes == "permission_denied"){
        return false;
    }
    else if (textRes == "no_session_exists"){
        return false;
    }
    else return "error";

}

function Handle_User_Permission({webpageRole, children}){

    const [userPermission, setUserPermission] = useState(null);

    useEffect(()=> {
        async function handleUserPermission(){
            const isUserAllowed = await validateUserPermission(webpageRole);
            setUserPermission(isUserAllowed);
        }
        handleUserPermission();
    }, []);

    if (userPermission == null){
        return(
            <>
                <h1>Loading Webpage...</h1>
            </>
        );
    }

    if (userPermission == false){
        return(
            <>
                <Navbar />
                <h1>User does not have rights to visit this webpage.</h1>
            </>
        )
    }

    return(<>{children}</>)
}

export default Handle_User_Permission;