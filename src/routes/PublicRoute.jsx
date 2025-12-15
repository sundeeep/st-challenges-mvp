import { useEffect, useState } from "react";
import AppwriteAccount from "../appwrite/Account.services";
import { Navigate } from "react-router";


function PublicRoute(props) {
    const { children } = props;

    const [user, setUser] = useState(null);
    const [isCheckingUser, setIsCheckingUser] = useState(true)
    const appwriteAccount = new AppwriteAccount();

    async function fetchUser(){
        try{
            const appwriteUser = await appwriteAccount.getAppwriteUser();
            setUser(appwriteUser);
        }catch(error){
            console.log(error.message)
        }finally{
            console.log("Inside Finally block")
            setIsCheckingUser(false);
        }
    }

    console.log("renders and re-renders");

    useEffect(() => {
        fetchUser();
    }, [])
    /**
     * 1. Empty Dependency Array: Run only once
     * 2. Act as componentDidMount()
     * 3. Doesn't get called after every re-render
     */

    if(isCheckingUser){
        return(
            <h1>Loading.....</h1>
        )
    }

    if(user){
        return (
            <Navigate to="/dashboard" />
        )
    }

    return children;
}

export default PublicRoute;