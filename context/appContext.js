import {createContext, useContext, useMemo, useState, useReducer} from "react";
import { getAuth, signOut } from 'firebase/auth';
import {appReducer, initialState} from "./appReducer.js";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";

const AppContext = createContext();

const AppWrapper = ({children}) => {
    const [user, loading, error] = useAuthState(firebase.auth());
    // const [appState, setAppState] = useState({});
    const {state, dispatch} = useReducer(appReducer, initialState);

    const contextValue = useMemo(() => {
        return {state, dispatch: dispatch};
    }, [state, dispatch]);

    return (
        <AppContext.Provider value={{contextValue, auth: { user, loading, error }}}>
            {children}
        </AppContext.Provider>
    );
}   

const useAppContext = () => {
    return useContext(AppContext);
}

export {
    AppWrapper,
    useAppContext
}