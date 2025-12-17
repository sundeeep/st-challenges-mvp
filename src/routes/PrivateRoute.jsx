import { useEffect, useState } from "react";
import AppwriteAccount from "../appwrite/Account.services";
import { Navigate } from "react-router";


function PrivateRoute(props) {
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
            setIsCheckingUser(false);
        }
    }

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

    if(!user){
        return (
            <Navigate to="/login" />
        )
    }


    
    const newChildren = Object.assign({}, children, {props: {children: children.props.children, user}});

    return newChildren; // <AdminRoute />
}

export default PrivateRoute;