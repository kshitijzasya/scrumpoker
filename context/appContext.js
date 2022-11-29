import {createContext, useContext, useMemo, useState, useReducer} from "react";
import {appReducer, initialState} from "./appReducer.js";

const AppContext = createContext();

const AppWrapper = ({children}) => {
    // const [appState, setAppState] = useState({});
    const {state, dispatch} = useReducer(appReducer, initialState);

    const contextValue = useMemo(() => {
        return {state, dispatch: dispatch};
    }, [state, dispatch]);

    return (
        <AppContext.Provider value={contextValue}>
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