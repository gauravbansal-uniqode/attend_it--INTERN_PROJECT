import {createContext, useReducer} from 'react'
import AuthReducer from './AuthReducer'
import getLocalUser from '../utils/getLocalUser'
import {useEffect} from 'react'

const INITIAL_STATE= {
    user: getLocalUser(),
    isFetching: false,
    error: false
};

export const AuthContext= createContext(INITIAL_STATE);

export const AuthContextProvider= ({children})=>{
    const [state, dispatch]= useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state]);

    return(
        <AuthContext.Provider value={{
                user: state.user,
                isFetching:state.isFetching,
                error: state.error,
                dispatch
            }}>{children}</AuthContext.Provider>
    );


}

export default AuthContext;