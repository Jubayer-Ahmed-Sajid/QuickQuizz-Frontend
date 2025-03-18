import {  Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import PropTypes from 'prop-types';

const PrivateRoutes = ({children}) => {
   const location = useLocation()
    const {user,loading} = useAuth();
    if(loading){
        return <div>Loading...</div>
    }
    if(user && !loading){
        return children;
    }
   
   return <Navigate to='/login' state={location.pathname} replace/>
   
  
};
PrivateRoutes.propTypes={
    children:PropTypes.node.isRequired,
}

export default PrivateRoutes;