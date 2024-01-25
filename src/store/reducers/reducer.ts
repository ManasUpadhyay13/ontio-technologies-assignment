import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType } from "../../types/type";

interface UserState {
    users: UserDataType[];
}

const initialState: UserState = {
    users: [],
};

export const userReducer = createSlice({
    name: "assignment",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserDataType>) => {
            state.users = [...state.users, action.payload];
        },
    },
});

export const { addUser } = userReducer.actions;

export default userReducer.reducer;
