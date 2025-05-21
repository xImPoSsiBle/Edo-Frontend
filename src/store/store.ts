import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducer/UserSlice";
import DocumentReducer from "./reducer/DocumentSlice";

const rootReducer = combineReducers({
    user: UserReducer,
    document: DocumentReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];