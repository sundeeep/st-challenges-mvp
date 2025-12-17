import { Navigate } from "react-router";

const AdminRoute = (props) => {
    // console.log(props);
    const {user, children} = props;

    // console.log(user);

    if(user?.labels?.includes("admin")){
        // console.log(user.labels)
        return children;
    }

    return <Navigate to="/" />
}

export default AdminRoute