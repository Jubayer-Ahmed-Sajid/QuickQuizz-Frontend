import{ useContext } from 'react';
import { AuthContext } from '../Components/Authprovider/Authprovider';

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
    
};

export default useAuth;