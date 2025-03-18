import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const PrivateRoutes = ({children}) => {
   const location = useLocation()
    const {user,loading} = useAuth();
    if(loading){
        return <div>Loading...</div>
    }
    if(user && !loading){
        return children;
    }
    else <Navigate to='/login' state={location.pathname} replace/>
  
};

export default PrivateRoutes;