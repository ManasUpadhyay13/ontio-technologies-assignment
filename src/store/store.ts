import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/reducer";

const store = configureStore({
    reducer: {
        users: userReducer.reducer,
    },
});

export default store;
